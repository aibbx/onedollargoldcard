
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Clock } from 'lucide-react';
import PoolAddressCard from './pool/PoolAddressCard';
import PoolProgress from './pool/PoolProgress';
import PoolStatCard from './pool/PoolStatCard';
import SharePoolCard from './pool/SharePoolCard';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';

const PoolStats = () => {
  const { t } = useLanguage();
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
        
        // This would be replaced with actual blockchain API calls
        // For example, querying the balance and metadata of the pool contract
        const poolData = await fetchBlockchainData();
        
        setPoolAmount(poolData.currentAmount);
        setTargetAmount(poolData.targetAmount);
        setTotalDonors(poolData.donors);
        
        // Calculate time left until deadline
        const now = new Date();
        const diffTime = Math.abs(poolData.endDate.getTime() - now.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${diffDays}d ${diffHours}h ${diffMinutes}m`);
        
        // Calculate progress percentage
        const progressPercentage = (poolData.currentAmount / poolData.targetAmount) * 100;
        setProgress(progressPercentage);
      } catch (error) {
        console.error("Error fetching pool data:", error);
        // Use fallback data if the fetch fails
        setPoolAmount(0);
        setTotalDonors(0);
        setTimeLeft('--');
        setProgress(0);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPoolData();
    
    // Set up refresh interval for real-time updates
    const refreshInterval = setInterval(fetchPoolData, 60000); // Refresh every minute
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Fetch real blockchain data
  const fetchBlockchainData = async () => {
    try {
      // This would be an actual blockchain API call in production
      // For example, using @solana/web3.js to query contract data
      
      // Placeholder API call to get pool data
      const response = await fetch(`https://api.solscan.io/account?account=${CONTRACT_ADDRESSES.poolAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pool data');
      }
      
      const data = await response.json();
      
      // Extract data from the response - actual structure depends on the blockchain and API
      // This is a placeholder implementation
      const currentAmount = data?.tokenAmount?.uiAmount || 0;
      
      // Get donor count from a separate API call or from contract data
      const donorResponse = await fetch(`https://api.solscan.io/account/transactions?account=${CONTRACT_ADDRESSES.poolAddress}`);
      const donorData = await donorResponse.json();
      const uniqueDonors = new Set(donorData?.data?.map((tx: any) => tx.signer) || []);
      
      // Calculate the end date based on contract data
      // This could be a fixed date or calculated based on deployment date
      // For now, using a placeholder of 45 days from now
      const endDate = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000);
      
      return {
        currentAmount,
        targetAmount: 10000000, // $10M fixed target
        donors: uniqueDonors.size,
        endDate
      };
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
      // Return fallback data if the real fetch fails
      return {
        currentAmount: 0,
        targetAmount: 10000000,
        donors: 0,
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
      };
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
