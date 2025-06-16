import { useState, useEffect } from 'react';
import { DonationRecord } from '../types/wallet';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';
import { getPoolStatus } from '../services/supabaseService';

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
        await calculateWinningChance(total);
      } catch (error) {
        console.error("Error updating donation stats:", error);
        // Keep the existing values if there's an error
      }
    } else {
      setTotalDonationAmount(0);
      setWinningChance(0);
    }
  };

  // Calculate winning chance based on real pool data
  const calculateWinningChance = async (userContribution: number) => {
    try {
      setIsLoading(true);
      
      // Get real pool status from database
      const poolStatus = await getPoolStatus();
      
      if (poolStatus && poolStatus.total_amount > 0) {
        // Calculate pool amount (95% of total donations goes to pool)
        const poolAmount = poolStatus.pool_amount || (poolStatus.total_amount * 0.95);
        
        // Each $1 donated = 1 entry (based on donation amount including fee)
        const userEntries = userContribution;
        
        // Total entries based on pool size (pool is 95% of total donations)
        // So if pool is X, total donations were X / 0.95
        const totalDonations = poolAmount / 0.95;
        const totalEntries = totalDonations;
        
        // Calculate percentage chance
        const chancePercentage = totalEntries > 0 ? (userEntries / totalEntries) * 100 : 0;
        
        console.log('Winning chance calculation:', {
          userContribution,
          poolAmount,
          totalDonations,
          chancePercentage
        });
        
        // Cap the percentage at 100%
        const cappedChance = Math.min(chancePercentage, 100);
        setWinningChance(cappedChance);
      } else {
        console.log('No pool data available, using fallback calculation');
        
        // Fallback calculation if no database data
        const estimatedPoolSize = 100; // Very small pool for early testing
        const userEntries = userContribution;
        const totalEntries = estimatedPoolSize;
        const chance = (userEntries / totalEntries) * 100;
        
        setWinningChance(Math.min(chance, 100));
      }
    } catch (error) {
      console.error("Error calculating winning chance:", error);
      
      // Fallback calculation on error
      const estimatedPoolSize = 100;
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
