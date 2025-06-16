
import { WalletConnectionResult } from './types';

export const connectBinanceWallet = async (): Promise<WalletConnectionResult> => {
  console.log('检查 Binance 钱包...');
  
  if (typeof window === 'undefined' || !window.BinanceChain) {
    throw new Error('Binance 钱包未安装，请先安装 Binance Wallet 扩展程序');
  }
  
  if (!window.BinanceChain.isBinance) {
    throw new Error('检测到的钱包不是 Binance Wallet');
  }
  
  const provider = window.BinanceChain;
  
  try {
    console.log('请求 Binance 账户访问权限...');
    
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('Binance 钱包中没有可用账户，请确保已登录');
    }
    
    const address = accounts[0];
    console.log('成功连接到 Binance 钱包, 地址:', address);
    
    // 检查并切换到 BSC 网络
    try {
      const chainId = await provider.request({ method: 'eth_chainId' });
      console.log('当前网络 Chain ID:', chainId);
      
      if (chainId !== '0x38') {
        console.log('需要切换到 BSC 主网...');
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });
        } catch (switchError: any) {
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
    console.error('Binance 连接错误:', error);
    
    if (error.code === 4001) {
      throw new Error('您拒绝了连接请求，请重试并在 Binance 钱包中确认连接');
    } else if (error.code === -32002) {
      throw new Error('Binance 钱包中已有待处理的连接请求，请检查您的钱包');
    } else if (error.message) {
      throw new Error(`Binance 钱包连接失败: ${error.message}`);
    } else {
      throw new Error('Binance 钱包连接失败，请重试');
    }
  }
};

export const autoConnectBinanceWallet = async (): Promise<WalletConnectionResult | null> => {
  if (typeof window === 'undefined' || !window.BinanceChain || !window.BinanceChain.isBinance) {
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
