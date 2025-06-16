
import { createContext, useContext } from 'react';
import { WalletType, DonationRecord } from '../../types/wallet';

// Define the shape of our wallet context
interface WalletContextType {
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
  sendDonation: (amount: number, referralCode?: string) => Promise<string | null>;
  recoverDonation: (transactionId: string, amount: number) => Promise<boolean>;
}

// Create the context with default values
const WalletContext = createContext<WalletContextType>({
  isWalletConnected: false,
  walletType: 'OKX',
  walletAddress: '',
  network: 'mainnet',
  provider: null,
  donations: [],
  totalDonationAmount: 0,
  winningChance: 0,
  isProcessing: false,
  connectWallet: async () => { throw new Error('WalletContext not initialized'); },
  disconnectWallet: () => { throw new Error('WalletContext not initialized'); },
  sendDonation: async () => { throw new Error('WalletContext not initialized'); },
  recoverDonation: async () => { throw new Error('WalletContext not initialized'); }
});

// Create a hook to use the wallet context
export const useWallet = () => useContext(WalletContext);

export default WalletContext;
