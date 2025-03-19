
import { useToast } from "@/hooks/use-toast";
import { DonationRecord, WalletType } from '../../types/wallet';
import { getExplorerUrl } from '../../utils/walletUtils';
import { addDonation } from '../../services/supabaseService';

export const useRecoverDonation = (
  walletAddress: string,
  walletType: WalletType,
  donations: DonationRecord[],
  setDonations: (donations: DonationRecord[]) => void,
  persistDonations: (donations: DonationRecord[]) => void,
  updateDonationStats: () => void
) => {
  const { toast } = useToast();

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
      persistDonations(updatedDonations);
      
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

  return {
    recoverDonation
  };
};
