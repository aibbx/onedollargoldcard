
import { useEffect, useRef } from 'react';
import { subscribeToUserStats, UserStats } from '../../services/supabaseService';

export const useWalletStatsSubscription = (
  isWalletConnected: boolean,
  walletAddress: string,
  setUserStats: (stats: UserStats) => void
) => {
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);

  // Subscribe to user stats updates
  useEffect(() => {
    // 清理之前的订阅
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }
    
    if (isWalletConnected && walletAddress) {
      subscriptionRef.current = subscribeToUserStats(walletAddress, (stats) => {
        console.log('收到用户统计信息更新:', stats);
        setUserStats(stats);
      });
    }
    
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [isWalletConnected, walletAddress, setUserStats]);
};
