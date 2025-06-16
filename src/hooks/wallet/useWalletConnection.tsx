
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { WalletType } from '../../types/wallet';
import { connectWallet as connectWalletUtil, disconnectWallet as disconnectWalletUtil } from '../../utils/wallet-connectors';

export const useWalletConnection = () => {
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>('MetaMask');
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('mainnet');
  const [provider, setProvider] = useState<any>(null);

  // Connect wallet handler
  const handleConnectWallet = async (type: WalletType): Promise<void> => {
    console.log('准备连接钱包类型:', type);
    
    try {
      // 检查钱包是否已安装
      const walletCheckMap = {
        'MetaMask': () => typeof window !== 'undefined' && window.ethereum?.isMetaMask,
        'OKX': () => typeof window !== 'undefined' && window.okxwallet?.ethereum,
        'Binance': () => typeof window !== 'undefined' && window.BinanceChain?.isBinance,
        'Bitget': () => typeof window !== 'undefined' && window.bitkeep?.ethereum
      };

      const installUrlMap = {
        'MetaMask': 'https://metamask.io/',
        'OKX': 'https://www.okx.com/web3',
        'Binance': 'https://www.binance.com/en/wallet-direct',
        'Bitget': 'https://web3.bitget.com/'
      };

      if (!walletCheckMap[type]()) {
        toast({
          title: "钱包未安装",
          description: `请安装 ${type} 钱包扩展并刷新页面。`,
          variant: "destructive",
        });
        
        // 打开钱包安装页面
        setTimeout(() => {
          window.open(installUrlMap[type], "_blank");
        }, 1000);
        
        throw new Error(`${type} 钱包未安装`);
      }
      
      // 显示连接中的提示
      toast({
        title: "正在连接钱包",
        description: `正在连接到 ${type} 钱包，请在钱包中确认连接...`,
      });
      
      const result = await connectWalletUtil(type);
      
      // 检查连接结果
      if (!result) {
        throw new Error(`无法连接到 ${type} 钱包`);
      }
      
      const walletProvider = result.provider;
      const address = result.address;
      
      if (!walletProvider || !address) {
        throw new Error(`无法获取 ${type} 钱包的提供者或地址`);
      }
      
      // 更新状态
      setIsWalletConnected(true);
      setWalletType(type);
      setWalletAddress(address);
      setProvider(walletProvider);
      
      // 保存连接信息到本地存储
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletType', type);
      localStorage.setItem('walletAddress', address);
      
      console.log('钱包连接成功:', { type, address });
      
      // 显示成功消息
      toast({
        title: "钱包连接成功！",
        description: `您的 ${type} 钱包已成功连接。现在可以开始捐赠了！`,
      });
      
    } catch (error: any) {
      console.error('连接钱包错误:', error);
      
      let errorMessage = '连接钱包时出现未知错误';
      
      if (error.message.includes('用户拒绝')) {
        errorMessage = '您拒绝了连接请求，请重试并在钱包中确认连接。';
      } else if (error.message.includes('未安装')) {
        errorMessage = `${type} 钱包未安装，请先安装钱包扩展。`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "连接失败",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw error;
    }
  };

  // Disconnect wallet
  const handleDisconnectWallet = () => {
    try {
      // 如果有提供者并且有断开连接方法，调用它
      if (provider) {
        disconnectWalletUtil(walletType);
      }
      
      // 重置状态
      setIsWalletConnected(false);
      setWalletAddress('');
      setProvider(null);
      
      // 清除本地存储
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletType');
      localStorage.removeItem('walletAddress');
      localStorage.removeItem('donations');
      
      toast({
        title: "钱包已断开连接",
        description: "您的钱包已成功断开连接。",
      });
      
    } catch (error) {
      console.error('断开钱包连接错误:', error);
      toast({
        title: "断开连接失败",
        description: `断开钱包连接时出错: ${error instanceof Error ? error.message : '未知错误'}`,
        variant: "destructive",
      });
    }
  };

  return {
    isWalletConnected,
    setIsWalletConnected,
    walletType,
    setWalletType,
    walletAddress,
    setWalletAddress,
    network,
    setNetwork,
    provider,
    setProvider,
    connectWallet: handleConnectWallet,
    disconnectWallet: handleDisconnectWallet
  };
};
