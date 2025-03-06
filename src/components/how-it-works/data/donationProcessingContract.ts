
import React from 'react';
import { Code } from 'lucide-react';
import type { ContractSection } from '../types/contract';

export const donationProcessingContract: ContractSection = {
  id: 'donation-processing',
  title: 'Donation Processing Contract',
  icon: React.createElement(Code, { className: "w-6 h-6 text-gold-600" }),
  description: 'This smart contract handles the donation process, validates the service fee, and maintains records of all donors:',
  code: `// Part 1: Donation Processing
pub fn donate(
    ctx: Context<Donate>,
    donation_amount: u64,
    service_fee: u64,
) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let donor = ctx.accounts.donor.key();
    
    // Verify service fee is exactly 5% of donation amount
    require!(
        service_fee == donation_amount / 20, 
        "Service fee must be exactly 5% of donation amount"
    );
    
    // Calculate total amount to transfer (donation + service fee)
    let total_transfer_amount = donation_amount + service_fee;
    
    // Transfer total amount from donor to contract
    let cpi_accounts = token::Transfer {
        from: ctx.accounts.donor_token.to_account_info(),
        to: ctx.accounts.pool_token.to_account_info(),
        authority: ctx.accounts.donor.to_account_info(),
    };
    token::transfer(CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        cpi_accounts
    ), total_transfer_amount)?;
    
    // Transfer service fee to platform wallet
    let cpi_accounts_fee = token::Transfer {
        from: ctx.accounts.pool_token.to_account_info(),
        to: ctx.accounts.platform_wallet.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    };
    token::transfer(CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        cpi_accounts_fee
    ), service_fee)?;
    
    // Update pool balance with donation amount
    pool.pool_balance += donation_amount;
    
    // Record donation details for participant entry
    pool.total_participants += 1;
    pool.last_donor = donor;
    pool.last_donation_timestamp = Clock::get()?.unix_timestamp;
    
    // Emit event for frontend tracking
    emit!(DonationEvent {
        donor: donor,
        donation_amount: donation_amount,
        service_fee: service_fee,
        timestamp: pool.last_donation_timestamp,
    });
    
    Ok(())
}`,
  securityPoints: [
    'Ensures the service fee is exactly 5% of the donation amount',
    'Collects both donation and service fee from the donor',
    'Transfers donation to prize pool and service fee to platform wallet',
    'Updates pool balance and participant records after each donation',
    'Records timestamp of donation for the 7-day inactivity check',
    'Emits blockchain events for transparent transaction tracking'
  ]
};
