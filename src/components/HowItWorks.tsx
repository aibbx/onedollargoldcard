
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Code, Coins, Cpu, Shield, Users } from 'lucide-react';

const HowItWorks = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('donationMechanics');

  const tabs = [
    { id: 'donationMechanics', label: 'Donation Mechanics', icon: <Coins className="w-5 h-5" /> },
    { id: 'winnerSelection', label: 'Winner Selection', icon: <Users className="w-5 h-5" /> },
    { id: 'smartContract', label: 'Smart Contract', icon: <Code className="w-5 h-5" /> },
    { id: 'security', label: 'Security Features', icon: <Shield className="w-5 h-5" /> },
    { id: 'whySolana', label: 'Why Solana?', icon: <Cpu className="w-5 h-5" /> },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">{t('howItWorks.title')}</h2>
          <div className="w-20 h-1 bg-gold-400 mx-auto"></div>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gold-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gold-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          {/* Donation Mechanics */}
          {activeTab === 'donationMechanics' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Donation Mechanics</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-gold-600 text-sm font-bold">•</span>
                  </div>
                  <p>Minimum donation of $1.00 plus a 5% service fee (1.05 USDC)</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-gold-600 text-sm font-bold">•</span>
                  </div>
                  <p>All donations go directly to the prize pool</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-gold-600 text-sm font-bold">•</span>
                  </div>
                  <p>A 5% service fee is added for platform operations (audits, legal, maintenance)</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-gold-600 text-sm font-bold">•</span>
                  </div>
                  <p>Each donation increases your chance to win proportionally</p>
                </li>
              </ul>
              
              <div className="bg-gold-50 p-6 rounded-lg border border-gold-200 mt-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Backup Mechanism</h4>
                <p className="text-gray-700">
                  If the pool doesn't reach $10 million and there are no donations for 7 days, 
                  the last donor automatically receives the entire pool. This ensures that funds aren't locked indefinitely.
                </p>
              </div>
            </div>
          )}
          
          {/* Winner Selection */}
          {activeTab === 'winnerSelection' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Winner Selection</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-gold-600 text-sm font-bold">•</span>
                  </div>
                  <p>When the pool reaches $10 million, a winner is selected</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-gold-600 text-sm font-bold">•</span>
                  </div>
                  <p>Selection uses Switchboard VRF (Verifiable Random Function) for transparency</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-gold-600 text-sm font-bold">•</span>
                  </div>
                  <p>The winner receives $5 million USDC automatically</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-gold-600 text-sm font-bold">•</span>
                  </div>
                  <p>The remaining $5 million stays in the pool for the next round</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
                    <span className="text-gold-600 text-sm font-bold">•</span>
                  </div>
                  <p>Donations continue to accumulate for the next milestone</p>
                </li>
              </ul>
              
              <div className="bg-gold-50 p-6 rounded-lg border border-gold-200 mt-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Fairness Guarantees</h4>
                <p className="text-gray-700">
                  Our winner selection process is completely transparent and fair. The smart contract 
                  verifies the pool has reached $10 million, uses Switchboard VRF for provably fair random 
                  number generation, and selects winners based on their proportional contribution.
                </p>
              </div>
            </div>
          )}
          
          {/* Smart Contract */}
          {activeTab === 'smartContract' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Contract</h3>
              
              <div className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto text-sm">
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
              
              <h4 className="text-xl font-bold text-gray-800 mt-6 mb-3">Inactivity Safeguard</h4>
              <div className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto text-sm">
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
          )}
          
          {/* Security Features */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Security Features</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Donation Security</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                        <span className="text-gold-600 text-xs font-bold">✓</span>
                      </div>
                      <p>Ensures the service fee is exactly 5% of the donation amount</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                        <span className="text-gold-600 text-xs font-bold">✓</span>
                      </div>
                      <p>Transfers donation to prize pool and service fee to platform wallet</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                        <span className="text-gold-600 text-xs font-bold">✓</span>
                      </div>
                      <p>Records timestamp of donation for the 7-day inactivity check</p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Winner Selection Security</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                        <span className="text-gold-600 text-xs font-bold">✓</span>
                      </div>
                      <p>Uses Switchboard VRF for provably fair random number generation</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                        <span className="text-gold-600 text-xs font-bold">✓</span>
                      </div>
                      <p>Selects winner based on their proportional contribution</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                        <span className="text-gold-600 text-xs font-bold">✓</span>
                      </div>
                      <p>Emits blockchain events for transparent transaction tracking</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gold-50 p-6 rounded-lg border border-gold-200 mt-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Transparency & Security</h4>
                <p className="text-gray-700 mb-4">
                  Our platform is built with transparency and security as core principles:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                      <span className="text-gold-600 text-xs font-bold">✓</span>
                    </div>
                    <p>All code is open source and audited</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                      <span className="text-gold-600 text-xs font-bold">✓</span>
                    </div>
                    <p>Smart contract available for public review</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                      <span className="text-gold-600 text-xs font-bold">✓</span>
                    </div>
                    <p>All donations and prize distributions recorded on-chain</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
                      <span className="text-gold-600 text-xs font-bold">✓</span>
                    </div>
                    <p>No centralized control over funds</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Why Solana */}
          {activeTab === 'whySolana' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Solana?</h3>
              <p className="text-gray-700 mb-6">
                We've chosen the Solana blockchain for its low transaction costs, high throughput, and robust ecosystem. This allows for:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Minimal Fees</h4>
                    <p className="text-gray-700">Even for small donations, transaction costs remain extremely low</p>
                  </div>
                </div>
                
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Fast Transactions</h4>
                    <p className="text-gray-700">Near-instantaneous transaction confirmation</p>
                  </div>
                </div>
                
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Full Transparency</h4>
                    <p className="text-gray-700">Complete on-chain verification of all transactions</p>
                  </div>
                </div>
                
                <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Secure Selection</h4>
                    <p className="text-gray-700">Tamper-proof random selection using Switchboard VRF</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Important Disclaimer</h4>
                <p className="text-gray-700">
                  OneDollarGoldCard is not affiliated with any government entity or official immigration program. 
                  We do not guarantee that winning the prize will guarantee a successful Gold Card application or US residency. 
                  Participants are responsible for their own eligibility for immigration programs and should consult with qualified immigration attorneys.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto">
          <div className="inline-block bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            Backup Mechanism
          </div>
          <p className="text-gray-700">
            {t('pool.backupInfo')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
