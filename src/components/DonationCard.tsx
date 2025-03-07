import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet, WalletType } from '../context/WalletContext';
import ConnectWalletModal from './wallet/ConnectWalletModal';

// Import the components
import DonationIncentive from './donation/DonationIncentive';
import AmountSelector from './donation/AmountSelector';
import DonationStats from './donation/DonationStats';
import DonationActions from './donation/DonationActions';
import DonationHistory from './donation/DonationHistory';

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
  
  const [amount, setAmount] = useState('100.00');
  const [fee, setFee] = useState('5.00');
  const [total, setTotal] = useState('105.00');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    try {
      const amountValue = parseFloat(amount) || 0;
      if (amountValue < 1) {
        setError(t('donation.minAmount'));
      } else {
        setError('');
      }
      
      const feeValue = amountValue * 0.05;
      const totalValue = amountValue + feeValue;
      
      setFee(feeValue.toFixed(2));
      setTotal(totalValue.toFixed(2));
    } catch (error) {
      setError(t('donation.minAmount'));
    }
  }, [amount, t]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAmount(value);
    }
  };

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
        setAmount('100.00');
        setIsConfirmed(false);
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
              <div className="bg-gold-500 px-6 py-4 text-black flex items-center justify-between">
                <h3 className="font-bold text-xl">{t('donation.title')}</h3>
                <div className="flex items-center">
                  <span className="text-sm font-bold mr-1">$1</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#FFC300" stroke="#333" strokeWidth="1.5"/>
                    <path d="M8 12H16M12 8V16" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Donation Incentive */}
                <DonationIncentive amount={amount} />

                {/* Amount Selector */}
                <AmountSelector 
                  amount={amount}
                  onChange={handleAmountChange}
                  presetAmounts={presetAmounts}
                  setAmount={setAmount}
                />
                
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">{t('donation.fee')}</span>
                  <span className="font-medium">${fee}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-800 font-medium">{t('donation.total')}</span>
                  <span className="font-bold text-lg">${total}</span>
                </div>

                {/* Donation Stats */}
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
                
                {/* Donation History Toggle Button (only when connected and has donations) */}
                {isWalletConnected && donations.length > 0 && (
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center justify-between w-full py-2 px-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <span>Donation History ({donations.length})</span>
                    {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                )}
                
                {/* Donation History */}
                {isWalletConnected && showHistory && (
                  <DonationHistory 
                    donations={donations}
                    openTransaction={openTransaction}
                  />
                )}
                
                {/* Confirmation Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="confirmation"
                    checked={isConfirmed}
                    onCheckedChange={(checked) => setIsConfirmed(!!checked)}
                    className="data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500 mt-1"
                  />
                  <label htmlFor="confirmation" className="text-sm text-gray-600">
                    {t('donation.confirmation')}
                  </label>
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="text-red-500 flex items-center text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                  </div>
                )}
                
                {/* Donation Actions */}
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

      {/* Connect Wallet Modal */}
      <ConnectWalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnectWallet={handleConnectWallet}
      />
    </section>
  );
};

export default DonationCard;
