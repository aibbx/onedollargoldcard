
import { WalletConnectionResult } from './types';

// Helper function to detect if we're on mobile
const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Helper function to open MetaMask mobile app
const openMetaMaskMobile = (dappUrl: string): void => {
  const metamaskAppUrl = `https://metamask.app.link/dapp/${encodeURIComponent(dappUrl)}`;
  console.log('Opening MetaMask mobile app with URL:', metamaskAppUrl);
  window.open(metamaskAppUrl, '_blank');
  
  // Set a flag to indicate we're waiting for mobile connection
  localStorage.setItem('pendingMobileConnection', 'MetaMask');
  localStorage.setItem('mobileConnectionTimestamp', Date.now().toString());
};

export const connectMetaMaskWallet = async (): Promise<WalletConnectionResult> => {
  console.log('尝试连接 MetaMask 钱包...');
  
  const isMobile = isMobileDevice();
  
  // On mobile, check if MetaMask is available
  if (isMobile && typeof window !== 'undefined') {
    // If no ethereum provider on mobile, redirect to MetaMask app
    if (!window.ethereum) {
      console.log('移动设备上未检测到 MetaMask，尝试打开 MetaMask 应用...');
      const currentUrl = window.location.href;
      openMetaMaskMobile(currentUrl);
      throw new Error('正在打开 MetaMask 应用，请在应用中完成连接后返回浏览器');
    }
  }
  
  if (typeof window === 'undefined' || !window.ethereum) {
    console.error('MetaMask 未安装');
    if (isMobile) {
      throw new Error('请安装 MetaMask 移动应用，或在 MetaMask 浏览器中打开此页面');
    } else {
      throw new Error('MetaMask 钱包未安装，请先安装 MetaMask 扩展程序');
    }
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
    
    // Clear mobile connection flags on successful connection
    localStorage.removeItem('pendingMobileConnection');
    localStorage.removeItem('mobileConnectionTimestamp');
    
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
    } else if (error.message && error.message.includes('打开 MetaMask 应用')) {
      throw error; // 重新抛出移动端重定向消息
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
      
      // Clear mobile connection flags on successful auto-connection
      localStorage.removeItem('pendingMobileConnection');
      localStorage.removeItem('mobileConnectionTimestamp');
      
      return { address, provider };
    }
  } catch (error) {
    console.error('MetaMask 自动连接失败:', error);
  }
  
  return null;
};

export const disconnectMetaMaskWallet = (): void => {
  console.log('MetaMask 钱包连接已断开');
  // Clear mobile connection flags
  localStorage.removeItem('pendingMobileConnection');
  localStorage.removeItem('mobileConnectionTimestamp');
  // MetaMask 没有显式的断开连接方法，只需清除本地状态
};
