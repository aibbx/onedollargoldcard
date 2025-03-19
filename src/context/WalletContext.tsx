
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { connectWallet, autoConnectWallet, disconnectWallet } from '../utils/wallet-connectors';
import { DonationRecord, WalletType } from '../types/wallet';
import { useDonationHandlers } from '../hooks/useDonationHandlers';
import { getUserDonations, getUserStats, subscribeToUserStats, UserStats } from '../services/supabaseService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface WalletContextType {
  isWalletConnected: boolean;
  walletType: WalletType;
  walletAddress: string;
  network: string;
  provider: any;
  donations: DonationRecord[];
  totalDonationAmount: number;
  winningChance: number;
  isProcessing: boolean;
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  sendDonation: (amount: number) => Promise<string | null>;
  recoverDonation: (transactionId: string, amount: number) => Promise<boolean>;
}

// 默认上下文值
const defaultWalletContext: WalletContextType = {
  isWalletConnected: false,
  walletType: 'OKX',
  walletAddress: '',
  network: 'mainnet',
  provider: null,
  donations: [],
  totalDonationAmount: 0,
  winningChance: 0,
  isProcessing: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  sendDonation: async () => null,
  recoverDonation: async () => false
};

const WalletContext = createContext<WalletContextType>(defaultWalletContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletType, setWalletType] = useState<WalletType>('OKX');
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('mainnet');
  const [provider, setProvider] = useState<any>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  
  // 使用现有的钱包处理钩子
  const {
    donations,
    setDonations,
    sendDonation,
    recoverDonation,
    isProcessing
  } = useDonationHandlers(isWalletConnected, walletAddress, walletType, provider, []);

  // 连接钱包处理函数
  const connectWallet = async (type: WalletType): Promise<void> => {
    try {
      console.log('准备连接钱包类型:', type);
      
      let walletProvider;
      let address = '';
      
      try {
        // 使用 wallet-connectors 中的通用连接方法
        const result = await connectWallet(type);
        if (result) {
          walletProvider = result.provider;
          address = result.address;
        } else {
          throw new Error(`无法连接到 ${type} 钱包`);
        }
      } catch (connError) {
        console.error('使用连接器连接钱包失败:', connError);
        throw new Error(`无法连接到 ${type} 钱包`);
      }
      
      if (!walletProvider) {
        throw new Error(`${type} 钱包未安装或不可用`);
      }
      
      if (!address) {
        throw new Error('无法获取钱包地址');
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
      
      // 从Supabase加载用户的捐赠历史
      loadUserDonations(address);
      
      // 从Supabase加载用户的统计信息
      loadUserStats(address);
      
      // 显示成功消息
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

  // 断开钱包连接
  const disconnectWallet = () => {
    try {
      // 如果有提供者且有断开连接的方法，调用它
      if (provider) {
        disconnectWallet(walletType);
      }
      
      // 重置状态
      setIsWalletConnected(false);
      setWalletAddress('');
      setProvider(null);
      setDonations([]);
      setUserStats(null);
      
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

  // 从Supabase加载用户的捐赠历史
  const loadUserDonations = async (address: string) => {
    try {
      const userDonations = await getUserDonations(address);
      if (userDonations.length > 0) {
        console.log('已从Supabase加载用户捐赠历史:', userDonations.length);
        setDonations(userDonations);
      }
    } catch (error) {
      console.error('加载用户捐赠历史错误:', error);
    }
  };

  // 从Supabase加载用户的统计信息
  const loadUserStats = async (address: string) => {
    try {
      const stats = await getUserStats(address);
      if (stats) {
        console.log('已从Supabase加载用户统计信息:', stats);
        setUserStats(stats);
      }
    } catch (error) {
      console.error('加载用户统计信息错误:', error);
    }
  };

  // 在组件挂载时尝试恢复钱包连接
  useEffect(() => {
    const isConnected = localStorage.getItem('walletConnected') === 'true';
    const savedWalletType = localStorage.getItem('walletType') as WalletType;
    const savedWalletAddress = localStorage.getItem('walletAddress');
    
    if (isConnected && savedWalletType && savedWalletAddress) {
      // 设置初始状态，但不实际连接
      setIsWalletConnected(true);
      setWalletType(savedWalletType);
      setWalletAddress(savedWalletAddress);
      
      // 加载用户数据
      loadUserDonations(savedWalletAddress);
      loadUserStats(savedWalletAddress);
      
      // 尝试重新连接钱包（可选）
      // connectWallet(savedWalletType).catch(console.error);
    }
  }, []);

  // 订阅用户统计信息的实时更新
  useEffect(() => {
    let subscription: any = null;
    
    if (isWalletConnected && walletAddress) {
      subscription = subscribeToUserStats(walletAddress, (stats) => {
        console.log('收到用户统计信息更新:', stats);
        setUserStats(stats);
      });
    }
    
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [isWalletConnected, walletAddress]);

  // 计算上下文值
  const contextValue: WalletContextType = {
    isWalletConnected,
    walletType,
    walletAddress,
    network,
    provider,
    donations,
    totalDonationAmount: userStats?.total_donated || 0,
    winningChance: userStats?.winning_chance || 0,
    isProcessing,
    connectWallet,
    disconnectWallet,
    sendDonation,
    recoverDonation
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};
