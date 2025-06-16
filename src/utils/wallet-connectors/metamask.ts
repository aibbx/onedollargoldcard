
import { WalletConnectionResult } from './types';

export const connectMetaMaskWallet = async (): Promise<WalletConnectionResult> => {
  console.log('尝试连接 MetaMask 钱包...');
  
  if (typeof window === 'undefined' || !window.ethereum) {
    console.error('MetaMask 未安装');
    throw new Error('MetaMask 钱包未安装，请先安装 MetaMask 扩展程序');
  }
  
  // 检查是否真的是 MetaMask
  if (!window.ethereum.isMetaMask) {
    console.error('检测到的以太坊提供者不是 MetaMask');
    throw new Error('请使用 MetaMask 钱包');
  }
  
  const provider = window.ethereum;
  
  try {
    console.log('请求 MetaMask 账户访问权限...');
    
    // 请求账户访问权限
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('MetaMask 中没有可用账户，请确保已登录');
    }
    
    const address = accounts[0];
    console.log('MetaMask 连接成功，地址:', address);
    
    // 检查网络 - 确保在 BSC 主网
    try {
      const chainId = await provider.request({ method: 'eth_chainId' });
      console.log('当前网络 Chain ID:', chainId);
      
      // BSC 主网的 Chain ID 是 0x38 (56)
      if (chainId !== '0x38') {
        console.log('需要切换到 BSC 主网...');
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });
        } catch (switchError: any) {
          // 如果网络不存在，添加 BSC 网络
          if (switchError.code === 4902) {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x38',
                chainName: 'BNB Smart Chain',
                nativeCurrency: {
                  name: 'BNB',
                  symbol: 'BNB',
                  decimals: 18,
                },
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/'],
              }],
            });
          } else {
            throw switchError;
          }
        }
      }
    } catch (networkError) {
      console.warn('网络检查失败，但继续连接:', networkError);
    }
    
    return { address, provider };
  } catch (error: any) {
    console.error('MetaMask 连接错误:', error);
    
    if (error.code === 4001) {
      throw new Error('您拒绝了连接请求，请重试并在 MetaMask 中确认连接');
    } else if (error.code === -32002) {
      throw new Error('MetaMask 中已有待处理的连接请求，请检查您的钱包');
    } else if (error.message) {
      throw new Error(`MetaMask 连接失败: ${error.message}`);
    } else {
      throw new Error('MetaMask 连接失败，请重试');
    }
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
      console.log('MetaMask 自动连接成功，地址:', address);
      return { address, provider };
    }
  } catch (error) {
    console.error('MetaMask 自动连接失败:', error);
  }
  
  return null;
};

export const disconnectMetaMaskWallet = (): void => {
  console.log('MetaMask 钱包连接已断开');
  // MetaMask 没有显式的断开连接方法，只需清除本地状态
};
