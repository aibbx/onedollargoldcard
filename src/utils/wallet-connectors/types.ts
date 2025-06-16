export interface WalletConnectionResult {
  address: string;
  provider: any;
}

export interface WalletConnector {
  connect: () => Promise<WalletConnectionResult>;
  autoConnect: () => Promise<WalletConnectionResult | null>;
  disconnect: () => void;
}

// Fix TypeScript export errors
export type { WalletConnectionResult, WalletConnector };
