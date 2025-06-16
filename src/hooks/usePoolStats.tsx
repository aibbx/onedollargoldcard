
import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { CONTRACT_ADDRESSES } from '../utils/walletUtils';
import { useToast } from '@/hooks/use-toast';
import { getPoolStatus, subscribeToPoolStatus } from '../services/supabaseService';

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
        
        // 从Supabase获取真实奖池状态
        const poolStatus = await getPoolStatus();
        
        if (poolStatus) {
          console.log('从Supabase获取的奖池状态:', poolStatus);
          
          // 设置奖池金额 - 只计算pool部分（95%），不包括fee
          const poolOnlyAmount = poolStatus.pool_amount || 0;
          setPoolAmount(poolOnlyAmount);
          
          // 设置目标金额
          setTargetAmount(poolStatus.target_amount);
          
          // 设置捐赠者总数
          setTotalDonors(poolStatus.participant_count);
          
          // 计算进度百分比 - 基于pool金额，不包括fee
          const progressPercentage = (poolOnlyAmount / poolStatus.target_amount) * 100;
          setProgress(progressPercentage);
        } else {
          console.log('尚未获取到奖池状态，使用默认值');
          
          // 使用默认值而不是假数据
          setPoolAmount(0);
          setTotalDonors(0);
          setProgress(0);
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
        console.error('获取奖池统计数据错误:', error);
        toast({
          title: "无法获取最新的Gold Card基金数据",
          description: "请刷新重试。",
          variant: "destructive",
        });
        
        // 设置默认值以防止UI崩溃
        setPoolAmount(0);
        setTotalDonors(0);
        setProgress(0);
        setTimeLeft('90d 0h 0m');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPoolStats();
    
    // 设置刷新间隔 - 每5分钟刷新一次
    const interval = setInterval(fetchPoolStats, 300000);
    
    // 订阅奖池状态的实时更新
    const subscription = subscribeToPoolStatus((status) => {
      console.log('收到奖池状态更新:', status);
      
      // 计算pool金额（95%进入pool，5%进入fee）
      const poolOnlyAmount = status.pool_amount || 0;
      setPoolAmount(poolOnlyAmount);
      setTargetAmount(status.target_amount);
      setTotalDonors(status.participant_count);
      
      const progressPercentage = (poolOnlyAmount / status.target_amount) * 100;
      setProgress(progressPercentage);
    });
    
    return () => {
      clearInterval(interval);
      subscription.unsubscribe();
    };
  }, []); // 移除依赖以避免重复订阅

  return {
    poolAmount,
    targetAmount,
    totalDonors,
    timeLeft,
    progress,
    isLoading
  };
};
