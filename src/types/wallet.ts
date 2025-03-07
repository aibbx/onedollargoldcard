
import { PublicKey } from "@solana/web3.js";

export type WalletType = 'Phantom' | 'Solflare' | 'OKX';

export interface WalletContextType {
  isWalletConnected: boolean;
  walletType: WalletType;
  walletAddress: string;
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  sendDonation: (amount: number) => Promise<string | null>;
  recoverDonation: (transactionId: string, amount: number) => boolean;
  donations: DonationRecord[];
  totalDonationAmount: number;
  winningChance: number;
  network: string;
  isProcessing: boolean;
}

export interface DonationRecord {
  id: string;
  amount: number;
  timestamp: Date;
  transactionId: string;
}

export interface WalletDetectionResult {
  phantom: boolean;
  solflare: boolean;
  okx: boolean;
}

export interface WalletConnectionDetail {
  publicKey: PublicKey;
  isConnected: boolean;
}
