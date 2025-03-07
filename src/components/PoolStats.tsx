
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Clock, RefreshCw } from 'lucide-react';
import PoolAddressCard from './pool/PoolAddressCard';
import PoolProgress from './pool/PoolProgress';
import PoolStatCard from './pool/PoolStatCard';
import SharePoolCard from './pool/SharePoolCard';
import { usePoolStats } from '../hooks/usePoolStats';

const PoolStats = () => {
  const { t } = useLanguage();
  const {
    poolAmount,
    targetAmount,
    totalDonors,
    timeLeft,
    progress,
    isLoading
  } = usePoolStats();
  
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  const handleShareOnX = () => {
    const text = `Check out the OneDollarGoldCard pool! Already reached $${formatNumber(poolAmount.toFixed(2))} with ${formatNumber(totalDonors)} donors. Join us! #OneDollarGoldCard`;
    const url = window.location.href;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleRefresh = () => {
    window.location.reload();
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
                  <div className="flex justify-end mb-2">
                    <button 
                      onClick={handleRefresh}
                      className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Refresh data</span>
                    </button>
                  </div>
                  
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
