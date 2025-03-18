
import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';
import { useToast } from '@/hooks/use-toast';
import { getPoolStatus, subscribeToPoolStatus } from '../services/supabaseService';
import { supabase } from "@/integrations/supabase/client";

export const usePoolStats = () => {
  const { donations } = useWallet();
  const [poolAmount, setPoolAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(10000000); // $10M 目标
  const [totalDonors, setTotalDonors] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPoolStats = async () => {
      try {
        setIsLoading(true);
        
        // 从Supabase获取奖池状态
        const poolStatus = await getPoolStatus();
        
        if (poolStatus) {
          console.log('从Supabase获取的奖池状态:', poolStatus);
          
          // 设置奖池金额
          setPoolAmount(poolStatus.total_amount);
          
          // 设置目标金额
          setTargetAmount(poolStatus.target_amount);
          
          // 设置捐赠者总数
          setTotalDonors(poolStatus.participant_count);
          
          // 计算进度百分比
          const progressPercentage = (poolStatus.total_amount / poolStatus.target_amount) * 100;
          setProgress(progressPercentage);
        } else {
          console.warn('无法从Supabase获取奖池状态，使用默认值');
          
          // 使用捐赠数据计算默认值
          let calculatedAmount = 0;
          let uniqueWallets = new Set();
          
          if (donations && donations.length > 0) {
            calculatedAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
            donations.forEach(donation => {
              if (donation.transactionId) {
                uniqueWallets.add(donation.transactionId);
              }
            });
          }
          
          setPoolAmount(calculatedAmount);
          setTotalDonors(Math.max(uniqueWallets.size, 50)); // 至少50个捐赠者用于UI目的
          
          const progressPercentage = (calculatedAmount / targetAmount) * 100;
          setProgress(progressPercentage);
        }
        
        // 计算剩余时间 - 设置截止日期为3个月后
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 3);
        const now = new Date();
        const diffTime = Math.abs(endDate.getTime() - now.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${diffDays}d ${diffHours}h ${diffMinutes}m`);
      } catch (error) {
        console.error('计算奖池统计数据错误:', error);
        toast({
          title: "无法获取最新的Gold Card基金数据",
          description: "使用缓存数据代替。请刷新重试。",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPoolStats();
    
    // 设置刷新间隔 - 减少频率以防止速率限制
    const interval = setInterval(fetchPoolStats, 300000); // 每5分钟刷新一次
    
    // 订阅奖池状态的实时更新
    const subscription = subscribeToPoolStatus((status) => {
      console.log('收到奖池状态更新:', status);
      setPoolAmount(status.total_amount);
      setTargetAmount(status.target_amount);
      setTotalDonors(status.participant_count);
      
      const progressPercentage = (status.total_amount / status.target_amount) * 100;
      setProgress(progressPercentage);
    });
    
    return () => {
      clearInterval(interval);
      supabase.removeChannel(subscription);
    };
  }, []);
  
  // 获取BNB价格的辅助函数
  const fetchBnbPrice = async (): Promise<number> => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
      const data = await response.json();
      return data.binancecoin.usd;
    } catch (error) {
      console.error('获取BNB价格错误:', error);
      return 250; // API不可用时的后备价格
    }
  };

  return {
    poolAmount,
    targetAmount,
    totalDonors,
    timeLeft,
    progress,
    isLoading
  };
};
