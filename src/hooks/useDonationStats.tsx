import { useState, useEffect } from 'react';
import { DonationRecord } from '../types/wallet';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export const useDonationStats = (donations: DonationRecord[] = []) => {
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [winningChance, setWinningChance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Update statistics when donations change
  const updateDonationStats = async () => {
    // Calculate total donations
    if (donations.length > 0) {
      const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
      setTotalDonationAmount(total);
      
      // Calculate winning chance based on the current pool size
      try {
        await fetchPoolSize(total);
      } catch (error) {
        console.error("Error updating donation stats:", error);
        // Keep the existing values if there's an error
      }
    } else {
      setTotalDonationAmount(0);
      setWinningChance(0);
    }
  };

  // Fetch current pool size from blockchain and calculate chances
  const fetchPoolSize = async (userContribution: number) => {
    try {
      setIsLoading(true);
      
      // Create connection to Solana network
      const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
      
      // Create PublicKey from pool address
      const poolPublicKey = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
      
      // Get the actual balance from Solana
      const balance = await connection.getBalance(poolPublicKey);
      console.log('Pool balance in lamports:', balance);
      
      // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
      const solBalance = balance / 1_000_000_000;
      console.log('Pool balance in SOL:', solBalance);
      
      // For real application, this value would be used
      // For now, we'll use a minimum balance to give a meaningful percentage
      const effectiveBalance = Math.max(solBalance, 0.1);
      
      // Calculate the USD equivalent (assuming 1 SOL = $100 for simplicity)
      // In production, you would fetch the actual SOL price from an API
      const assumedSolPrice = 100; // $100 per SOL
      const poolUsdBalance = effectiveBalance * assumedSolPrice;
      
      // Calculate chance based on contribution vs. total pool
      const userEntries = userContribution; // Each $1 = 1 entry
      const totalEntries = poolUsdBalance;
      const chancePercentage = (userEntries / totalEntries) * 100;
      
      console.log('Chance calculation:', {
        userContribution,
        poolUsdBalance,
        chancePercentage
      });
      
      // Cap the percentage at 100% for very small pools
      const cappedChance = Math.min(chancePercentage, 100);
      setWinningChance(cappedChance);
    } catch (error) {
      console.error("Error fetching pool size:", error);
      
      // Fallback calculation if we can't fetch real data
      // This assumes a current pool size of approximately $1M for calculation
      const estimatedPoolSize = 1000000;
      const userEntries = userContribution * 1;
      const totalEntries = estimatedPoolSize;
      const chance = (userEntries / totalEntries) * 100;
      
      setWinningChance(chance);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateDonationStats();
  }, [donations]);

  return {
    totalDonationAmount,
    winningChance,
    updateDonationStats,
    isLoading
  };
};
