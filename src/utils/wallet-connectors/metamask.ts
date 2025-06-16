
import { WalletConnectionResult } from './types';

export const connectMetaMaskWallet = async (): Promise<WalletConnectionResult> => {
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

export const autoConnectMetaMaskWallet = async (): Promise<WalletConnectionResult | null> => {
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

export const disconnectMetaMaskWallet = (): void => {
  console.log('MetaMask 钱包已断开连接');
};
