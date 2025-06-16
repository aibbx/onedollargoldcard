import React from 'react';
import { Zap } from 'lucide-react';
import type { ContractSection } from '../types/contract';

export const winnerSelectionContract: ContractSection = {
  id: 'winner-selection',
  title: 'Winner Selection Contract',
  icon: React.createElement(Zap, { className: "w-6 h-6 text-blue-600" }),
  description: 'When the pool reaches 10 million USD1, this contract randomly selects a winner and transfers exactly 5 million USD1:',
  code: `// Part 2: Winner Selection Process
pub fn select_winner(ctx: Context<SelectWinner>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let clock = Clock::get()?;
    
    // Pool target is 10 million USD1
    const POOL_TARGET_AMOUNT: u64 = 10_000_000 * 1_000_000; // 10M USD1 in 6 decimals
    const PRIZE_AMOUNT: u64 = 5_000_000 * 1_000_000; // 5M USD1 prize
    
    // Verify pool has reached required amount
    require!(
        pool.pool_balance >= POOL_TARGET_AMOUNT,
        "Pool balance has not reached 10 million USD1"
    );
    
    // Request randomness from VRF provider
    let switchboard = ctx.accounts.switchboard_feed.to_account_info();
    let randomness = get_verified_randomness(&switchboard)?;
    let random_value = randomness.abs() as u64;
    
    // Select winning lottery number
    let total_lottery_numbers = pool.total_lottery_numbers;
    require!(total_lottery_numbers > 0, "No lottery entries available");
    
    let winning_number = random_value % total_lottery_numbers;
    
    // Find the winner based on lottery number
    let mut winner_address = Pubkey::default();
    for entry in &pool.lottery_entries {
        if entry.entry_number == winning_number {
            winner_address = entry.donor;
            break;
        }
    }
    
    require!(winner_address != Pubkey::default(), "Winner not found");
    
    // Transfer exactly 5 million USD1 to winner
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
    
    token::transfer(cpi_ctx, PRIZE_AMOUNT)?;
    
    // Update pool state - subtract prize from pool balance
    pool.pool_balance -= PRIZE_AMOUNT;
    pool.last_winner = winner_address;
    pool.last_prize_amount = PRIZE_AMOUNT;
    pool.last_distribution = clock.unix_timestamp;
    pool.winning_lottery_number = winning_number;
    
    // Transfer accumulated fees to fee address
    if pool.accumulated_fee > 0 {
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
        token::transfer(cpi_ctx_fee, pool.accumulated_fee)?;
        pool.accumulated_fee = 0;
    }
    
    // Reset lottery entries for next round (keep remaining pool balance)
    pool.lottery_entries.clear();
    pool.total_lottery_numbers = 0;
    pool.total_participants = 0;
    
    // Emit winner event
    emit!(WinnerSelectedEvent {
        winner: winner_address,
        winning_number: winning_number,
        prize_amount: PRIZE_AMOUNT,
        remaining_pool: pool.pool_balance,
        timestamp: clock.unix_timestamp,
    });
    
    Ok(())
}`,
  securityPoints: [
    'Triggers when pool reaches exactly 10 million USD1',
    'Awards exactly 5 million USD1 to randomly selected winner',
    'Winner selected based on lottery numbers proportional to donations',
    'Remaining 5 million USD1 stays in pool for next round',
    'Accumulated fees are transferred to fee address',
    'Pool continues with remaining balance for new donations'
  ]
};
