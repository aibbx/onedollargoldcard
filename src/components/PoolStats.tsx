
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Clock } from 'lucide-react';
import PoolAddressCard from './pool/PoolAddressCard';
import PoolProgress from './pool/PoolProgress';
import PoolStatCard from './pool/PoolStatCard';
import SharePoolCard from './pool/SharePoolCard';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';
import { useWallet } from '../context/WalletContext';
import { toast } from '@/hooks/use-toast';

const PoolStats = () => {
  const { t } = useLanguage();
  const { donations } = useWallet();
  
  const [poolAmount, setPoolAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(10000000); // $10M target
  const [totalDonors, setTotalDonors] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch real data from the blockchain
    const fetchPoolData = async () => {
      try {
        setIsLoading(true);
        
        // Calculate the global pool amount from the donations stored in the WalletContext
        const totalDonationsAmount = calculateTotalDonations();
        
        // Get additional pool data from blockchain, if available
        try {
          const poolData = await fetchBlockchainData();
          
          // Combine the blockchain data with our local donations data
          // This ensures we have the latest data even if the blockchain API fails
          const combinedAmount = Math.max(totalDonationsAmount, poolData.currentAmount);
          
          setPoolAmount(combinedAmount);
          setTargetAmount(poolData.targetAmount);
          setTotalDonors(Math.max(donations.length, poolData.donors));
          
          // Calculate time left until deadline
          const now = new Date();
          const diffTime = Math.abs(poolData.endDate.getTime() - now.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
          
          setTimeLeft(`${diffDays}d ${diffHours}h ${diffMinutes}m`);
        } catch (error) {
          console.error("Error fetching blockchain data:", error);
          
          // If blockchain API fails, just use our local donation data
          setPoolAmount(totalDonationsAmount);
          setTotalDonors(donations.length > 0 ? donations.length : calculateEstimatedDonors(totalDonationsAmount));
          
          // Calculate time left - 30 days from now as default deadline
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + 30);
          const now = new Date();
          const diffTime = Math.abs(endDate.getTime() - now.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
          
          setTimeLeft(`${diffDays}d ${diffHours}h ${diffMinutes}m`);
        }
        
        // Calculate progress percentage
        const progressPercentage = (poolAmount / targetAmount) * 100;
        setProgress(progressPercentage);
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
  
  // Calculate the total donations amount from the WalletContext
  const calculateTotalDonations = () => {
    if (!donations || donations.length === 0) return 0;
    
    return donations.reduce((total, donation) => total + donation.amount, 0);
  };
  
  // Estimate donors count based on amount if we don't have exact data
  const calculateEstimatedDonors = (amount: number) => {
    if (amount <= 0) return 0;
    
    // Estimate based on average donation amount of $65
    const avgDonationAmount = 65;
    return Math.max(1, Math.floor(amount / avgDonationAmount));
  };
  
  // Fetch blockchain data
  const fetchBlockchainData = async () => {
    try {
      // Try multiple endpoints to improve reliability
      let data = null;
      const endpoints = [
        `https://api.solscan.io/account?account=${CONTRACT_ADDRESSES.poolAddress}`,
        `https://public-api.solscan.io/account/${CONTRACT_ADDRESSES.poolAddress}`
      ];
      
      // Try each endpoint until we get a successful response
      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint);
          if (response.ok) {
            data = await response.json();
            break;
          }
        } catch (endpointError) {
          console.warn(`Failed to fetch from endpoint ${endpoint}:`, endpointError);
          // Continue to next endpoint
        }
      }
      
      // If we couldn't get data from any endpoint, throw an error
      if (!data) {
        throw new Error('Could not fetch blockchain data');
      }
      
      // Extract data from the response
      const currentAmount = data?.tokenAmount?.uiAmount || 0;
      
      // Get donor count - in a real implementation this would be from chain data
      const uniqueDonors = Math.max(donations.length, calculateEstimatedDonors(currentAmount));
      
      // Calculate the end date based on contract data
      // Default to 45 days from now
      const endDate = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);
      
      return {
        currentAmount,
        targetAmount: 10000000, // $10M fixed target
        donors: uniqueDonors,
        endDate
      };
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
      throw error;
    }
  };
  
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const handleShareOnX = () => {
    const text = `Check out the OneDollarGoldCard pool! Already reached $${formatNumber(poolAmount)} with ${formatNumber(totalDonors)} donors. Join us! #OneDollarGoldCard`;
    const url = window.location.href;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600">
            {t('pool.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Pool Address Card */}
          <PoolAddressCard />

          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gold-100">
            <div className="p-8">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
                </div>
              ) : (
                <>
                  {/* Pool Progress */}
                  <PoolProgress 
                    poolAmount={poolAmount}
                    targetAmount={targetAmount}
                    progress={progress}
                    formatNumber={formatNumber}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Donors Stat */}
                    <PoolStatCard 
                      icon={Users}
                      title={t('pool.donors')}
                      value={formatNumber(totalDonors)}
                    />
                    
                    {/* Time Left Stat */}
                    <PoolStatCard 
                      icon={Clock}
                      title={t('pool.timeLeft')}
                      value={timeLeft}
                    />
                    
                    {/* Share Card */}
                    <SharePoolCard 
                      title={t('pool.share')}
                      onShare={handleShareOnX}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoolStats;
