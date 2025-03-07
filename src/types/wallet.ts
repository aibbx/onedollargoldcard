
export type WalletType = 'Phantom' | 'Solflare' | 'OKX' | 'MetaMask' | '';

// Define donation record interface
export interface DonationRecord {
  id: string;
  amount: number;
  timestamp: Date;
  transactionId: string;
}

// Define wallet context interface
export interface WalletContextType {
  isWalletConnected: boolean;
  walletType: WalletType;
  walletAddress: string;
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  sendDonation: (amount: number) => Promise<string | null>;
  donations: DonationRecord[];
  totalDonationAmount: number;
  winningChance: number;
  network?: string;
}

// Add type definitions for wallet providers
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      isConnected: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      publicKey?: { toString: () => string };
      request?: (args: { method: string; params?: any }) => Promise<any>;
      switchNetwork?: (network: string) => Promise<void>;
    };
    solflare?: {
      isConnected: boolean;
      connect: () => Promise<void>;
      disconnect: () => Promise<void>;
      publicKey?: { toString: () => string };
      setSolanaNetwork?: (network: string) => void;
    };
    okxwallet?: {
      solana: {
        isConnected: boolean;
        connect: () => Promise<{ publicKey: { toString: () => string } }>;
        disconnect: () => Promise<void>;
        publicKey?: { toString: () => string };
        switchNetwork?: (network: string) => Promise<void>;
      }
    };
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}
