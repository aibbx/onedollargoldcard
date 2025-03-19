
import { useDonationRecords } from './donation/useDonationRecords';
import { useSendDonation } from './donation/useSendDonation';
import { useRecoverDonation } from './donation/useRecoverDonation';
import { useDonationStats } from './useDonationStats';
import { WalletType, DonationRecord } from '../types/wallet';

export const useDonationHandlers = (
  isWalletConnected: boolean,
  walletAddress: string,
  walletType: WalletType,
  provider: any,
  initialDonations: DonationRecord[] = []
) => {
  // Use the donation records hook
  const {
    donations,
    setDonations,
    persistDonations
  } = useDonationRecords(isWalletConnected, walletAddress, initialDonations);
  
  // Use the donation stats hook
  const { 
    totalDonationAmount, 
    winningChance, 
    updateDonationStats 
  } = useDonationStats(donations);

  // Use the send donation hook
  const {
    sendDonation,
    isProcessing
  } = useSendDonation(
    isWalletConnected,
    walletAddress,
    walletType,
    provider,
    donations,
    setDonations,
    persistDonations,
    updateDonationStats
  );

  // Use the recover donation hook
  const {
    recoverDonation
  } = useRecoverDonation(
    walletAddress,
    walletType,
    donations,
    setDonations,
    persistDonations,
    updateDonationStats
  );

  return {
    donations,
    setDonations,
    totalDonationAmount,
    winningChance,
    sendDonation,
    recoverDonation,
    updateDonationStats,
    isProcessing
  };
};
