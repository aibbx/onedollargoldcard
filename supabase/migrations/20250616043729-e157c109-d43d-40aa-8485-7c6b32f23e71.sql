
-- Create referral codes table
CREATE TABLE public.referral_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  referrer_wallet_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create referral usage table to track when codes are used
CREATE TABLE public.referral_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referral_code_id UUID REFERENCES public.referral_codes(id) NOT NULL,
  referrer_wallet_address TEXT NOT NULL,
  referee_wallet_address TEXT NOT NULL,
  donation_id UUID REFERENCES public.donations(id) NOT NULL,
  donation_amount NUMERIC NOT NULL,
  service_fee_amount NUMERIC NOT NULL,
  reward_amount NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create referral rewards table to track pending and paid rewards
CREATE TABLE public.referral_rewards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_wallet_address TEXT NOT NULL,
  total_pending_rewards NUMERIC NOT NULL DEFAULT 0,
  total_paid_rewards NUMERIC NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add referral_code column to donations table to track which code was used
ALTER TABLE public.donations 
ADD COLUMN referral_code TEXT NULL;

-- Create indexes for better performance
CREATE INDEX idx_referral_codes_code ON public.referral_codes(code);
CREATE INDEX idx_referral_codes_referrer ON public.referral_codes(referrer_wallet_address);
CREATE INDEX idx_referral_usage_referrer ON public.referral_usage(referrer_wallet_address);
CREATE INDEX idx_referral_usage_referee ON public.referral_usage(referee_wallet_address);
CREATE INDEX idx_referral_rewards_referrer ON public.referral_rewards(referrer_wallet_address);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code(wallet_address TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Generate 6-character code using wallet address hash
    code := UPPER(SUBSTRING(MD5(wallet_address || EXTRACT(EPOCH FROM NOW())::TEXT), 1, 6));
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE referral_codes.code = code) INTO code_exists;
    
    -- If code doesn't exist, break the loop
    IF NOT code_exists THEN
      EXIT;
    END IF;
  END LOOP;
  
  RETURN code;
END;
$$;

-- Function to calculate and update referral rewards
CREATE OR REPLACE FUNCTION update_referral_rewards()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  referral_record RECORD;
  reward_amount NUMERIC;
BEGIN
  -- Only process if donation has a referral code
  IF NEW.referral_code IS NOT NULL THEN
    -- Get referral code details
    SELECT rc.id, rc.referrer_wallet_address 
    INTO referral_record
    FROM public.referral_codes rc 
    WHERE rc.code = NEW.referral_code AND rc.is_active = true;
    
    -- If valid referral code found and referrer is not the same as donor
    IF referral_record.id IS NOT NULL AND referral_record.referrer_wallet_address != NEW.wallet_address THEN
      -- Calculate reward (50% of service fee, which is 5% of donation)
      reward_amount := (NEW.amount * 0.05) * 0.5;
      
      -- Insert referral usage record
      INSERT INTO public.referral_usage (
        referral_code_id,
        referrer_wallet_address,
        referee_wallet_address,
        donation_id,
        donation_amount,
        service_fee_amount,
        reward_amount
      ) VALUES (
        referral_record.id,
        referral_record.referrer_wallet_address,
        NEW.wallet_address,
        NEW.id,
        NEW.amount,
        NEW.amount * 0.05,
        reward_amount
      );
      
      -- Update or insert referral rewards
      INSERT INTO public.referral_rewards (referrer_wallet_address, total_pending_rewards)
      VALUES (referral_record.referrer_wallet_address, reward_amount)
      ON CONFLICT (referrer_wallet_address) 
      DO UPDATE SET 
        total_pending_rewards = public.referral_rewards.total_pending_rewards + reward_amount,
        last_updated = NOW();
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically calculate rewards when donation is made
CREATE TRIGGER trigger_update_referral_rewards
AFTER INSERT ON public.donations
FOR EACH ROW
EXECUTE FUNCTION update_referral_rewards();

-- Add unique constraint on referrer_wallet_address for referral_rewards
ALTER TABLE public.referral_rewards 
ADD CONSTRAINT unique_referrer_wallet UNIQUE (referrer_wallet_address);
