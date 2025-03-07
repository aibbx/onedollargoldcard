
import { useState, useEffect } from 'react';
import { DonationRecord } from '../types/wallet';

export const useDonationStats = (donations: DonationRecord[] = []) => {
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [winningChance, setWinningChance] = useState(0);

  // Update statistics when donations change
  const updateDonationStats = () => {
    if (donations.length > 0) {
      const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
      setTotalDonationAmount(total);
      
      // Calculate winning chance based on the current pool size
      // In production, this should fetch the actual pool size from the contract
      const fetchPoolSize = async () => {
        try {
          // In production, this would be fetched from the blockchain contract
          const currentPoolSize = 1250000; // Placeholder - should be replaced with contract call
          const userContribution = total;
          const userEntries = userContribution * 100; // $1 = 100 entries
          const totalEntries = currentPoolSize * 100;
          const chance = (userEntries / totalEntries) * 100;
          
          setWinningChance(chance);
        } catch (error) {
          console.error("Error fetching pool size:", error);
          setWinningChance(0);
        }
      };
      
      fetchPoolSize();
    } else {
      setTotalDonationAmount(0);
      setWinningChance(0);
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
