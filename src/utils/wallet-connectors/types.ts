
import { WalletType } from '../../types/wallet';
import { NetworkType } from '../../hooks/useWalletConnectors';

export interface WalletConnectResult {
  address: string;
  provider: any;
}

export interface WalletConnector {
  connect: () => Promise<WalletConnectResult>;
  autoConnect: () => Promise<WalletConnectResult | null>;
  disconnect: () => void;
}

export { WalletType, NetworkType };
