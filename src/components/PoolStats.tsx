import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Users, Clock } from 'lucide-react';

const PoolStats = () => {
  const { t } = useLanguage();
  const [poolAmount, setPoolAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(10000000); // $10M
  const [totalDonors, setTotalDonors] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  
  // Simulate data loading and animation
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
    
    // Set estimated time
    setTimeLeft('45d 12h 32m');
    
    // Calculate progress
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

  return (
    <section className="py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-6">{t('pool.title')}</h2>
          <div className="w-20 h-1 bg-gold-400 mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Pool progress */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="text-gray-600 mb-1">{t('pool.currentAmount')}</div>
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gold-gradient">
                      ${formatNumber(poolAmount)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600 mb-1">{t('pool.target')}</div>
                    <div className="text-2xl font-semibold text-gray-800">
                      ${formatNumber(targetAmount)}
                    </div>
                  </div>
                </div>
                
                <Progress 
                  value={progress} 
                  className="h-3 bg-gray-100"
                />
                
                <div className="mt-2 text-sm text-gray-500 text-right">
                  {progress.toFixed(1)}% complete
                </div>
              </div>
              
              {/* Stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-gold-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{t('pool.donors')}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {formatNumber(totalDonors)}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center mr-3">
                      <Clock className="w-5 h-5 text-gold-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{t('pool.timeLeft')}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    {timeLeft}
                  </div>
                </div>
              </div>
              
              {/* Pool addresses */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-800 mb-3">Public Pool Contract</h4>
                <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600 font-mono break-all">
                  BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt
                </div>
                
                <h4 className="font-medium text-gray-800 mt-4 mb-3">Service Fee Address</h4>
                <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600 font-mono break-all">
                  5ecoPEMgbz8CL8ymcLVhUNFkp3ded5mWH731L2So7e9Q
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoolStats;
