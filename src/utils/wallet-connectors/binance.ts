
import { WalletConnectionResult } from './types';

export const connectBinanceWallet = async (): Promise<WalletConnectionResult> => {
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

export const autoConnectBinanceWallet = async (): Promise<WalletConnectionResult | null> => {
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

export const disconnectBinanceWallet = (): void => {
  console.log('Binance 钱包已断开连接');
};
