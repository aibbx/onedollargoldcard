
import React from 'react';
import { Shield } from 'lucide-react';
import type { ContractSection } from '../types/contract';

export const inactivitySafeguardContract: ContractSection = {
  id: 'inactivity-safeguard',
  title: '7-Day Inactivity Backup Mechanism',
  icon: React.createElement(Shield, { className: "w-6 h-6 text-purple-600" }),
  description: 'If no valid donations are received for 7 consecutive days, the last valid donor wins the entire pool balance (excluding fees):',
  code: `// Part 3: 7-Day Inactivity Backup Mechanism
pub fn check_inactivity_and_distribute(ctx: Context<CheckInactivity>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let clock = Clock::get()?;
    let current_time = clock.unix_timestamp;
    
    // 7 days inactivity period (in seconds)
    const INACTIVITY_PERIOD: i64 = 7 * 24 * 60 * 60;
    
    // Check if pool has reached target (if so, normal winner selection applies)
    const POOL_TARGET_AMOUNT: u64 = 10_000_000 * 1_000_000; // 10M USD1
    if pool.pool_balance >= POOL_TARGET_AMOUNT {
        return Ok(()); // Let normal winner selection handle this
    }
    
    // Check if 7 days have passed since last VALID donation
    if current_time - pool.last_donation_timestamp >= INACTIVITY_PERIOD {
        let last_donor = pool.last_donor;
        
        // Ensure we have a valid last donor
        require!(last_donor != Pubkey::default(), "No valid last donor found");
        require!(pool.pool_balance > 0, "No pool balance to distribute");
        
        // Get current pool balance (excluding fees)
        let pool_balance_to_transfer = pool.pool_balance;
        let accumulated_fees = pool.accumulated_fee;
        
        // Transfer entire pool balance to last valid donor
        let cpi_accounts = token::Transfer {
            from: ctx.accounts.pool_token.to_account_info(),
            to: ctx.accounts.last_donor_token.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        
        let seeds = &[b"pool", &[pool.bump]];
        let signer = &[&seeds[..]];
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer,
        );
        
        // Transfer pool balance to last donor
        token::transfer(cpi_ctx, pool_balance_to_transfer)?;
        
        // Transfer accumulated fees to fee address
        if accumulated_fees > 0 {
            let cpi_accounts_fee = token::Transfer {
                from: ctx.accounts.pool_token.to_account_info(),
                to: ctx.accounts.fee_wallet.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            };
            let cpi_ctx_fee = CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                cpi_accounts_fee,
                signer,
            );
            token::transfer(cpi_ctx_fee, accumulated_fees)?;
        }
        
        // Emit backup distribution event
        emit!(BackupDistributionEvent {
            recipient: last_donor,
            pool_amount: pool_balance_to_transfer,
            fee_amount: accumulated_fees,
            reason: "7-day inactivity period reached",
            timestamp: current_time,
        });
        
        // Reset pool state for new round
        pool.pool_balance = 0;
        pool.accumulated_fee = 0;
        pool.total_participants = 0;
        pool.total_lottery_numbers = 0;
        pool.lottery_entries.clear();
        pool.last_distribution = current_time;
        pool.last_donor = Pubkey::default();
        
        msg!("Backup mechanism triggered: {} USD1 sent to last donor {}, {} USD1 fees transferred", 
             pool_balance_to_transfer, last_donor.to_string(), accumulated_fees);
    }
    
    Ok(())
}

// Data structures for lottery system
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct LotteryEntry {
    pub donor: Pubkey,
    pub entry_number: u64,
}

// Event emitted when backup distribution happens
#[event]
pub struct BackupDistributionEvent {
    pub recipient: Pubkey,
    pub pool_amount: u64,
    pub fee_amount: u64,
    pub reason: String,
    pub timestamp: i64,
}

// Enhanced donation event with lottery information
#[event]
pub struct DonationEvent {
    pub donor: Pubkey,
    pub total_amount: u64,
    pub pool_amount: u64,
    pub fee_amount: u64,
    pub lottery_numbers: u32,
    pub is_valid: bool,
    pub timestamp: i64,
}`,
  securityPoints: [
    'Monitors for 7 consecutive days without valid donations (≥1.05 USD1)',
    'Last valid donor receives entire pool balance (excluding fees)',
    'Accumulated fees are automatically transferred to fee address',
    'Pool resets to zero after backup distribution for new round',
    'Only valid donations (≥1.05 USD1) reset the inactivity timer',
    'Protects donors by ensuring funds are always distributed fairly'
  ]
};
