
export type WalletType = 'MetaMask' | 'OKX';

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
  metamask: boolean;
  okx: boolean;
}

export interface WalletConnectionDetail {
  address: string;
  isConnected: boolean;
}

// Add custom wallet type declarations
export interface MetaMaskWallet {
  isMetaMask?: boolean;
  request: (request: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  removeListener: (event: string, callback: (...args: any[]) => void) => void;
  selectedAddress?: string;
  isConnected?: () => boolean;
  chainId?: string;
}

export interface OKXWallet {
  ethereum?: {
    isOKXWallet?: boolean;
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
    selectedAddress?: string;
    isConnected?: () => boolean;
    chainId?: string;
  };
}

declare global {
  interface Window {
    ethereum?: MetaMaskWallet;
    okxwallet?: {
      ethereum?: any;
      [key: string]: any;
    };
  }
}
