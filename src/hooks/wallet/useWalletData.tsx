
import { useState, useEffect } from 'react';
import { DonationRecord, WalletType } from '../../types/wallet';
import { getUserDonations, getUserStats, UserStats } from '../../services/supabaseService';

export const useWalletData = (
  isWalletConnected: boolean,
  walletAddress: string
) => {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  // Load user donations from Supabase
  const loadUserDonations = async (address: string) => {
    try {
      const userDonations = await getUserDonations(address);
      if (userDonations.length > 0) {
        console.log('已从Supabase加载用户捐赠历史:', userDonations.length);
        setDonations(userDonations);
      }
    } catch (error) {
      console.error('加载用户捐赠历史错误:', error);
    }
  };

  // Load user stats from Supabase
  const loadUserStats = async (address: string) => {
    try {
      const stats = await getUserStats(address);
      if (stats) {
        console.log('已从Supabase加载用户统计信息:', stats);
        setUserStats(stats);
      }
    } catch (error) {
      console.error('加载用户统计信息错误:', error);
    }
  };

  // Load user data when wallet is connected
  useEffect(() => {
    if (isWalletConnected && walletAddress) {
      loadUserDonations(walletAddress);
      loadUserStats(walletAddress);
    }
  }, [isWalletConnected, walletAddress]);

  return {
    donations,
    setDonations,
    userStats,
    setUserStats,
    totalDonationAmount: userStats?.total_donated || 0,
    winningChance: userStats?.winning_chance || 0,
    loadUserDonations,
    loadUserStats
  };
};
