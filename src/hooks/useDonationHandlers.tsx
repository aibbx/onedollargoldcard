
import { useState, useEffect } from 'react';
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
    
    if (!provider) {
      toast({
        title: "Wallet Error",
        description: "Your wallet provider is not properly connected. Please reconnect your wallet.",
        variant: "destructive",
      });
      console.error("No wallet provider available:", { walletType, walletAddress });
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
      console.log('Starting donation process:', { amount, walletType, walletAddress });
      console.log('Provider info:', { 
        type: walletType,
        hasPublicKey: walletType === 'OKX' ? !!provider?.solana?.publicKey : !!provider?.publicKey,
        methods: Object.keys(walletType === 'OKX' ? provider.solana || {} : provider || {})
      });
      
      // Process the transaction using our utility function
      const transactionId = await processTransaction(
        walletType,
        provider,
        amount,
        walletAddress
      );
      
      console.log('Transaction completed with ID:', transactionId);
      
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
              <p>{`Thank you for your donation of $${amount.toFixed(2)} USDT!`}</p>
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
        description: `Your donation could not be processed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Recover donation function
  const recoverDonation = (transactionId: string, amount: number): boolean => {
    try {
      // Check if donation with this transactionId already exists
      const existingDonation = donations.find(d => d.transactionId === transactionId);
      
      if (existingDonation) {
        toast({
          title: "Donation Already Recorded",
          description: `A donation with this transaction ID is already in your records.`,
        });
        return false;
      }
      
      // Create a new donation record
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
        return false;
      }
      
      // Update donation statistics
      updateDonationStats();
      
      // Show success message with explorer link
      const explorerUrl = getExplorerUrl(transactionId, walletType);
      
      toast({
        title: "Donation Record Recovered",
        description: (
          <div>
            <p>{`Successfully recovered your donation of $${amount.toFixed(2)} USDT!`}</p>
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
      
      return true;
    } catch (error) {
      console.error('Error recovering donation:', error);
      toast({
        title: "Recovery Failed",
        description: `The donation could not be recovered: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    donations,
    setDonations,
    totalDonationAmount,
    winningChance,
    sendDonation,
    recoverDonation,
    updateDonationStats,
    isProcessing
  };
};
