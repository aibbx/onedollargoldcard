
import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';
import { toast } from '@/hooks/use-toast';

export const usePoolStats = () => {
  const { donations } = useWallet();
  const [poolAmount, setPoolAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(10000000); // $10M target
  const [totalDonors, setTotalDonors] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculatePoolStats = async () => {
      try {
        setIsLoading(true);
        
        // Calculate total amount from all donations in the system
        let calculatedAmount = 0;
        let uniqueDonors = new Set();
        
        // If we have donations in the context, use them to calculate pool stats
        if (donations && donations.length > 0) {
          // Sum up all donations
          calculatedAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
          
          // Count unique donors based on transaction IDs
          // This is a local approximation - in a real app you'd track unique wallets server-side
          donations.forEach(donation => {
            if (donation.transactionId) {
              uniqueDonors.add(donation.transactionId.split('-')[0]); // Use first part of txID as a proxy for unique users
            }
          });
        }
        
        // Try to fetch additional pool data from the blockchain
        try {
          const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
          const poolPublicKey = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
          
          // Get the balance from the contract address
          const balance = await connection.getBalance(poolPublicKey);
          
          // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
          const solBalance = balance / 1_000_000_000;
          
          // Get SOL price in USD
          const solPrice = await fetchSolPrice();
          
          // Add the contract balance to our total (converted to USD)
          const contractBalanceUsd = solBalance * solPrice;
          calculatedAmount += contractBalanceUsd;
          
          console.log('Blockchain pool data:', {
            solBalance,
            solPrice,
            contractBalanceUsd
          });
        } catch (chainError) {
          console.error('Error fetching blockchain data:', chainError);
          // Continue with just the donation data we have
        }
        
        // Set the pool amount from our calculations
        setPoolAmount(calculatedAmount);
        
        // Set total donors
        setTotalDonors(Math.max(uniqueDonors.size, donations.length));
        
        // Calculate progress percentage
        const progressPercentage = (calculatedAmount / targetAmount) * 100;
        setProgress(progressPercentage);
        
        // Calculate time left - Setting deadline to 3 months from now
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 3);
        const now = new Date();
        const diffTime = Math.abs(endDate.getTime() - now.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${diffDays}d ${diffHours}h ${diffMinutes}m`);
      } catch (error) {
        console.error('Error calculating pool stats:', error);
        toast({
          title: "Couldn't fetch latest pool data",
          description: "Using cached data instead. Please refresh to try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    calculatePoolStats();
    
    // Set up a refresh interval
    const interval = setInterval(calculatePoolStats, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, [donations]);
  
  // Helper function to fetch SOL price
  const fetchSolPrice = async (): Promise<number> => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
      const data = await response.json();
      return data.solana.usd;
    } catch (error) {
      console.error('Error fetching SOL price:', error);
      return 100; // Fallback price if API is unavailable
    }
  };

  return {
    poolAmount,
    targetAmount,
    totalDonors,
    timeLeft,
    progress,
    isLoading
  };
};
