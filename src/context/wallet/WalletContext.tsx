
import React, { createContext, useContext, ReactNode } from 'react';
import { DonationRecord, WalletType } from '../../types/wallet';

export interface WalletContextType {
  isWalletConnected: boolean;
  walletType: WalletType;
  walletAddress: string;
  network: string;
  provider: any;
  donations: DonationRecord[];
  totalDonationAmount: number;
  winningChance: number;
  isProcessing: boolean;
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  sendDonation: (amount: number) => Promise<string | null>;
  recoverDonation: (transactionId: string, amount: number) => Promise<boolean>;
}

// Default context values
const defaultWalletContext: WalletContextType = {
  isWalletConnected: false,
  walletType: 'OKX',
  walletAddress: '',
  network: 'mainnet',
  provider: null,
  donations: [],
  totalDonationAmount: 0,
  winningChance: 0,
  isProcessing: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  sendDonation: async () => null,
  recoverDonation: async () => false
};

const WalletContext = createContext<WalletContextType>(defaultWalletContext);

export const useWallet = () => useContext(WalletContext);

export default WalletContext;
