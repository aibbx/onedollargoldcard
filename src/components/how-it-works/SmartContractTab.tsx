
import React from 'react';

const SmartContractTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Contract</h3>
      
      <div className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto text-sm shadow-lg border border-gray-800">
        <pre className="whitespace-pre-wrap">
          <code>
{`// Part 1: Donation Processing
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
    
    // Additional logic for processing donations...
    
    Ok(())
}`}
          </code>
        </pre>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="md:w-1/2">
          <h4 className="text-xl font-bold text-gray-800 mb-3">Backup Mechanism</h4>
          <div className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto text-sm shadow-lg border border-gray-800">
            <pre className="whitespace-pre-wrap">
              <code>
{`// Part 3: Inactivity Safeguard Mechanism
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
        // Transfer entire pool balance to last donor
        // Reset pool state
    }
    
    Ok(())
}

// Constants
const INACTIVITY_PERIOD: i64 = 7 * 24 * 60 * 60; // 7 days in seconds
const POOL_TARGET_AMOUNT: u64 = 10_000_000 * 1_000_000; // $10M in USDC`}
              </code>
            </pre>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h4 className="text-xl font-bold text-gray-800 mb-3">Backup Mechanism Explained</h4>
          <div className="bg-gold-50 rounded-lg p-4 border border-gold-200 h-full">
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-gold-600 text-sm font-bold">•</span>
                </div>
                <p>If no donations are made for 7 consecutive days, the last donor receives the entire pool</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-gold-600 text-sm font-bold">•</span>
                </div>
                <p>This safeguard incentivizes continued participation</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                  <span className="text-gold-600 text-sm font-bold">•</span>
                </div>
                <p>The inactivity timer resets with each new donation</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartContractTab;
