
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
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
  const { sendDonation, isProcessing } = useWallet();
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
      console.log('Initiating donation transaction for amount:', totalAmount);
      
      const transactionId = await sendDonation(totalAmount);
      
      if (transactionId) {
        console.log('Transaction completed successfully with ID:', transactionId);
        resetForm();
        toast({
          title: "Donation Successful",
          description: `Your donation of $${totalAmount.toFixed(2)} has been submitted. Thank you for your support!`,
        });
      } else {
        throw new Error("Transaction failed - no transaction ID returned");
      }
    } catch (error) {
      console.error('Donation failed:', error);
      toast({
        title: "Donation Failed",
        description: error instanceof Error 
          ? `There was an error: ${error.message}` 
          : "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDonation,
    isLoading: isLoading || isProcessing
  };
};
