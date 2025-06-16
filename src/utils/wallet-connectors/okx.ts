
export const connectOKXWallet = async (): Promise<{ address: string; provider: any }> => {
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

export const autoConnectOKXWallet = async (): Promise<{ address: string; provider: any } | null> => {
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

export const disconnectOKXWallet = (): void => {
  console.log('OKX 钱包已断开连接');
};
