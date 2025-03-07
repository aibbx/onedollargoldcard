
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
  const { sendDonation, isProcessing, walletType } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleDonation = async () => {
    // If wallet is not connected, show wallet modal
    if (!isWalletConnected) {
      showWalletModal();
      return;
    }
    
    // Validate amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount < 1) {
      setError(t('donation.minAmount'));
      return;
    }
    
    // Check confirmation
    if (!isConfirmed) {
      setError(t('donation.confirmation'));
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Calculate total with 5% fee
      const totalAmount = numericAmount * 1.05; 
      console.log('Initiating USDC donation transaction for amount:', totalAmount);
      console.log('Current wallet type:', walletType);
      
      // Set a timeout to show a more helpful message if it's taking too long
      const timeoutId = setTimeout(() => {
        toast({
          title: "Processing USDC Transaction",
          description: "Please approve the transaction in your wallet. This might take a moment...",
        });
      }, 3000);
      
      // Try to send donation using SOL as a placeholder for now
      // Later we will change this to use USDC tokens
      const transactionId = await sendDonation(totalAmount);
      
      // Clear the timeout
      clearTimeout(timeoutId);
      
      if (transactionId) {
        console.log('USDC Transaction completed successfully with ID:', transactionId);
        resetForm();
        toast({
          title: "Donation Successful",
          description: `Your donation of $${totalAmount.toFixed(2)} USDC has been submitted. Thank you for your support!`,
        });
        return transactionId;
      } else {
        throw new Error("Transaction failed - no transaction ID returned");
      }
    } catch (error) {
      console.error('USDC Donation failed:', error);
      toast({
        title: "Donation Failed",
        description: error instanceof Error 
          ? `There was an error: ${error.message}` 
          : "There was an error processing your USDC donation. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleDonation,
    isLoading: isLoading || isProcessing
  };
};
