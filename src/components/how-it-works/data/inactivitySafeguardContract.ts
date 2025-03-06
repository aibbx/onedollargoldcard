
import React from 'react';
import { Shield } from 'lucide-react';
import type { ContractSection } from '../types/contract';

export const inactivitySafeguardContract: ContractSection = {
  id: 'inactivity-safeguard',
  title: '7-Day Inactivity Safeguard Contract',
  icon: React.createElement(Shield, { className: "w-6 h-6 text-purple-600" }),
  description: 'The backup mechanism is governed by this smart contract that monitors donation activity and automatically transfers funds after 7 days of inactivity if the pool doesn\'t reach the target:',
  code: `// Part 3: Inactivity Safeguard Mechanism
pub fn check_inactivity_and_distribute(ctx: Context<CheckInactivity>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let clock = Clock::get()?;
    let current_time = clock.unix_timestamp;
    
    // Check if pool has reached target
    if pool.pool_balance >= POOL_TARGET_AMOUNT {
        return Ok(());
    }
    
    // Check if 7 days have passed since last donation
    if current_time - pool.last_donation_timestamp >= INACTIVITY_PERIOD {
        // Get the last donor's address
        let last_donor = pool.last_donor;
        
        // Ensure we have a valid last donor
        require!(last_donor != Pubkey::default(), "No last donor found");
        
        // Transfer entire pool balance to last donor
        let cpi_accounts = token::Transfer {
            from: ctx.accounts.pool_token.to_account_info(),
            to: ctx.accounts.last_donor_token.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        
        // Create CPI context with signer seeds
        let seeds = &[b"pool", &[pool.bump]];
        let signer = &[&seeds[..]];
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer,
        );
        
        // Transfer all funds to last donor
        token::transfer(cpi_ctx, pool.pool_balance)?;
        
        // Reset pool balance and emit event
        emit!(BackupDistributionEvent {
            recipient: last_donor,
            amount: pool.pool_balance,
            timestamp: current_time,
        });
        
        // Reset pool state
        let distributed_amount = pool.pool_balance;
        pool.pool_balance = 0;
        pool.last_distribution = current_time;
        
        msg!("Backup distribution completed: {} tokens sent to {}", 
             distributed_amount, last_donor.to_string());
    }
    
    Ok(())
}

// Constants
const INACTIVITY_PERIOD: i64 = 7 * 24 * 60 * 60; // 7 days in seconds
const POOL_TARGET_AMOUNT: u64 = 10_000_000 * 1_000_000; // $10M in USDC (6 decimals)
const PRIZE_AMOUNT: u64 = 5_000_000 * 1_000_000; // $5M in USDC (6 decimals)

// Event emitted when backup distribution happens
#[event]
pub struct BackupDistributionEvent {
    pub recipient: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
}`,
  securityPoints: [
    'Automatically checks if 7 days have passed without new donations',
    'Verifies the last donor is a valid address before proceeding',
    'Transfers the entire pool balance to the last donor',
    'Updates pool state to reflect the distribution',
    'Records the distribution event on the blockchain',
    'Protects donors by ensuring funds are always distributed'
  ]
};
