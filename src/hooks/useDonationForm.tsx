
import { useState } from 'react';

export const useDonationForm = () => {
  const [amount, setAmount] = useState('1');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [referralCode, setReferralCode] = useState('');

  // Calculate fee (5% of amount)
  const fee = parseFloat(amount) * 0.05 || 0;
  
  // Calculate total (amount + fee)
  const total = parseFloat(amount) + fee || 0;

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    setError(''); // Clear error when amount changes
  };

  const resetForm = () => {
    setAmount('1');
    setIsConfirmed(false);
    setError('');
    setReferralCode('');
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
    referralCode,
    setReferralCode,
    handleAmountChange,
    resetForm
  };
};
