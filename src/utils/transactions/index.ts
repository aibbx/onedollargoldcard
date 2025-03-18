
// 首先导入Buffer polyfill以确保它在全局可用
import '../buffer-polyfill';

import { WalletType } from '../../types/wallet';
import { toast } from "@/hooks/use-toast";
import { addDonation } from '../../services/supabaseService';

// 根据钱包类型处理交易
export const processTransaction = async (
  walletType: WalletType,
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  try {
    console.log('开始USDT交易处理:', { walletType, amount, walletAddress });
    console.log('提供商详情:', { 
      hasProvider: !!provider,
      providerType: walletType,
      providerKeys: Object.keys(provider),
      bufferAvailable: typeof window !== 'undefined' ? !!window.Buffer : false
    });

    // 再次检查Buffer是否可用
    if (typeof window !== 'undefined' && !window.Buffer) {
      console.error('Buffer不可用！尝试重新初始化...');
      // 强制重新初始化
      await import('../buffer-polyfill');
      if (!window.Buffer) {
        throw new Error('Buffer polyfill初始化失败');
      } else {
        console.log('Buffer成功重新初始化');
      }
    }

    if (!provider) {
      const error = new Error('钱包提供商不可用');
      toast({
        title: "钱包错误",
        description: "您的钱包未正确连接。请尝试重新连接。",
        variant: "destructive",
      });
      throw error;
    }
    
    if (!walletAddress) {
      const error = new Error('钱包地址不可用');
      toast({
        title: "钱包错误",
        description: "无法找到您的钱包地址。请重新连接您的钱包。",
        variant: "destructive",
      });
      throw error;
    }
    
    // 验证交易金额 
    if (amount <= 0) {
      const error = new Error('无效的捐赠金额。金额必须大于0。');
      toast({
        title: "无效金额",
        description: "捐赠金额必须大于0 USDT。",
        variant: "destructive",
      });
      throw error;
    }

    let transactionId: string;
    
    // 显示准备toast
    toast({
      title: "准备交易",
      description: `正在使用${walletType}钱包设置您的${amount.toFixed(2)} USDT捐赠...`,
    });
    
    // 根据钱包类型处理交易
    switch (walletType) {
      case 'MetaMask':
        console.log('通过MetaMask发送USDT:', {
          address: provider.selectedAddress,
          amount
        });
        // 这里是MetaMask交易的实现
        // 目前，只返回一个模拟的交易ID
        transactionId = `0x${Math.random().toString(16).substring(2, 42)}`;
        break;
        
      case 'OKX':
        console.log('通过OKX发送USDT:', {
          address: provider.ethereum?.selectedAddress,
          amount
        });
        // 这里是OKX交易的实现
        // 目前，只返回一个模拟的交易ID
        transactionId = `0x${Math.random().toString(16).substring(2, 42)}`;
        break;
        
      default:
        const error = new Error(`不支持的钱包类型: ${walletType}`);
        toast({
          title: "不支持的钱包",
          description: `${walletType}钱包不支持捐赠。`,
          variant: "destructive",
        });
        throw error;
    }

    if (!transactionId) {
      const error = new Error('交易失败 - 未返回交易ID');
      toast({
        title: "交易失败",
        description: "交易无法完成。请重试。",
        variant: "destructive",
      });
      throw error;
    }
    
    // 将捐赠记录添加到Supabase
    try {
      await addDonation({
        wallet_address: walletAddress,
        amount: amount,
        transaction_id: transactionId,
        wallet_type: walletType
      });
      console.log('捐赠记录已添加到Supabase');
    } catch (dbError) {
      console.error('将捐赠添加到Supabase错误:', dbError);
      // 继续处理，即使数据库存储失败
    }

    console.log('USDT交易成功完成:', transactionId);
    return transactionId;

  } catch (err) {
    console.error("USDT交易处理错误:", err);
    
    // 仅在钱包特定方法中未显示的情况下显示toast
    if (!err.message?.includes("already shown")) {
      toast({
        title: "交易失败",
        description: err instanceof Error ? err.message : "交易期间发生未知错误",
        variant: "destructive",
      });
    }
    
    throw err;
  }
};
