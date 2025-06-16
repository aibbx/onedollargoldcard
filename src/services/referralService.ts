
import { supabase } from "@/integrations/supabase/client";

export interface ReferralCode {
  id: string;
  code: string;
  referrer_wallet_address: string;
  created_at: string;
  is_active: boolean;
}

export interface ReferralUsage {
  id: string;
  referral_code_id: string;
  referrer_wallet_address: string;
  referee_wallet_address: string;
  donation_id: string;
  donation_amount: number;
  service_fee_amount: number;
  reward_amount: number;
  created_at: string;
}

export interface ReferralRewards {
  id: string;
  referrer_wallet_address: string;
  total_pending_rewards: number;
  total_paid_rewards: number;
  last_updated: string;
}

// Generate a new referral code for a wallet
export const generateReferralCode = async (walletAddress: string): Promise<string | null> => {
  try {
    console.log('Generating referral code for:', walletAddress);
    
    const { data, error } = await supabase.rpc('generate_referral_code', {
      wallet_address: walletAddress
    });
    
    if (error) {
      console.error('Error generating referral code:', error);
      return null;
    }
    
    // Insert the new code into the database
    const { data: insertData, error: insertError } = await supabase
      .from('referral_codes')
      .insert([{
        code: data,
        referrer_wallet_address: walletAddress
      }])
      .select()
      .single();
    
    if (insertError) {
      console.error('Error inserting referral code:', insertError);
      return null;
    }
    
    console.log('Referral code generated:', data);
    return data;
  } catch (error) {
    console.error('Exception generating referral code:', error);
    return null;
  }
};

// Get referral codes for a wallet
export const getUserReferralCodes = async (walletAddress: string): Promise<ReferralCode[]> => {
  try {
    const { data, error } = await supabase
      .from('referral_codes')
      .select('*')
      .eq('referrer_wallet_address', walletAddress)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching referral codes:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching referral codes:', error);
    return [];
  }
};

// Validate a referral code
export const validateReferralCode = async (code: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('referral_codes')
      .select('code')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .maybeSingle();
    
    if (error) {
      console.error('Error validating referral code:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Exception validating referral code:', error);
    return false;
  }
};

// Get referral rewards for a wallet
export const getReferralRewards = async (walletAddress: string): Promise<ReferralRewards | null> => {
  try {
    const { data, error } = await supabase
      .from('referral_rewards')
      .select('*')
      .eq('referrer_wallet_address', walletAddress)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching referral rewards:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching referral rewards:', error);
    return null;
  }
};

// Get referral usage history for a wallet
export const getReferralUsageHistory = async (walletAddress: string): Promise<ReferralUsage[]> => {
  try {
    const { data, error } = await supabase
      .from('referral_usage')
      .select('*')
      .eq('referrer_wallet_address', walletAddress)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching referral usage:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching referral usage:', error);
    return [];
  }
};
