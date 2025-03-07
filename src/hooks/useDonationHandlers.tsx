
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { DonationRecord, WalletType } from '../types/wallet';
import { getExplorerUrl } from '../utils/walletUtils';
import { processTransaction } from '../utils/transactions';
import { useDonationStats } from './useDonationStats';

export const useDonationHandlers = (
  isWalletConnected: boolean,
  walletAddress: string,
  walletType: WalletType,
  provider: any,
  initialDonations: DonationRecord[] = []
) => {
  const { toast } = useToast();
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonations);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { 
    totalDonationAmount, 
    winningChance, 
    updateDonationStats 
  } = useDonationStats(donations);

  // Send donation function
  const sendDonation = async (amount: number): Promise<string | null> => {
    if (!isWalletConnected || !walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to make a donation.",
        variant: "destructive",
      });
      return null;
    }
    
    if (isProcessing) {
      toast({
        title: "Transaction in Progress",
        description: "Please wait for your current transaction to complete.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setIsProcessing(true);
      
      // For demonstration and testing purposes
      const useSimulation = process.env.NODE_ENV === 'development' || !provider;
      
      // Process the transaction using our utility function
      const transactionId = await processTransaction(
        walletType,
        provider,
        amount,
        walletAddress,
        useSimulation
      );
      
      // Create a donation record
      if (transactionId) {
        const newDonation: DonationRecord = {
          id: `donation_${Date.now()}`,
          amount: amount,
          timestamp: new Date(),
          transactionId: transactionId
        };
        
        // Update donations state
        const updatedDonations = [...donations, newDonation];
        setDonations(updatedDonations);
        
        // Save to localStorage
        try {
          localStorage.setItem('donations', JSON.stringify(updatedDonations.map(d => ({
            ...d,
            timestamp: d.timestamp.toISOString()
          }))));
        } catch (err) {
          console.error('Error saving donations to localStorage:', err);
        }
        
        // Update donation statistics
        updateDonationStats();
        
        // Show success message with explorer link
        const explorerUrl = getExplorerUrl(transactionId, walletType);
        
        toast({
          title: "Donation Successful",
          description: (
            <div>
              <p>{`Thank you for your donation of $${amount.toFixed(2)} ${walletType === 'MetaMask' ? 'ETH' : 'USDC'}!`}</p>
              <a 
                href={explorerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 underline mt-2 inline-block"
              >
                View transaction
              </a>
            </div>
          ),
        });
        
        return transactionId;
      } else {
        throw new Error("Transaction failed - no transaction ID returned");
      }
    } catch (error) {
      console.error('Error sending donation:', error);
      toast({
        title: "Donation Failed",
        description: "Your donation could not be processed. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    donations,
    setDonations,
    totalDonationAmount,
    winningChance,
    sendDonation,
    updateDonationStats,
    isProcessing
  };
};
