
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Users, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const PoolStats = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
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
    const text = "Amazing! I am in #OneDollarGoldCard on @solana to win $5M for the Gold Card application! Join now:";
    const url = "https://onedollargoldcard.com";
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="donation-section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600">
            {t('pool.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gold-100">
            <div className="p-8">
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center mr-3">
                      <Share2 className="w-5 h-5 text-gold-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{t('pool.share')}</span>
                  </div>
                  <Button 
                    onClick={handleShareOnX}
                    variant="outline"
                    className="flex items-center text-gray-700 hover:text-gold-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                    Share on X
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-800 mb-3">Public Donation Pool</h4>
                <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600 font-mono break-all flex items-center justify-between">
                  <span>onedollargoldcard.sol</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-xs hover:bg-gold-50 hover:text-gold-600"
                    onClick={() => {
                      navigator.clipboard.writeText('onedollargoldcard.sol');
                      toast({
                        title: "Copied!",
                        description: "Pool address copied to clipboard",
                      });
                    }}
                  >
                    Copy
                  </Button>
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
