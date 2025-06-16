
export const connectBitgetWallet = async (): Promise<{ address: string; provider: any }> => {
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

export const autoConnectBitgetWallet = async (): Promise<{ address: string; provider: any } | null> => {
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

export const disconnectBitgetWallet = (): void => {
  console.log('Bitget 钱包已断开连接');
};
