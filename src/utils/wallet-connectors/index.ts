
import { WalletType } from '../../types/wallet';
import { NetworkType } from '../../hooks/useWalletConnectors';

import { 
  connectPhantomWallet, 
  autoConnectPhantomWallet, 
  disconnectPhantomWallet 
} from './phantomConnector';

import { 
  connectSolflareWallet, 
  autoConnectSolflareWallet, 
  disconnectSolflareWallet 
} from './solflareConnector';

import { 
  connectOKXWallet, 
  autoConnectOKXWallet, 
  disconnectOKXWallet 
} from './okxConnector';

// Connect to a wallet based on the given type
export const connectWallet = async (type: WalletType, network: NetworkType = 'devnet'): Promise<{ 
  address: string; 
  provider: any;
}> => {
  switch (type) {
    case 'Phantom':
      return connectPhantomWallet(network);
    case 'Solflare':
      return connectSolflareWallet(network);
    case 'OKX':
      return connectOKXWallet(network);
    default:
      throw new Error(`Unsupported wallet type: ${type}`);
  }
};

// Auto-connect to a wallet based on the given type
export const autoConnectWallet = async (type: WalletType, network: NetworkType = 'devnet'): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  try {
    switch (type) {
      case 'Phantom':
        return await autoConnectPhantomWallet(network);
      case 'Solflare':
        return await autoConnectSolflareWallet(network);
      case 'OKX':
        return await autoConnectOKXWallet(network);
      default:
        throw new Error(`Unsupported wallet type: ${type}`);
    }
  } catch (error) {
    console.error('Error auto-connecting wallet:', error);
    return null;
  }
};

// Disconnect from a wallet based on the given type
export const disconnectWallet = (type: WalletType): void => {
  switch (type) {
    case 'Phantom':
      disconnectPhantomWallet();
      break;
    case 'Solflare':
      disconnectSolflareWallet();
      break;
    case 'OKX':
      disconnectOKXWallet();
      break;
    default:
      console.warn(`No disconnect handler for wallet type: ${type}`);
      break;
  }
};
