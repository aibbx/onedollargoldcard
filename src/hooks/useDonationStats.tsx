import { useState, useEffect } from 'react';
import { DonationRecord } from '../types/wallet';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';

export const useDonationStats = (donations: DonationRecord[] = []) => {
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [winningChance, setWinningChance] = useState(0);

  // Update statistics when donations change
  const updateDonationStats = async () => {
    // Calculate total donations
    if (donations.length > 0) {
      const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
      setTotalDonationAmount(total);
      
      // Calculate winning chance based on the current pool size
      try {
        // In production, this would fetch the actual pool balance from the contract
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
      // This would be a real blockchain query in production
      // Here we would query the contract at CONTRACT_ADDRESSES.poolAddress
      
      // Placeholder for API call - this would be replaced with actual blockchain query
      const response = await fetch(`https://api.solscan.io/account?account=${CONTRACT_ADDRESSES.poolAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pool data');
      }
      
      const data = await response.json();
      
      // Extract the actual pool balance from the response
      // This is a placeholder - actual structure would depend on the API response
      const currentPoolSize = data?.tokenAmount?.uiAmount || 0;
      
      // Calculate chance based on contribution vs. total pool
      if (currentPoolSize > 0) {
        const userEntries = userContribution * 1; // Each $1 = 1 entry
        const totalEntries = currentPoolSize;
        const chance = (userEntries / totalEntries) * 100;
        
        setWinningChance(chance);
      } else {
        // If pool is empty, set chance to 0 (or 100 if user has donated)
        setWinningChance(userContribution > 0 ? 100 : 0);
      }
    } catch (error) {
      console.error("Error fetching pool size:", error);
      
      // Fallback calculation if we can't fetch real data
      // This assumes a current pool size of approximately $1M for calculation
      const estimatedPoolSize = 1000000;
      const userEntries = userContribution * 1;
      const totalEntries = estimatedPoolSize;
      const chance = (userEntries / totalEntries) * 100;
      
      setWinningChance(chance);
    }
  };

  useEffect(() => {
    updateDonationStats();
  }, [donations]);

  return {
    totalDonationAmount,
    winningChance,
    updateDonationStats
  };
};
