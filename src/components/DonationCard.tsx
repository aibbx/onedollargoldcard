
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, AlertCircle, Wallet, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const DonationCard = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [amount, setAmount] = useState('1.00');
  const [fee, setFee] = useState('0.05');
  const [total, setTotal] = useState('1.05');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [error, setError] = useState('');
  const [walletType, setWalletType] = useState('');
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
    // Calculate winning chance when wallet is connected
    if (isWalletConnected) {
      // Mock data for demonstration
      setTotalDonated(parseFloat(total));
      // Assuming pool size of $1,250,000 to calculate chance
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

  const connectWallet = (type: string) => {
    // Mock wallet connection
    setWalletType(type);
    setTimeout(() => {
      setIsWalletConnected(true);
      setShowWalletOptions(false);
      toast({
        title: "Wallet Connected",
        description: `Your ${type} wallet has been connected successfully.`,
      });
    }, 1000);
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
    
    // Handle donation logic here
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

  const presetAmounts = [1, 5, 10, 50, 100];

  return (
    <section className="py-24 bg-white">
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
                {/* Amount presets */}
                <div className="grid grid-cols-5 gap-2">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      className={`py-2 px-1 rounded-md transition-all duration-200 ${
                        parseFloat(amount) === preset
                          ? 'bg-gold-500 text-black font-medium'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => setAmount(preset.toString())}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
                
                {/* Donation amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('donation.amount')} (USDC)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      type="text"
                      value={amount}
                      onChange={handleAmountChange}
                      className="pl-8 border-2 focus:ring-gold-500 focus:border-gold-500"
                    />
                  </div>
                </div>
                
                {/* Fee and total */}
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">{t('donation.fee')}</span>
                  <span className="font-medium">${fee}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-800 font-medium">{t('donation.total')}</span>
                  <span className="font-bold text-lg">${total}</span>
                </div>

                {/* User stats when wallet connected */}
                {isWalletConnected && (
                  <div className="bg-gold-50 p-4 rounded-lg border border-gold-100">
                    <h4 className="font-medium text-gray-800 mb-2">Your Stats</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Donated:</span>
                        <span className="font-medium">${totalDonated.toFixed(2)} USDC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Winning Chance:</span>
                        <span className="font-medium text-gold-600">{winningChance.toFixed(6)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Wallet:</span>
                        <span className="font-medium">{walletType}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Wallet options */}
                {showWalletOptions && !isWalletConnected && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Select Wallet</h4>
                    <Button 
                      onClick={() => connectWallet('Phantom')}
                      className="w-full justify-between bg-purple-600 hover:bg-purple-700"
                    >
                      Phantom <img src="/wallet-icons/phantom-icon.svg" alt="Phantom" className="w-5 h-5" />
                    </Button>
                    <Button 
                      onClick={() => connectWallet('Solflare')}
                      className="w-full justify-between bg-orange-500 hover:bg-orange-600"
                    >
                      Solflare <img src="/wallet-icons/solflare-icon.svg" alt="Solflare" className="w-5 h-5" />
                    </Button>
                    <Button 
                      onClick={() => connectWallet('OKX')}
                      className="w-full justify-between bg-blue-600 hover:bg-blue-700"
                    >
                      OKX Wallet <img src="/wallet-icons/okx-icon.svg" alt="OKX" className="w-5 h-5" />
                    </Button>
                    <Button 
                      onClick={() => connectWallet('MetaMask')}
                      className="w-full justify-between bg-amber-500 hover:bg-amber-600"
                    >
                      MetaMask <img src="/wallet-icons/metamask-icon.svg" alt="MetaMask" className="w-5 h-5" />
                    </Button>
                  </div>
                )}
                
                {/* Confirmation checkbox */}
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
                
                {/* Error message */}
                {error && (
                  <div className="text-red-500 flex items-center text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                  </div>
                )}
                
                {/* Action buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleDonation}
                    className="btn-gold w-full py-3 flex justify-center items-center"
                  >
                    {isWalletConnected ? (
                      <>
                        {t('donation.button')}
                        <CheckCircle2 className="w-5 h-5 ml-2" />
                      </>
                    ) : (
                      <>
                        {t('donation.walletConnect')}
                        <Wallet className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                  
                  {isWalletConnected && (
                    <Button
                      onClick={handleShareOnX}
                      variant="outline"
                      className="w-full flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                      Share on X
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCard;
