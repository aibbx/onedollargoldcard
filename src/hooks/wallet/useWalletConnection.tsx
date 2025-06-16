
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
    try {
      console.log('准备连接钱包类型:', type);
      
      const result = await connectWalletUtil(type);
      
      // Check if result exists and has required properties
      if (!result) {
        throw new Error(`无法连接到 ${type} 钱包`);
      }
      
      const walletProvider = result.provider;
      const address = result.address;
      
      if (!walletProvider || !address) {
        throw new Error(`无法获取 ${type} 钱包的提供者或地址`);
      }
      
      // Update state
      setIsWalletConnected(true);
      setWalletType(type);
      setWalletAddress(address);
      setProvider(walletProvider);
      
      // Save connection info to local storage
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletType', type);
      localStorage.setItem('walletAddress', address);
      
      console.log('钱包连接成功:', { type, address });
      
      // Display success message
      toast({
        title: "钱包已连接",
        description: `您的 ${type} 钱包已成功连接。`,
      });
      
    } catch (error) {
      console.error('连接钱包错误:', error);
      toast({
        title: "连接失败",
        description: `连接 ${type} 钱包时出错: ${error instanceof Error ? error.message : '未知错误'}`,
        variant: "destructive",
      });
      throw error;
    }
  };

  // Disconnect wallet
  const handleDisconnectWallet = () => {
    try {
      // If there's a provider and it has a disconnect method, call it
      if (provider) {
        disconnectWalletUtil(walletType);
      }
      
      // Reset state
      setIsWalletConnected(false);
      setWalletAddress('');
      setProvider(null);
      
      // Clear local storage
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
