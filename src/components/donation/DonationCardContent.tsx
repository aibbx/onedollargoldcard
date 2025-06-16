
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '../../context/WalletContext';

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
    const text = `Amazing! I just donated $${total} on #OneDollarGoldCard on #EVM to win $5M for the Gold Card application! Join now:`;
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
