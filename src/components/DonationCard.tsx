
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet, CONTRACT_ADDRESSES } from '../context/WalletContext';

// Import the extracted components
import ContractInfoCard from './donation/ContractInfoCard';
import DonationIncentive from './donation/DonationIncentive';
import AmountSelector from './donation/AmountSelector';
import WalletOptions from './donation/WalletOptions';
import DonationStats from './donation/DonationStats';
import DonationActions from './donation/DonationActions';

const DonationCard = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { isWalletConnected, walletType, walletAddress, connectWallet } = useWallet();
  const [amount, setAmount] = useState('100.00');
  const [fee, setFee] = useState('5.00');
  const [total, setTotal] = useState('105.00');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [totalDonated, setTotalDonated] = useState(0);
  const [winningChance, setWinningChance] = useState(0);
  const [showWalletOptions, setShowWalletOptions] = useState(false);

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

  useEffect(() => {
    if (isWalletConnected) {
      setTotalDonated(parseFloat(total));
      const poolSize = 1250000;
      const chance = (parseFloat(total) / poolSize) * 100;
      setWinningChance(chance);
    }
  }, [isWalletConnected, total]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  const handleConnectWallet = async (type: 'Phantom' | 'Solflare' | 'OKX' | 'MetaMask') => {
    try {
      await connectWallet(type);
      setShowWalletOptions(false);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };
  
  const handleDonation = () => {
    if (!isWalletConnected) {
      setShowWalletOptions(true);
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
    
    toast({
      title: "Donation Successful",
      description: `Donation of $${total} USDC initiated!`,
      variant: "default",
    });
  };

  const handleShareOnX = () => {
    const text = `I just donated $${total} USDC to OneDollarGoldCard! Join me in supporting this initiative that democratizes access to immigration opportunities. #OneDollarGoldCard`;
    const url = window.location.href;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const presetAmounts = [1, 10, 100, 1000, 10000];

  const openSolscan = () => {
    window.open(`https://solscan.io/account/BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt`, '_blank');
  };

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
                {/* Contract Info Card */}
                <ContractInfoCard 
                  contractName="onedollargoldcard.sol" 
                  contractAddress={CONTRACT_ADDRESSES.poolAddress}
                  onClick={openSolscan}
                />

                {/* Donation Incentive */}
                <DonationIncentive />

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
                    totalDonated={totalDonated}
                    winningChance={winningChance}
                    walletType={walletType}
                  />
                )}
                
                {/* Wallet Options */}
                {showWalletOptions && !isWalletConnected && (
                  <WalletOptions onConnect={handleConnectWallet} />
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCard;
