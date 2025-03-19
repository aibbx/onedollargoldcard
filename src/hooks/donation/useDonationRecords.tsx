
import { useState, useEffect } from 'react';
import { DonationRecord } from '../../types/wallet';
import { getUserDonations } from '../../services/supabaseService';

export const useDonationRecords = (
  isWalletConnected: boolean,
  walletAddress: string,
  initialDonations: DonationRecord[] = []
) => {
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonations);
  
  // Load initial donation history
  useEffect(() => {
    if (isWalletConnected && walletAddress) {
      getUserDonations(walletAddress).then(userDonations => {
        if (userDonations.length > 0) {
          setDonations(userDonations);
        }
      }).catch(error => {
        console.error('获取用户捐赠历史错误:', error);
      });
    }
  }, [isWalletConnected, walletAddress]);

  // Helper to persist donations to localStorage
  const persistDonations = (updatedDonations: DonationRecord[]) => {
    try {
      localStorage.setItem('donations', JSON.stringify(updatedDonations.map(d => ({
        ...d,
        timestamp: d.timestamp.toISOString()
      }))));
    } catch (err) {
      console.error('保存捐赠到localStorage错误:', err);
    }
  };

  return {
    donations,
    setDonations,
    persistDonations
  };
};
