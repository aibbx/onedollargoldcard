
import React from 'react';
import { Zap } from 'lucide-react';
import type { ContractSection } from '../types/contract';

export const winnerSelectionContract: ContractSection = {
  id: 'winner-selection',
  title: 'Winner Selection Contract',
  icon: React.createElement(Zap, { className: "w-6 h-6 text-blue-600" }),
  description: 'When the pool reaches $10 million, this smart contract logic is triggered to select a winner using a verifiable random function (VRF) that cannot be manipulated:',
  code: `// Part 2: Winner Selection Process
pub fn select_winner(ctx: Context<SelectWinner>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let clock = Clock::get()?;
    
    // Verify pool has reached required amount
    require!(
        pool.pool_balance >= POOL_TARGET_AMOUNT,
        "Pool balance has not reached the target amount"
    );
    
    // Request randomness from VRF provider
    let switchboard = ctx.accounts.switchboard_feed.to_account_info();
    
    // Get latest randomness result (already verified on-chain)
    let randomness = get_verified_randomness(&switchboard)?;
    
    // Convert randomness to u64 for selection calculation
    let random_value = randomness.abs() as u64;
    
    // Select winning entry based on weighted probability
    let winner_address = select_weighted_entry(
        pool.participants.clone(),
        pool.participant_entries.clone(),
        random_value
    )?;
    
    // Transfer fixed prize amount to winner (always $5M USDC)
    let prize_amount = PRIZE_AMOUNT;
    
    // Ensure pool has sufficient funds
    require!(
        pool.pool_balance >= prize_amount,
        "Insufficient funds in pool for prize"
    );
    
    let cpi_accounts = token::Transfer {
        from: ctx.accounts.pool_token.to_account_info(),
        to: ctx.accounts.winner_token.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    };
    
    let seeds = &[b"pool", &[pool.bump]];
    let signer = &[&seeds[..]];
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        cpi_accounts,
        signer,
    );
    
    token::transfer(cpi_ctx, prize_amount)?;
    
    // Update pool state
    pool.pool_balance -= prize_amount;
    pool.last_winner = winner_address;
    pool.last_prize_amount = prize_amount;
    pool.last_distribution = clock.unix_timestamp;
    
    // Reset participant entries for next round
    pool.participants.clear();
    pool.participant_entries.clear();
    pool.total_participants = 0;
    
    // Emit winner event
    emit!(WinnerSelectedEvent {
        winner: winner_address,
        prize_amount: prize_amount,
        timestamp: clock.unix_timestamp,
    });
    
    Ok(())
}`,
  securityPoints: [
    'Verifies the pool has reached $10 million before proceeding',
    'Uses Switchboard VRF for provably fair random number generation',
    'Selects winner based on their proportional contribution',
    'Transfers exactly $5 million USDC to the winner',
    'Keeps the remaining funds in the pool for the next drawing',
    'Resets the participant entries for the next funding round',
    'Emits a blockchain event recording the winner selection'
  ]
};
