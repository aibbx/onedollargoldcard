
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { DonationRecord, WalletType } from '../types/wallet';
import { getExplorerUrl } from '../utils/walletUtils';
import { processTransaction } from '../utils/transactions';
import { useDonationStats } from './useDonationStats';
import { addDonation, getUserDonations, getUserStats } from '../services/supabaseService';
import { supabase } from "@/integrations/supabase/client";

export const useDonationHandlers = (
  isWalletConnected: boolean,
  walletAddress: string,
  walletType: WalletType,
  provider: any,
  initialDonations: DonationRecord[] = []
) => {
  const { toast } = useToast();
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonations);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { 
    totalDonationAmount, 
    winningChance, 
    updateDonationStats 
  } = useDonationStats(donations);

  // 发送捐赠
  const sendDonation = async (amount: number): Promise<string | null> => {
    if (!isWalletConnected || !walletAddress) {
      toast({
        title: "钱包未连接",
        description: "请连接您的钱包进行捐赠。",
        variant: "destructive",
      });
      return null;
    }
    
    if (!provider) {
      toast({
        title: "钱包错误",
        description: "您的钱包提供商未正确连接。请重新连接您的钱包。",
        variant: "destructive",
      });
      console.error("没有可用的钱包提供商:", { walletType, walletAddress });
      return null;
    }
    
    if (isProcessing) {
      toast({
        title: "交易处理中",
        description: "请等待当前交易完成。",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setIsProcessing(true);
      console.log('开始捐赠流程:', { amount, walletType, walletAddress });
      console.log('提供商信息:', { 
        type: walletType,
        hasPublicKey: walletType === 'OKX' ? !!provider?.solana?.publicKey : !!provider?.publicKey,
        methods: Object.keys(walletType === 'OKX' ? provider.solana || {} : provider || {})
      });
      
      // 使用交易工具函数处理交易
      const transactionId = await processTransaction(
        walletType,
        provider,
        amount,
        walletAddress
      );
      
      console.log('交易已完成，ID:', transactionId);
      
      // 创建捐赠记录
      if (transactionId) {
        // 首先保存到Supabase
        await addDonation({
          wallet_address: walletAddress,
          amount: amount,
          transaction_id: transactionId,
          wallet_type: walletType
        });
        
        // 创建本地记录
        const newDonation: DonationRecord = {
          id: `donation_${Date.now()}`,
          amount: amount,
          timestamp: new Date(),
          transactionId: transactionId
        };
        
        // 更新捐赠状态
        const updatedDonations = [...donations, newDonation];
        setDonations(updatedDonations);
        
        // 保存到localStorage
        try {
          localStorage.setItem('donations', JSON.stringify(updatedDonations.map(d => ({
            ...d,
            timestamp: d.timestamp.toISOString()
          }))));
        } catch (err) {
          console.error('保存捐赠到localStorage错误:', err);
        }
        
        // 更新捐赠统计数据
        updateDonationStats();
        
        // 显示成功消息及浏览器链接
        const explorerUrl = getExplorerUrl(transactionId, walletType);
        
        toast({
          title: "捐赠成功",
          description: (
            <div>
              <p>{`感谢您捐赠 $${amount.toFixed(2)} USDT!`}</p>
              <a 
                href={explorerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 underline mt-2 inline-block"
              >
                查看交易
              </a>
            </div>
          ),
        });
        
        return transactionId;
      } else {
        throw new Error("交易失败 - 未返回交易ID");
      }
    } catch (error) {
      console.error('发送捐赠错误:', error);
      toast({
        title: "捐赠失败",
        description: `您的捐赠无法处理: ${error instanceof Error ? error.message : '未知错误'}`,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // 恢复捐赠记录
  const recoverDonation = async (transactionId: string, amount: number): Promise<boolean> => {
    try {
      // 检查此transactionId的捐赠是否已存在
      const existingDonation = donations.find(d => d.transactionId === transactionId);
      
      if (existingDonation) {
        toast({
          title: "捐赠已记录",
          description: `此交易ID的捐赠已在您的记录中。`,
        });
        return false;
      }
      
      // 保存到Supabase
      await addDonation({
        wallet_address: walletAddress,
        amount: amount,
        transaction_id: transactionId,
        wallet_type: walletType
      });
      
      // 创建新的捐赠记录
      const newDonation: DonationRecord = {
        id: `donation_${Date.now()}`,
        amount: amount,
        timestamp: new Date(),
        transactionId: transactionId
      };
      
      // 更新捐赠状态
      const updatedDonations = [...donations, newDonation];
      setDonations(updatedDonations);
      
      // 保存到localStorage
      try {
        localStorage.setItem('donations', JSON.stringify(updatedDonations.map(d => ({
          ...d,
          timestamp: d.timestamp.toISOString()
        }))));
      } catch (err) {
        console.error('保存捐赠到localStorage错误:', err);
        return false;
      }
      
      // 更新捐赠统计数据
      updateDonationStats();
      
      // 显示成功消息及浏览器链接
      const explorerUrl = getExplorerUrl(transactionId, walletType);
      
      toast({
        title: "捐赠记录已恢复",
        description: (
          <div>
            <p>{`成功恢复您的捐赠 $${amount.toFixed(2)} USDT!`}</p>
            <a 
              href={explorerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gold-600 hover:text-gold-700 underline mt-2 inline-block"
            >
              查看交易
            </a>
          </div>
        ),
      });
      
      return true;
    } catch (error) {
      console.error('恢复捐赠错误:', error);
      toast({
        title: "恢复失败",
        description: `捐赠无法恢复: ${error instanceof Error ? error.message : '未知错误'}`,
        variant: "destructive",
      });
      return false;
    }
  };

  // 加载初始捐赠历史
  useEffect(() => {
    if (isWalletConnected && walletAddress) {
      getUserDonations(walletAddress).then(userDonations => {
        if (userDonations.length > 0) {
          setDonations(userDonations);
        }
      }).catch(error => {
        console.error('获取用户捐赠历史错误:', error);
      });
    }
  }, [isWalletConnected, walletAddress]);

  return {
    donations,
    setDonations,
    totalDonationAmount,
    winningChance,
    sendDonation,
    recoverDonation,
    updateDonationStats,
    isProcessing
  };
};
