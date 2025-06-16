
import React, { useState } from 'react';
import { validateReferralCode } from '../../services/referralService';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertCircle, Gift } from 'lucide-react';

interface ReferralCodeInputProps {
  referralCode: string;
  setReferralCode: (code: string) => void;
  disabled?: boolean;
}

const ReferralCodeInput: React.FC<ReferralCodeInputProps> = ({
  referralCode,
  setReferralCode,
  disabled = false
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const handleCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase();
    setReferralCode(code);
    
    if (code.length === 0) {
      setIsValid(null);
      return;
    }
    
    if (code.length === 6) {
      setIsValidating(true);
      try {
        const valid = await validateReferralCode(code);
        setIsValid(valid);
        
        if (valid) {
          toast({
            title: "Valid Referral Code",
            description: "You'll help earn rewards for your referrer!",
          });
        } else {
          toast({
            title: "Invalid Referral Code",
            description: "This referral code is not valid or has expired.",
            variant: "destructive",
          });
        }
      } catch (error) {
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    } else {
      setIsValid(null);
    }
  };

  const getInputIcon = () => {
    if (isValidating) {
      return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gold-600"></div>;
    }
    if (isValid === true) {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    if (isValid === false) {
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
    return <Gift className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Referral Code (Optional)
      </label>
      <div className="relative">
        <input
          type="text"
          value={referralCode}
          onChange={handleCodeChange}
          placeholder="Enter 6-character code"
          maxLength={6}
          disabled={disabled}
          className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-center font-mono text-lg tracking-wider"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          {getInputIcon()}
        </div>
      </div>
      {referralCode && (
        <p className="text-xs text-gray-500">
          Using a referral code helps support the platform and earns rewards for your referrer.
        </p>
      )}
    </div>
  );
};

export default ReferralCodeInput;
