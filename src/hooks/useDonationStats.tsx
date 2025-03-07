
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
      
      // Calculate winning chance based on actual pool size (for production)
      // This should be fetched from the blockchain in a production app
      const currentPoolSize = 1250000; // Should be fetched from the contract in production
      const userContribution = total;
      const userEntries = userContribution * 100; // $1 = 100 entries
      const totalEntries = currentPoolSize * 100;
      const chance = (userEntries / totalEntries) * 100;
      
      setWinningChance(chance);
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
