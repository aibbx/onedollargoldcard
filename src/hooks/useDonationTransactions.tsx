
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
    try {
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
      
      setIsLoading(true);
      
      // Show initial toast
      toast({
        title: "Preparing Donation",
        description: `Preparing your donation of $${numericAmount.toFixed(2)} USDT...`,
      });
      
      // Calculate total with 5% fee
      const totalAmount = numericAmount * 1.05; 
      console.log('Initiating donation for amount:', totalAmount);
      console.log('Current wallet type:', walletType);
      
      // Set a timeout to show a more helpful message if it's taking too long
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          toast({
            title: "Processing Transaction",
            description: `Please approve the transaction in your ${walletType} wallet. This might take a moment...`,
          });
        }
      }, 5000);
      
      // Set another timeout for an extended wait
      const extendedTimeoutId = setTimeout(() => {
        if (isLoading) {
          toast({
            title: "Still Processing",
            description: "This is taking longer than expected. Please check your wallet to ensure you've approved the transaction.",
          });
        }
      }, 15000);
      
      // Try to send donation
      const transactionId = await sendDonation(totalAmount);
      
      // Clear the timeouts
      clearTimeout(timeoutId);
      clearTimeout(extendedTimeoutId);
      
      if (transactionId) {
        console.log('Transaction completed successfully with ID:', transactionId);
        resetForm();
        toast({
          title: "Donation Successful",
          description: `Thank you! Your donation of $${totalAmount.toFixed(2)} USDT has been confirmed.`,
        });
        return transactionId;
      } else {
        throw new Error("Transaction failed - no transaction ID returned");
      }
    } catch (error) {
      console.error('Donation failed:', error);
      
      // Only show toast if not shown by transaction handlers
      if (!error.message?.includes("already shown")) {
        const errorMessage = error instanceof Error ? error.message : "There was an error processing your donation. Please try again.";
        
        // Provide more helpful guidance based on error messages
        let helpfulMessage = errorMessage;
        
        if (errorMessage.includes("insufficient") || errorMessage.includes("Insufficient")) {
          helpfulMessage = "You don't have enough USDT in your wallet. Please add more USDT and try again.";
        } else if (errorMessage.includes("rejected") || errorMessage.includes("cancelled") || errorMessage.includes("denied")) {
          helpfulMessage = "You rejected the transaction in your wallet. Please try again when you're ready to approve.";
        } else if (errorMessage.includes("timeout") || errorMessage.includes("timed out")) {
          helpfulMessage = "The transaction timed out. The Solana network might be congested. Please try again.";
        } else if (errorMessage.includes("USDT token account") || errorMessage.includes("token account")) {
          helpfulMessage = "You need a USDT token account. Please add some USDT to your wallet first.";
        }
        
        toast({
          title: "Donation Failed",
          description: helpfulMessage,
          variant: "destructive",
        });
      }
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
