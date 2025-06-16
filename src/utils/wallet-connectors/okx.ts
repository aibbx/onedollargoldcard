
import { WalletConnectionResult } from './types';

// Helper function to detect if we're on mobile
const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Helper function to open OKX mobile app
const openOKXMobile = (dappUrl: string): void => {
  const okxAppUrl = `okx://www.okx.com/web3/dapp?dappUrl=${encodeURIComponent(dappUrl)}`;
  console.log('Opening OKX mobile app with URL:', okxAppUrl);
  window.open(okxAppUrl, '_blank');
  
  // Fallback to OKX website if app doesn't open
  setTimeout(() => {
    window.open('https://www.okx.com/web3', '_blank');
  }, 2000);
  
  // Set a flag to indicate we're waiting for mobile connection
  localStorage.setItem('pendingMobileConnection', 'OKX');
  localStorage.setItem('mobileConnectionTimestamp', Date.now().toString());
};

// Get OKX provider with improved detection
const getOKXProvider = () => {
  if (typeof window === 'undefined') return null;
  
  // 检查多种可能的 OKX 注入方式
  if (window.okxwallet?.ethereum) {
    console.log('找到 OKX 提供者: window.okxwallet.ethereum');
    return window.okxwallet.ethereum;
  }
  
  if (window.okx?.ethereum) {
    console.log('找到 OKX 提供者: window.okx.ethereum');
    return window.okx.ethereum;
  }
  
  // 检查是否 OKX 注入到了 window.ethereum
  if (window.ethereum?.isOKExWallet) {
    console.log('找到 OKX 提供者: window.ethereum (OKX)');
    return window.ethereum;
  }
  
  // 检查多个以太坊提供者的情况
  if (window.ethereum?.providers) {
    const okxProvider = window.ethereum.providers.find((provider: any) => 
      provider.isOKExWallet || provider.isOkxWallet
    );
    if (okxProvider) {
      console.log('找到 OKX 提供者: window.ethereum.providers');
      return okxProvider;
    }
  }
  
  console.log('未找到 OKX 提供者');
  return null;
};

export const connectOKXWallet = async (): Promise<WalletConnectionResult> => {
  console.log('尝试连接 OKX 钱包...');
  
  const isMobile = isMobileDevice();
  
  // Get OKX provider
  const provider = getOKXProvider();
  
  // On mobile, check if OKX is available
  if (isMobile && !provider) {
    console.log('移动设备上未检测到 OKX 钱包，尝试打开 OKX 应用...');
    const currentUrl = window.location.href;
    openOKXMobile(currentUrl);
    throw new Error('正在打开 OKX 应用，请在应用中完成连接后返回浏览器');
  }
  
  if (!provider) {
    console.error('OKX 钱包未安装');
    if (isMobile) {
      throw new Error('请安装 OKX 移动应用，或在 OKX 浏览器中打开此页面');
    } else {
      throw new Error('OKX 钱包未安装，请先安装 OKX Wallet 扩展程序');
    }
  }
  
  try {
    console.log('请求 OKX 账户访问权限...');
    
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || accounts.length === 0) {
      throw new Error('OKX 钱包中没有可用账户，请确保已登录');
    }
    
    const address = accounts[0];
    console.log('OKX 钱包连接成功，地址:', address);
    
    // Clear mobile connection flags on successful connection
    localStorage.removeItem('pendingMobileConnection');
    localStorage.removeItem('mobileConnectionTimestamp');
    
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
    console.error('OKX 连接错误:', error);
    
    if (error.code === 4001) {
      throw new Error('您拒绝了连接请求，请重试并在 OKX 钱包中确认连接');
    } else if (error.code === -32002) {
      throw new Error('OKX 钱包中已有待处理的连接请求，请检查您的钱包');
    } else if (error.message && error.message.includes('打开 OKX 应用')) {
      throw error; // 重新抛出移动端重定向消息
    } else if (error.message) {
      throw new Error(`OKX 钱包连接失败: ${error.message}`);
    } else {
      throw new Error('OKX 钱包连接失败，请重试');
    }
  }
};

export const autoConnectOKXWallet = async (): Promise<WalletConnectionResult | null> => {
  const provider = getOKXProvider();
  
  if (!provider) {
    return null;
  }
  
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    if (accounts && accounts.length > 0) {
      const address = accounts[0];
      console.log('OKX 钱包自动连接成功，地址:', address);
      
      // Clear mobile connection flags on successful auto-connection
      localStorage.removeItem('pendingMobileConnection');
      localStorage.removeItem('mobileConnectionTimestamp');
      
      return { address, provider };
    }
  } catch (error) {
    console.error('OKX 钱包自动连接失败:', error);
  }
  
  return null;
};

export const disconnectOKXWallet = (): void => {
  console.log('OKX 钱包连接已断开');
  // Clear mobile connection flags
  localStorage.removeItem('pendingMobileConnection');
  localStorage.removeItem('mobileConnectionTimestamp');
};
