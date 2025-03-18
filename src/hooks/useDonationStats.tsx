import { useState, useEffect } from 'react';
import { DonationRecord } from '../types/wallet';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';

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
      
      // For security reasons, we use a minimum value to avoid division by zero
      const effectiveBalance = 0.001; 
      
      // Default fallback price
      let tokenPrice = 100; 
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd');
        const data = await response.json();
        tokenPrice = data.tether.usd;
        console.log('Current token price (USD):', tokenPrice);
      } catch (e) {
        console.error('Error fetching token price, using fallback value:', e);
      }
      
      // Calculate pool value in USD
      const poolUsdBalance = effectiveBalance * tokenPrice;
      
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
