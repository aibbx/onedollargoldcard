
import React from 'react';
import { Code } from 'lucide-react';
import type { ContractSection } from '../types/contract';

export const donationProcessingContract: ContractSection = {
  id: 'donation-processing',
  title: 'Donation Processing Contract',
  icon: React.createElement(Code, { className: "w-6 h-6 text-gold-600" }),
  description: 'This smart contract handles the donation process with strict rules for valid donations and lottery number assignment:',
  code: `// Part 1: Donation Processing with Enhanced Rules
pub fn donate(
    ctx: Context<Donate>,
    total_amount: u64, // Total amount user sends (pool + fee)
) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let donor = ctx.accounts.donor.key();
    
    // Minimum valid donation is 1.05 USD1 (1 USD1 to pool + 0.05 USD1 fee)
    const MIN_VALID_DONATION: u64 = 1_050_000; // 1.05 USD1 in 6 decimals
    const MIN_POOL_AMOUNT: u64 = 1_000_000; // 1 USD1 in 6 decimals
    
    let is_valid_donation = total_amount >= MIN_VALID_DONATION;
    let pool_amount: u64;
    let fee_amount: u64;
    let lottery_numbers: u32;
    
    if is_valid_donation {
        // Valid donation: calculate pool (95%) and fee (5%)
        pool_amount = (total_amount * 95) / 100;
        fee_amount = total_amount - pool_amount;
        
        // Each 1 USD1 to pool = 1 lottery number
        lottery_numbers = (pool_amount / MIN_POOL_AMOUNT) as u32;
    } else {
        // Invalid donation: entire amount goes to fee
        pool_amount = 0;
        fee_amount = total_amount;
        lottery_numbers = 0;
    }
    
    // Transfer total amount from donor to contract
    let cpi_accounts = token::Transfer {
        from: ctx.accounts.donor_token.to_account_info(),
        to: ctx.accounts.pool_token.to_account_info(),
        authority: ctx.accounts.donor.to_account_info(),
    };
    token::transfer(CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        cpi_accounts
    ), total_amount)?;
    
    // Update pool with only valid donations
    if is_valid_donation {
        pool.pool_balance += pool_amount;
        pool.total_participants += 1;
        pool.last_donor = donor;
        pool.last_donation_timestamp = Clock::get()?.unix_timestamp;
        
        // Assign lottery numbers to donor
        for i in 0..lottery_numbers {
            pool.lottery_entries.push(LotteryEntry {
                donor: donor,
                entry_number: pool.total_lottery_numbers + i as u64,
            });
        }
        pool.total_lottery_numbers += lottery_numbers as u64;
    }
    
    // Accumulate fee amount
    pool.accumulated_fee += fee_amount;
    
    // Check for automatic fee transfer (every 20,000 USD1 in POOL, not total donations)
    const FEE_TRANSFER_THRESHOLD: u64 = 20_000 * 1_000_000; // 20K USD1 in pool
    if pool.pool_balance >= FEE_TRANSFER_THRESHOLD && pool.accumulated_fee > 0 {
        let fee_to_transfer = pool.accumulated_fee;
        
        // Transfer accumulated fees to fee address
        let cpi_accounts_fee = token::Transfer {
            from: ctx.accounts.pool_token.to_account_info(),
            to: ctx.accounts.fee_wallet.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        
        let seeds = &[b"pool", &[pool.bump]];
        let signer = &[&seeds[..]];
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts_fee,
            signer,
        );
        
        token::transfer(cpi_ctx, fee_to_transfer)?;
        
        // Reset accumulated fee after transfer
        pool.accumulated_fee = 0;
        
        // Emit fee transfer event
        emit!(FeeTransferEvent {
            fee_amount: fee_to_transfer,
            pool_balance_at_transfer: pool.pool_balance,
            timestamp: Clock::get()?.unix_timestamp,
        });
    }
    
    // Emit event for tracking
    emit!(DonationEvent {
        donor: donor,
        total_amount: total_amount,
        pool_amount: pool_amount,
        fee_amount: fee_amount,
        lottery_numbers: lottery_numbers,
        is_valid: is_valid_donation,
        timestamp: Clock::get()?.unix_timestamp,
    });
    
    Ok(())
}

// Event for fee transfers
#[event]
pub struct FeeTransferEvent {
    pub fee_amount: u64,
    pub pool_balance_at_transfer: u64,
    pub timestamp: i64,
}`,
  securityPoints: [
    'Minimum valid donation is 1.05 USD1 (1 USD1 to pool + 0.05 USD1 fee)',
    'Invalid donations (< 1.05 USD1) go entirely to fee, no lottery numbers assigned',
    'Each 1 USD1 donated to pool earns exactly 1 lottery number',
    'Automatic fee transfer triggered when pool reaches 20,000 USD1',
    'Fee includes both 5% from valid donations and 100% from invalid donations',
    'Only valid donations count toward pool balance and lottery entries'
  ]
};
