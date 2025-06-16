
import { WalletType } from '../../types/wallet';
import { NetworkType } from '../../hooks/useWalletConnectors';

// Connect to a wallet based on the given type
export const connectWallet = async (type: WalletType, network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
}> => {
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
export const autoConnectWallet = async (type: WalletType, network: NetworkType = 'mainnet-beta'): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
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

// MetaMask wallet functions
const connectMetaMaskWallet = async (): Promise<{ address: string; provider: any }> => {
  console.log('检查 MetaMask 钱包...');
  
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask 钱包未安装');
  }
  
  // Check if this is actually MetaMask
  if (!window.ethereum.isMetaMask) {
    throw new Error('检测到的以太坊提供者不是 MetaMask');
  }
  
  const provider = window.ethereum;
  
  try {
    // Request accounts
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('未获取到 MetaMask 账户');
    }
    
    const address = accounts[0];
    console.log('成功连接到 MetaMask 钱包, 地址:', address);
    
    return { address, provider };
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('用户拒绝了连接请求');
    }
    throw new Error(`MetaMask 连接失败: ${error.message}`);
  }
};

const autoConnectMetaMaskWallet = async (): Promise<{ address: string; provider: any } | null> => {
  if (typeof window === 'undefined' || !window.ethereum || !window.ethereum.isMetaMask) {
    return null;
  }
  
  const provider = window.ethereum;
  
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      console.log('自动连接到 MetaMask 钱包, 地址:', address);
      return { address, provider };
    }
  } catch (error) {
    console.error('获取 MetaMask 账户失败:', error);
  }
  
  return null;
};

const disconnectMetaMaskWallet = (): void => {
  console.log('MetaMask 钱包已断开连接');
};

// OKX wallet functions
const connectOKXWallet = async (): Promise<{ address: string; provider: any }> => {
  console.log('检查 OKX 钱包...');
  
  if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.ethereum) {
    throw new Error('OKX 钱包未安装');
  }
  
  const provider = window.okxwallet.ethereum;
  
  try {
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('未获取到 OKX 账户');
    }
    
    const address = accounts[0];
    console.log('成功连接到 OKX 钱包, 地址:', address);
    
    return { address, provider };
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('用户拒绝了连接请求');
    }
    throw new Error(`OKX 连接失败: ${error.message}`);
  }
};

const autoConnectOKXWallet = async (): Promise<{ address: string; provider: any } | null> => {
  if (typeof window === 'undefined' || !window.okxwallet || !window.okxwallet.ethereum) {
    return null;
  }
  
  const provider = window.okxwallet.ethereum;
  
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      console.log('自动连接到 OKX 钱包, 地址:', address);
      return { address, provider };
    }
  } catch (error) {
    console.error('获取 OKX 账户失败:', error);
  }
  
  return null;
};

const disconnectOKXWallet = (): void => {
  console.log('OKX 钱包已断开连接');
};

// Binance wallet functions
const connectBinanceWallet = async (): Promise<{ address: string; provider: any }> => {
  console.log('检查 Binance 钱包...');
  
  if (typeof window === 'undefined' || !window.BinanceChain) {
    throw new Error('Binance 钱包未安装');
  }
  
  const provider = window.BinanceChain;
  
  try {
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('未获取到 Binance 账户');
    }
    
    const address = accounts[0];
    console.log('成功连接到 Binance 钱包, 地址:', address);
    
    return { address, provider };
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('用户拒绝了连接请求');
    }
    throw new Error(`Binance 连接失败: ${error.message}`);
  }
};

const autoConnectBinanceWallet = async (): Promise<{ address: string; provider: any } | null> => {
  if (typeof window === 'undefined' || !window.BinanceChain) {
    return null;
  }
  
  const provider = window.BinanceChain;
  
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      console.log('自动连接到 Binance 钱包, 地址:', address);
      return { address, provider };
    }
  } catch (error) {
    console.error('获取 Binance 账户失败:', error);
  }
  
  return null;
};

const disconnectBinanceWallet = (): void => {
  console.log('Binance 钱包已断开连接');
};

// Bitget wallet functions
const connectBitgetWallet = async (): Promise<{ address: string; provider: any }> => {
  console.log('检查 Bitget 钱包...');
  
  if (typeof window === 'undefined' || !window.bitkeep || !window.bitkeep.ethereum) {
    throw new Error('Bitget 钱包未安装');
  }
  
  const provider = window.bitkeep.ethereum;
  
  try {
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('未获取到 Bitget 账户');
    }
    
    const address = accounts[0];
    console.log('成功连接到 Bitget 钱包, 地址:', address);
    
    return { address, provider };
  } catch (error: any) {
    if (error.code === 4001) {
      throw new Error('用户拒绝了连接请求');
    }
    throw new Error(`Bitget 连接失败: ${error.message}`);
  }
};

const autoConnectBitgetWallet = async (): Promise<{ address: string; provider: any } | null> => {
  if (typeof window === 'undefined' || !window.bitkeep || !window.bitkeep.ethereum) {
    return null;
  }
  
  const provider = window.bitkeep.ethereum;
  
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      console.log('自动连接到 Bitget 钱包, 地址:', address);
      return { address, provider };
    }
  } catch (error) {
    console.error('获取 Bitget 账户失败:', error);
  }
  
  return null;
};

const disconnectBitgetWallet = (): void => {
  console.log('Bitget 钱包已断开连接');
};
