
import { WalletType } from '../../types/wallet';
import { NetworkType, WalletConnectionResult } from './types';
import { 
  connectMetaMaskWallet, 
  autoConnectMetaMaskWallet, 
  disconnectMetaMaskWallet 
} from './metamask';
import { 
  connectOKXWallet, 
  autoConnectOKXWallet, 
  disconnectOKXWallet 
} from './okx';
import { 
  connectBinanceWallet, 
  autoConnectBinanceWallet, 
  disconnectBinanceWallet 
} from './binance';
import { 
  connectBitgetWallet, 
  autoConnectBitgetWallet, 
  disconnectBitgetWallet 
} from './bitget';

// Connect to a wallet based on the given type
export const connectWallet = async (type: WalletType, network: NetworkType = 'mainnet-beta'): Promise<WalletConnectionResult> => {
  console.log(`正在连接 ${type} 钱包...`);
  
  switch (type) {
    case 'MetaMask':
      return connectMetaMaskWallet();
    case 'OKX':
      return connectOKXWallet();
    case 'Binance':
      return connectBinanceWallet();
    case 'Bitget':
      return connectBitgetWallet();
    default:
      throw new Error(`不支持的钱包类型: ${type}`);
  }
};

// Auto-connect to a wallet based on the given type
export const autoConnectWallet = async (type: WalletType, network: NetworkType = 'mainnet-beta'): Promise<WalletConnectionResult | null> => {
  try {
    console.log(`尝试自动连接 ${type} 钱包...`);
    
    switch (type) {
      case 'MetaMask':
        return await autoConnectMetaMaskWallet();
      case 'OKX':
        return await autoConnectOKXWallet();
      case 'Binance':
        return await autoConnectBinanceWallet();
      case 'Bitget':
        return await autoConnectBitgetWallet();
      default:
        console.warn(`不支持的钱包类型: ${type}`);
        return null;
    }
  } catch (error) {
    console.error(`自动连接 ${type} 钱包失败:`, error);
    return null;
  }
};

// Disconnect from a wallet based on the given type
export const disconnectWallet = (type: WalletType): void => {
  console.log(`断开 ${type} 钱包连接...`);
  
  switch (type) {
    case 'MetaMask':
      disconnectMetaMaskWallet();
      break;
    case 'OKX':
      disconnectOKXWallet();
      break;
    case 'Binance':
      disconnectBinanceWallet();
      break;
    case 'Bitget':
      disconnectBitgetWallet();
      break;
    default:
      console.warn(`没有 ${type} 钱包的断开连接处理程序`);
      break;
  }
};
