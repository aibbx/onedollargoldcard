
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
      
      // Create connection to Solana mainnet
      const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
      
      // Create PublicKey from pool address
      const poolPublicKey = new PublicKey(CONTRACT_ADDRESSES.poolAddress);
      
      // Get the actual balance from Solana
      const balance = await connection.getBalance(poolPublicKey);
      console.log('Pool balance in lamports:', balance);
      
      // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
      const solBalance = balance / 1_000_000_000;
      console.log('Pool balance in SOL:', solBalance);
      
      // For real application with real SOL we use the actual balance
      const effectiveBalance = Math.max(solBalance, 0.001); // Small minimum to avoid division by zero
      
      // Get current SOL price from a public API
      let solPrice = 100; // Default fallback price
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await response.json();
        solPrice = data.solana.usd;
        console.log('Current SOL price (USD):', solPrice);
      } catch (e) {
        console.error('Error fetching SOL price, using fallback value:', e);
      }
      
      // Calculate pool value in USD
      const poolUsdBalance = effectiveBalance * solPrice;
      
      // Calculate chance based on contribution vs. total pool
      const userEntries = userContribution; // Each $1 = 1 entry
      const totalEntries = poolUsdBalance;
      const chancePercentage = (userEntries / totalEntries) * 100;
      
      console.log('Chance calculation:', {
        userContribution,
        poolUsdBalance,
        chancePercentage
      });
      
      // Cap the percentage at 100%
      const cappedChance = Math.min(chancePercentage, 100);
      setWinningChance(cappedChance);
    } catch (error) {
      console.error("Error fetching pool size:", error);
      
      // Fallback calculation
      const estimatedPoolSize = 1000; // Smaller pool size to show more realistic chances
      const userEntries = userContribution;
      const totalEntries = estimatedPoolSize;
      const chance = (userEntries / totalEntries) * 100;
      
      setWinningChance(Math.min(chance, 100));
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
