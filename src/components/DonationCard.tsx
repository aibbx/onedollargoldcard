
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const DonationCard = () => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('1.00');
  const [fee, setFee] = useState('0.05');
  const [total, setTotal] = useState('1.05');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [error, setError] = useState('');

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

  const connectWallet = () => {
    // Mock wallet connection
    setTimeout(() => {
      setIsWalletConnected(true);
    }, 1000);
  };
  
  const handleDonation = () => {
    if (!isWalletConnected) {
      connectWallet();
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
    alert(`Donation of ${total} USDC initiated!`);
  };

  const presetAmounts = [1, 5, 10, 50, 100];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gold-gradient opacity-30 blur-md"></div>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden relative">
              <div className="bg-gold-500 px-6 py-4 text-black">
                <h3 className="font-bold text-xl">{t('donation.title')}</h3>
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
                
                {/* Action button */}
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
                    t('donation.walletConnect')
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCard;
