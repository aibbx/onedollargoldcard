
import { useEffect } from 'react';
import { subscribeToUserStats, UserStats } from '../../services/supabaseService';

export const useWalletStatsSubscription = (
  isWalletConnected: boolean,
  walletAddress: string,
  setUserStats: (stats: UserStats) => void
) => {
  // Subscribe to user stats updates
  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    
    if (isWalletConnected && walletAddress) {
      subscription = subscribeToUserStats(walletAddress, (stats) => {
        console.log('收到用户统计信息更新:', stats);
        setUserStats(stats);
      });
    }
    
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [isWalletConnected, walletAddress, setUserStats]);
};
