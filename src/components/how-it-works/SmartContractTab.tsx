import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code, Shield, Zap } from 'lucide-react';
import InfoPoint from './InfoPoint';
import { CONTRACT_ADDRESSES } from '../../utils/walletUtils';

// Contract code sections
const contractSections = [
  {
    id: 'donation-processing',
    title: 'Donation Processing Contract',
    icon: <Code className="w-6 h-6 text-gold-600" />,
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
  },
  {
    id: 'winner-selection',
    title: 'Winner Selection Contract',
    icon: <Zap className="w-6 h-6 text-blue-600" />,
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
  },
  {
    id: 'inactivity-safeguard',
    title: '7-Day Inactivity Safeguard Contract',
    icon: <Shield className="w-6 h-6 text-purple-600" />,
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
  }
];

interface ContractCardProps {
  section: typeof contractSections[0];
  isOpen: boolean;
  toggleOpen: () => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ section, isOpen, toggleOpen }) => {
  return (
    <div className="mb-8 rounded-lg overflow-hidden border border-gray-200 transition-shadow duration-300 hover:shadow-lg bg-white">
      <div 
        className="bg-gradient-to-r from-gray-50 to-white p-6 flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            {section.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
        </div>
        <button
          className="text-gray-500 hover:text-gold-500 transition-colors"
          aria-label={isOpen ? "Collapse section" : "Expand section"}
        >
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="p-6 animate-fade-in">
          <p className="text-gray-700 mb-6">{section.description}</p>
          
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-300"></div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono ml-3">
              <code>{section.code}</code>
            </pre>
          </div>
          
          <div className="mt-6 bg-gold-50 p-6 rounded-lg border border-gold-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Security Features</h4>
            <ul className="space-y-2">
              {section.securityPoints.map((point, index) => (
                <InfoPoint key={index} text={point} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const SmartContractTab: React.FC = () => {
  const [openSectionId, setOpenSectionId] = useState('donation-processing');

  const toggleSection = (sectionId: string) => {
    setOpenSectionId(openSectionId === sectionId ? '' : sectionId);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Smart Contract</h3>
      
      <p className="text-gray-700 mb-8">
        Our platform is built on robust, audited smart contracts deployed on the Solana blockchain. 
        These contracts manage the entire donation process, winner selection, and backup mechanisms 
        with complete transparency and security.
      </p>
      
      <div className="space-y-4">
        {contractSections.map((section) => (
          <ContractCard 
            key={section.id}
            section={section}
            isOpen={openSectionId === section.id}
            toggleOpen={() => toggleSection(section.id)}
          />
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gold-200 mt-8">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Contract Addresses</h4>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Pool Contract:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-gold-600 font-mono">
              {CONTRACT_ADDRESSES.poolAddress}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Fee Recipient:</span>
            <code className="bg-gray-100 px-2 py-1 rounded text-gold-600 font-mono">
              {CONTRACT_ADDRESSES.feeAddress}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartContractTab;
