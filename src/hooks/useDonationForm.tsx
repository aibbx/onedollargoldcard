
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const useDonationForm = (initialAmount = '100.00') => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(initialAmount);
  const [fee, setFee] = useState('5.00');
  const [total, setTotal] = useState('105.00');
  const [isConfirmed, setIsConfirmed] = useState(false);
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

  const resetForm = () => {
    setAmount(initialAmount);
    setIsConfirmed(false);
  };

  return {
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
  };
};
