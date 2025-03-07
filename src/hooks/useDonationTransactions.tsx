
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '../context/WalletContext';

interface UseDonationTransactionsProps {
  isWalletConnected: boolean;
  showWalletModal: () => void;
  amount: string;
  isConfirmed: boolean;
  setError: (error: string) => void;
  resetForm: () => void;
  t: (key: string) => string;
}

export const useDonationTransactions = ({
  isWalletConnected,
  showWalletModal,
  amount,
  isConfirmed,
  setError,
  resetForm,
  t
}: UseDonationTransactionsProps) => {
  const { toast } = useToast();
  const { sendDonation } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDonation = async () => {
    if (!isWalletConnected) {
      showWalletModal();
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
      const totalAmount = parseFloat(amount) * 1.05; // Adding 5% fee
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

  return {
    handleDonation,
    isLoading
  };
};
