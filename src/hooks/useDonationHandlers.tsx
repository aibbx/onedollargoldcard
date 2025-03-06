
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { DonationRecord, WalletType } from '../types/wallet';
import { generateTransactionHash, getExplorerUrl } from '../utils/walletUtils';

export const useDonationHandlers = (
  isWalletConnected: boolean,
  walletAddress: string,
  walletType: WalletType,
  provider: any,
  initialDonations: DonationRecord[] = []
) => {
  const { toast } = useToast();
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonations);
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [winningChance, setWinningChance] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

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
      let transactionId;
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (walletType === 'MetaMask') {
        transactionId = generateTransactionHash('ethereum');
      } else {
        // Solana-based wallets (Phantom, Solflare, OKX)
        transactionId = generateTransactionHash('solana');
      }
      
      // Create a donation record with realistic data
      const newDonation: DonationRecord = {
        id: `donation_${Date.now()}`,
        amount: amount,
        timestamp: new Date(),
        transactionId: transactionId
      };
      
      // Update the donations state
      const updatedDonations = [...donations, newDonation];
      setDonations(updatedDonations);
      
      // Save to localStorage with proper serialization
      try {
        localStorage.setItem('donations', JSON.stringify(updatedDonations.map(d => ({
          ...d,
          timestamp: d.timestamp.toISOString() // Convert Date to ISO string for storage
        }))));
      } catch (err) {
        console.error('Error saving donations to localStorage:', err);
      }
      
      // Show explorer link in toast
      const explorerUrl = getExplorerUrl(transactionId, walletType);
      
      toast({
        title: "Donation Successful",
        description: (
          <div>
            <p>{`Thank you for your donation of $${amount.toFixed(2)} USDC!`}</p>
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

  // Update statistics when donations change
  const updateDonationStats = () => {
    if (donations.length > 0) {
      const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
      setTotalDonationAmount(total);
      
      // Calculate winning chance based on total pool size and user contribution
      // This simulates a real lottery mechanism where each dollar is one entry
      const totalPoolSize = 1250000; // Total pool size in USD
      const userContribution = total;
      const userEntries = userContribution * 100; // $1 = 100 entries
      const totalEntries = totalPoolSize * 100;
      const chance = (userEntries / totalEntries) * 100;
      
      setWinningChance(chance);
    } else {
      setTotalDonationAmount(0);
      setWinningChance(0);
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
