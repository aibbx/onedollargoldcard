
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '../../context/WalletContext';
import { Gift, Share2, Wallet, TrendingUp } from 'lucide-react';

// Import components
import DonationIncentive from './DonationIncentive';
import AmountSelector from './AmountSelector';
import DonationStats from './DonationStats';
import DonationActions from './DonationActions';
import DonationSummary from './DonationSummary';
import ConfirmationCheckbox from './ConfirmationCheckbox';
import DonationHeader from './DonationHeader';
import ReferralCodeInput from './ReferralCodeInput';
import { useDonationForm } from '../../hooks/useDonationForm';
import { useDonationTransactions } from '../../hooks/useDonationTransactions';

interface DonationCardContentProps {
  showWalletModal: () => void;
}

const DonationCardContent: React.FC<DonationCardContentProps> = ({ showWalletModal }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { 
    isWalletConnected, 
    walletType, 
    walletAddress, 
    donations,
    totalDonationAmount,
    winningChance
  } = useWallet();
  
  const {
    amount, 
    setAmount,
    fee,
    total,
    isConfirmed,
    setIsConfirmed,
    error,
    setError,
    referralCode,
    setReferralCode,
    handleAmountChange,
    resetForm
  } = useDonationForm();

  const { handleDonation, isLoading } = useDonationTransactions({
    isWalletConnected,
    showWalletModal,
    amount,
    isConfirmed,
    setError,
    resetForm,
    t,
    referralCode
  });

  const handleShareOnX = () => {
    const text = `🎯 One USD1 for $5M! Just joined the on-chain system to win $5M for Gold Card application! 💰 Pure blockchain system + amazing referral rewards! Your turn:`;
    const url = "https://onedollargoldcard.com/";
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const presetAmounts = [1, 10, 100, 1000, 10000];
  const lastDonationTime = donations.length > 0 
    ? new Date(donations[donations.length - 1].timestamp) 
    : undefined;

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAmountChange(e.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Wallet className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-bold text-white">Join the Revolution</h2>
        </div>
        <p className="text-blue-100">One donation, life-changing opportunity</p>
      </div>
      
      <div className="p-8 space-y-8">
        {/* Live pool status */}
        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">Live Pool Status</span>
              </div>
              <div className="text-2xl font-bold text-white">$2,143,567 USD1</div>
              <div className="text-gray-300 text-sm">Target: $10,000,000 USD1</div>
            </div>
            <div className="text-right">
              <div className="text-green-400 text-sm font-medium">21.4% Complete</div>
              <div className="w-20 h-2 bg-gray-700 rounded-full mt-2">
                <div className="w-1/5 h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <DonationIncentive amount={amount} />

        <AmountSelector 
          amount={amount}
          onChange={handleAmountInputChange}
          presetAmounts={presetAmounts}
          setAmount={setAmount}
        />
        
        <ReferralCodeInput
          referralCode={referralCode}
          setReferralCode={setReferralCode}
          disabled={isLoading}
        />
        
        <DonationSummary 
          fee={fee.toFixed(2)}
          total={total.toFixed(2)}
          translatedFee={t('donation.fee')}
          translatedTotal={t('donation.total')}
        />

        {isWalletConnected && (
          <DonationStats 
            totalDonated={totalDonationAmount}
            winningChance={winningChance}
            walletType={walletType}
            walletAddress={walletAddress}
            donationCount={donations.length}
            lastDonationTime={lastDonationTime}
          />
        )}
        
        <ConfirmationCheckbox 
          isConfirmed={isConfirmed}
          setIsConfirmed={setIsConfirmed}
          error={error}
          confirmationText={t('donation.confirmation')}
        />
        
        <DonationActions 
          isWalletConnected={isWalletConnected}
          handleDonation={handleDonation}
          handleShareOnX={handleShareOnX}
          donateButtonText="Donate USD1"
          connectWalletText={t('donation.walletConnect')}
          shareOnXText="Share on X"
          isLoading={isLoading}
        />

        {/* Enhanced Referral Rewards Information */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white text-lg mb-3">Earn Big with Referrals!</h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Share your referral code and earn up to <strong className="text-purple-400">50% service fee</strong> on every 
                donation from your referrals. Build your network and maximize your earnings!
              </p>
              <button
                onClick={handleShareOnX}
                className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                <Share2 className="w-4 h-4" />
                Start Earning Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCardContent;
