
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useWallet, WalletType } from '../context/WalletContext';
import ConnectWalletModal from './wallet/ConnectWalletModal';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Import the components
import DonationIncentive from './donation/DonationIncentive';
import AmountSelector from './donation/AmountSelector';
import DonationStats from './donation/DonationStats';
import DonationActions from './donation/DonationActions';
import DonationHistory from './donation/DonationHistory';
import DonationSummary from './donation/DonationSummary';
import ConfirmationCheckbox from './donation/ConfirmationCheckbox';
import DonationHeader from './donation/DonationHeader';
import { useDonationForm } from '../hooks/useDonationForm';

const DonationCard = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { 
    isWalletConnected, 
    walletType, 
    walletAddress, 
    connectWallet, 
    sendDonation,
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

  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleConnectWallet = async (type: WalletType) => {
    try {
      await connectWallet(type);
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return Promise.reject(error);
    }
  };
  
  const handleDonation = async () => {
    if (!isWalletConnected) {
      setShowWalletModal(true);
      return;
    }
    
    if (parseFloat(amount) < 1) {
      setError(t('donation.minAmount'));
      return;
    }
    
    if (!isConfirmed) {
      setError(t('donation.confirmation'));
      return;
    }
    
    try {
      setIsLoading(true);
      const totalAmount = parseFloat(total);
      const transactionId = await sendDonation(totalAmount);
      
      if (transactionId) {
        resetForm();
      }
    } catch (error) {
      console.error('Donation failed:', error);
      toast({
        title: "Donation Failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareOnX = () => {
    const text = `I just donated $${total} USDC to OneDollarGoldCard! Join me in supporting this initiative that democratizes access to immigration opportunities. #OneDollarGoldCard`;
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
    <section className="py-24 bg-white" id="donation-section">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gold-gradient opacity-30 blur-md"></div>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden relative">
              
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
            </div>
          </div>
        </div>
      </div>

      <ConnectWalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnectWallet={handleConnectWallet}
      />
    </section>
  );
};

export default DonationCard;
