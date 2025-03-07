
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '../../context/WalletContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Import components
import DonationIncentive from './DonationIncentive';
import AmountSelector from './AmountSelector';
import DonationStats from './DonationStats';
import DonationActions from './DonationActions';
import DonationHistory from './DonationHistory';
import DonationSummary from './DonationSummary';
import ConfirmationCheckbox from './ConfirmationCheckbox';
import DonationHeader from './DonationHeader';
import { useDonationForm } from '../../hooks/useDonationForm';
import { useDonationTransactions } from '../../hooks/useDonationTransactions';

interface DonationCardContentProps {
  showWalletModal: () => void;
}

const DonationCardContent: React.FC<DonationCardContentProps> = ({ showWalletModal }) => {
  const { t } = useLanguage();
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
    t
  });

  const [showHistory, setShowHistory] = useState(false);

  const handleShareOnX = () => {
    const text = `I just donated $${total} USDT to OneDollarGoldCard! Join me in supporting this initiative that democratizes access to immigration opportunities. #OneDollarGoldCard`;
    const url = window.location.href;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const openTransaction = (txId: string) => {
    if (!txId) return;
    const explorerUrl = `https://solscan.io/tx/${txId}`;
    window.open(explorerUrl, '_blank');
  };

  const presetAmounts = [1, 10, 100, 1000, 10000];
  const lastDonationTime = donations.length > 0 
    ? new Date(donations[donations.length - 1].timestamp) 
    : undefined;

  return (
    <>
      <DonationHeader title={t('donation.title')} />
      
      <div className="p-6 space-y-6">
        <DonationIncentive amount={amount} />

        <AmountSelector 
          amount={amount}
          onChange={handleAmountChange}
          presetAmounts={presetAmounts}
          setAmount={setAmount}
        />
        
        <DonationSummary 
          fee={fee}
          total={total}
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
        
        {isWalletConnected && donations.length > 0 && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-between w-full py-2 px-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span>Donation History ({donations.length})</span>
            {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
        
        {isWalletConnected && showHistory && (
          <DonationHistory 
            donations={donations}
            openTransaction={openTransaction}
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
          donateButtonText={t('donation.button')}
          connectWalletText={t('donation.walletConnect')}
          shareOnXText="Share on X"
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default DonationCardContent;
