
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '../../context/WalletContext';
import { Gift, Share2 } from 'lucide-react';

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
    referralCode // Pass referral code to the transaction hook
  });

  const handleShareOnX = () => {
    const text = `🎯 Just joined the USD1 On-Chain Lottery with $${total}! Win $5M for Gold Card application! 💰 Pure blockchain system + amazing referral rewards! Your turn:`;
    const url = "https://onedollargoldcard.com/";
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const presetAmounts = [1, 10, 100, 1000, 10000];
  const lastDonationTime = donations.length > 0 
    ? new Date(donations[donations.length - 1].timestamp) 
    : undefined;

  // Create change handler for AmountSelector
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAmountChange(e.target.value);
  };

  return (
    <>
      <DonationHeader title={t('donation.title')} />
      
      <div className="p-6 space-y-6">
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
        
        {/* Referral Rewards Information */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-800">Earn Referral Rewards!</h4>
          </div>
          <p className="text-green-700 text-sm mb-3">
            Share your referral code and earn up to <strong>10% commission</strong> on every donation from your referrals. 
            The more you share, the more you earn!
          </p>
          <button
            onClick={handleShareOnX}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share & Start Earning
          </button>
        </div>
        
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
      </div>
    </>
  );
};

export default DonationCardContent;
