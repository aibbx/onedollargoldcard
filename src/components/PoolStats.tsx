
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Clock } from 'lucide-react';
import PoolAddressCard from './pool/PoolAddressCard';
import PoolProgress from './pool/PoolProgress';
import PoolStatCard from './pool/PoolStatCard';
import SharePoolCard from './pool/SharePoolCard';

const PoolStats = () => {
  const { t } = useLanguage();
  const [poolAmount, setPoolAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(10000000); // $10M
  const [totalDonors, setTotalDonors] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const animationDuration = 2000; // 2 seconds
    const targetPool = 1250000; // $1.25M
    const targetDonors = 5280;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      
      setPoolAmount(Math.floor(targetPool * progress));
      setTotalDonors(Math.floor(targetDonors * progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    setTimeLeft('45d 12h 32m');
    
    const calculateProgress = () => {
      const ratio = targetPool / targetAmount;
      const percentage = ratio * 100;
      setProgress(percentage);
    };
    
    setTimeout(calculateProgress, animationDuration);
  }, []);
  
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoolStats;
