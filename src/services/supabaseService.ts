
import { supabase } from "@/integrations/supabase/client";
import { DonationRecord, WalletType } from "../types/wallet";

// 捐赠记录接口
export interface DbDonation {
  id?: string;
  wallet_address: string;
  amount: number;
  transaction_id: string;
  wallet_type: string;
  created_at?: string;
}

// 用户统计接口
export interface UserStats {
  wallet_address: string;
  total_donated: number;
  donation_count: number;
  last_donation_at?: string;
  winning_chance: number;
}

// 奖池状态接口
export interface PoolStatus {
  id?: number;
  total_amount: number;
  participant_count: number;
  target_amount: number;
  pool_address: string;
  fee_address: string;
  last_updated?: string;
}

// 添加捐赠记录
export const addDonation = async (donation: DbDonation): Promise<string | null> => {
  try {
    console.log('添加捐赠记录到Supabase:', donation);
    
    const { data, error } = await supabase
      .from('donations')
      .insert([donation])
      .select();
    
    if (error) {
      console.error('添加捐赠记录错误:', error);
      return null;
    }
    
    console.log('捐赠记录已添加:', data);
    return data[0]?.id || null;
  } catch (error) {
    console.error('添加捐赠记录异常:', error);
    return null;
  }
};

// 获取用户的统计信息
export const getUserStats = async (walletAddress: string): Promise<UserStats | null> => {
  try {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();
    
    if (error) {
      console.error('获取用户统计信息错误:', error);
      return null;
    }
    
    return data as UserStats;
  } catch (error) {
    console.error('获取用户统计信息异常:', error);
    return null;
  }
};

// 获取用户的捐赠历史
export const getUserDonations = async (walletAddress: string): Promise<DonationRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('wallet_address', walletAddress)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('获取用户捐赠历史错误:', error);
      return [];
    }
    
    // 转换为DonationRecord格式
    return (data || []).map(item => ({
      id: item.id,
      amount: Number(item.amount),
      timestamp: new Date(item.created_at),
      transactionId: item.transaction_id
    }));
  } catch (error) {
    console.error('获取用户捐赠历史异常:', error);
    return [];
  }
};

// 获取奖池状态
export const getPoolStatus = async (): Promise<PoolStatus | null> => {
  try {
    const { data, error } = await supabase
      .from('pool_status')
      .select('*')
      .order('id', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      console.error('获取奖池状态错误:', error);
      return null;
    }
    
    return {
      ...data,
      total_amount: Number(data.total_amount),
      target_amount: Number(data.target_amount)
    } as PoolStatus;
  } catch (error) {
    console.error('获取奖池状态异常:', error);
    return null;
  }
};

// 实时订阅奖池状态变化
export const subscribeToPoolStatus = (callback: (status: PoolStatus) => void) => {
  return supabase
    .channel('pool-status-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'pool_status'
      },
      (payload) => {
        console.log('奖池状态已更新:', payload);
        const newStatus = payload.new as PoolStatus;
        callback({
          ...newStatus,
          total_amount: Number(newStatus.total_amount),
          target_amount: Number(newStatus.target_amount)
        });
      }
    )
    .subscribe();
};

// 实时订阅用户统计信息变化
export const subscribeToUserStats = (walletAddress: string, callback: (stats: UserStats) => void) => {
  return supabase
    .channel(`user-stats-${walletAddress}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'user_stats',
        filter: `wallet_address=eq.${walletAddress}`
      },
      (payload) => {
        console.log('用户统计信息已更新:', payload);
        callback(payload.new as UserStats);
      }
    )
    .subscribe();
};
