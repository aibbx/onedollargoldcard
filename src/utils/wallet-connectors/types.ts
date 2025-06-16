
import { WalletType } from '../../types/wallet';

// Network type for wallet connections
export type NetworkType = 'mainnet-beta' | 'testnet' | 'devnet';

// Result type for wallet connection operations
export interface WalletConnectionResult {
  address: string;
  provider: any;
}

// Interface for wallet connector functions
export interface WalletConnector {
  connect: () => Promise<WalletConnectionResult>;
  autoConnect: () => Promise<WalletConnectionResult | null>;
  disconnect: () => void;
}

// Error types for better error handling
export interface WalletConnectionError extends Error {
  code?: number;
  type: 'user_rejected' | 'not_installed' | 'connection_failed' | 'unknown';
}
