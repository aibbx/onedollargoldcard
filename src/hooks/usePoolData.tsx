
import { useState, useEffect } from 'react';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';
import { DonationRecord } from '../types/wallet';
import { toast } from '@/hooks/use-toast';

interface PoolData {
  poolAmount: number;
  targetAmount: number;
  totalDonors: number;
  timeLeft: string;
  progress: number;
  isLoading: boolean;
}

interface UsePoolDataProps {
  donations: DonationRecord[];
}

export const usePoolData = ({ donations }: UsePoolDataProps): PoolData => {
  const [poolAmount, setPoolAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(10000000); // $10M target
  const [totalDonors, setTotalDonors] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Calculate the pool amount directly from donations
    const calculatePoolAmount = () => {
      const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
      return totalAmount;
    };
    
    // Fetch real data from the blockchain
    const fetchPoolData = async () => {
      try {
        setIsLoading(true);
        
        // Get the donation amount directly from the WalletContext
        const donationAmount = calculatePoolAmount();
        
        // Update pool stats with real donation data
        setPoolAmount(donationAmount);
        setTotalDonors(donations.length || 0);
        
        // Calculate progress percentage
        const progressPercentage = (donationAmount / targetAmount) * 100;
        setProgress(progressPercentage);
        
        // Calculate default time left - 30 days from now
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);
        const now = new Date();
        const diffTime = Math.abs(endDate.getTime() - now.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${diffDays}d ${diffHours}h ${diffMinutes}m`);
      } catch (error) {
        console.error("Error updating pool data:", error);
        toast({
          title: "Error updating pool statistics",
          description: "Could not retrieve the latest pool data. Using available data instead.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPoolData();
    
    // Set up refresh interval for real-time updates
    const refreshInterval = setInterval(fetchPoolData, 60000); // Refresh every minute
    
    return () => clearInterval(refreshInterval);
  }, [donations]);

  return {
    poolAmount,
    targetAmount,
    totalDonors,
    timeLeft,
    progress,
    isLoading
  };
};
