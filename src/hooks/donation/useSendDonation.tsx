
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { DonationRecord, WalletType } from '../../types/wallet';
import { getExplorerUrl } from '../../utils/walletUtils';
import { processTransaction } from '../../utils/transactions';
import { addDonation } from '../../services/supabaseService';

export const useSendDonation = (
  isWalletConnected: boolean,
  walletAddress: string,
  walletType: WalletType,
  provider: any,
  donations: DonationRecord[],
  setDonations: (donations: DonationRecord[]) => void,
  persistDonations: (donations: DonationRecord[]) => void,
  updateDonationStats: () => void
) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const sendDonation = async (amount: number, referralCode?: string): Promise<string | null> => {
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
      console.log('开始捐赠流程:', { amount, walletType, walletAddress, referralCode });
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
        // 首先保存到Supabase (包含referral_code)
        await addDonation({
          wallet_address: walletAddress,
          amount: amount,
          transaction_id: transactionId,
          wallet_type: walletType,
          referral_code: referralCode || null
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
        persistDonations(updatedDonations);
        
        // 更新捐赠统计数据
        updateDonationStats();
        
        // 显示成功消息及浏览器链接
        const explorerUrl = getExplorerUrl(transactionId, walletType);
        
        toast({
          title: "捐赠成功",
          description: (
            <div>
              <p>{`感谢您捐赠 $${amount.toFixed(2)} USD1!`}</p>
              {referralCode && (
                <p className="text-sm text-green-600 mt-1">
                  使用推荐码: {referralCode}
                </p>
              )}
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

  return {
    sendDonation,
    isProcessing
  };
};
