import React from 'react';
import { Zap } from 'lucide-react';
import type { ContractSection } from '../types/contract';

export const winnerSelectionContract: ContractSection = {
  id: 'winner-selection',
  title: 'Winner Selection Contract',
  icon: React.createElement(Zap, { className: "w-6 h-6 text-blue-600" }),
  description: 'When the pool reaches 10 million USD1, this contract randomly selects a winner but requires manual confirmation before transferring funds:',
  code: `// Part 2A: Winner Selection Process (No Automatic Transfer)
pub fn select_winner(ctx: Context<SelectWinner>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let clock = Clock::get()?;
    
    // Pool target is 10 million USD1 (您要求的金额)
    const POOL_TARGET_AMOUNT: u64 = 10_000_000 * 1_000_000; // 1000万 USD1 in 6 decimals
    
    // Verify pool has reached required amount
    require!(
        pool.pool_balance >= POOL_TARGET_AMOUNT,
        "Pool balance has not reached 10 million USD1"
    );
    
    // Ensure no pending winner confirmation
    require!(
        pool.pending_winner == Pubkey::default(),
        "There is already a pending winner awaiting confirmation"
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
    
    // Store winner for confirmation (DO NOT TRANSFER YET)
    pool.pending_winner = winner_address;
    pool.pending_prize_amount = 5_000_000 * 1_000_000; // 500万 USD1 prize
    pool.winning_lottery_number = winning_number;
    pool.winner_selected_at = clock.unix_timestamp;
    pool.winner_confirmed = false;
    
    // Emit winner selected event (AWAITING CONFIRMATION)
    emit!(WinnerSelectedEvent {
        winner: winner_address,
        winning_number: winning_number,
        prize_amount: pool.pending_prize_amount,
        pool_balance: pool.pool_balance,
        timestamp: clock.unix_timestamp,
        status: "PENDING_CONFIRMATION".to_string(),
    });
    
    Ok(())
}

// Part 2B: Confirm Winner and Transfer Prize (Admin Only)
pub fn confirm_winner_and_transfer(
    ctx: Context<ConfirmWinnerAndTransfer>
) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let clock = Clock::get()?;
    
    // Verify admin authority
    require!(
        ctx.accounts.admin.key() == pool.admin_authority,
        "Only admin can confirm winner transfers"
    );
    
    // Verify there is a pending winner
    require!(
        pool.pending_winner != Pubkey::default(),
        "No pending winner to confirm"
    );
    
    require!(!pool.winner_confirmed, "Winner already confirmed");
    
    // Verify winner address matches the account provided
    require!(
        ctx.accounts.winner_token.owner == pool.pending_winner,
        "Winner token account does not match pending winner"
    );
    
    let prize_amount = pool.pending_prize_amount;
    
    // Transfer exactly 5 million USD1 to confirmed winner
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
    
    // Update pool state - subtract prize from pool balance
    pool.pool_balance -= prize_amount;
    pool.last_winner = pool.pending_winner;
    pool.last_prize_amount = prize_amount;
    pool.last_distribution = clock.unix_timestamp;
    pool.winner_confirmed = true;
    
    // Transfer accumulated fees to fee address (0x6c521c6eB53361e901EC2bC1a2D392c8e9796f77)
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
    
    // Clear pending winner data
    pool.pending_winner = Pubkey::default();
    pool.pending_prize_amount = 0;
    pool.winner_selected_at = 0;
    
    // Emit winner confirmed and paid event
    emit!(WinnerConfirmedEvent {
        winner: pool.last_winner,
        winning_number: pool.winning_lottery_number,
        prize_amount: prize_amount,
        remaining_pool: pool.pool_balance,
        timestamp: clock.unix_timestamp,
        confirmed_by: ctx.accounts.admin.key(),
    });
    
    Ok(())
}

// Part 2C: Cancel Winner Selection (Admin Only, if needed)
pub fn cancel_winner_selection(ctx: Context<CancelWinnerSelection>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    
    // Verify admin authority
    require!(
        ctx.accounts.admin.key() == pool.admin_authority,
        "Only admin can cancel winner selection"
    );
    
    // Verify there is a pending winner
    require!(
        pool.pending_winner != Pubkey::default(),
        "No pending winner to cancel"
    );
    
    require!(!pool.winner_confirmed, "Cannot cancel confirmed winner");
    
    // Clear pending winner data
    let cancelled_winner = pool.pending_winner;
    pool.pending_winner = Pubkey::default();
    pool.pending_prize_amount = 0;
    pool.winner_selected_at = 0;
    pool.winning_lottery_number = 0;
    
    // Emit cancellation event
    emit!(WinnerSelectionCancelledEvent {
        cancelled_winner: cancelled_winner,
        timestamp: Clock::get()?.unix_timestamp,
        cancelled_by: ctx.accounts.admin.key(),
    });
    
    Ok(())
}`,
  securityPoints: [
    '当奖池达到1000万USD1时自动选择中奖者，但不立即转账',
    '中奖者选择使用可验证随机函数，完全透明公正',
    '需要管理员手动确认后才会转账500万USD1奖金',
    '管理员可以取消错误的中奖者选择（转账前）',
    '所有操作都有详细的事件日志记录',
    '剩余500万USD1留在奖池中继续下一轮',
    '只有确认转账后才清空彩票记录开始新一轮'
  ]
};
