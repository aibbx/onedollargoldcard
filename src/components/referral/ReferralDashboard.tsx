
import React, { useState, useEffect } from 'react';
import { useWallet } from '../../context/WalletContext';
import { 
  generateReferralCode, 
  getUserReferralCodes, 
  getReferralRewards, 
  getReferralUsageHistory,
  ReferralCode,
  ReferralRewards,
  ReferralUsage
} from '../../services/referralService';
import { useToast } from "@/hooks/use-toast";
import { Copy, Gift, Users, DollarSign, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ReferralDashboard: React.FC = () => {
  const { isWalletConnected, walletAddress } = useWallet();
  const { toast } = useToast();
  
  const [referralCodes, setReferralCodes] = useState<ReferralCode[]>([]);
  const [rewards, setRewards] = useState<ReferralRewards | null>(null);
  const [usageHistory, setUsageHistory] = useState<ReferralUsage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isWalletConnected && walletAddress) {
      loadReferralData();
    }
  }, [isWalletConnected, walletAddress]);

  const loadReferralData = async () => {
    if (!walletAddress) return;
    
    setIsLoading(true);
    try {
      const [codes, rewardsData, history] = await Promise.all([
        getUserReferralCodes(walletAddress),
        getReferralRewards(walletAddress),
        getReferralUsageHistory(walletAddress)
      ]);
      
      setReferralCodes(codes);
      setRewards(rewardsData);
      setUsageHistory(history);
    } catch (error) {
      console.error('Error loading referral data:', error);
      toast({
        title: "Error",
        description: "Failed to load referral data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    if (!walletAddress) return;
    
    setIsGenerating(true);
    try {
      const newCode = await generateReferralCode(walletAddress);
      if (newCode) {
        await loadReferralData(); // Refresh data
        toast({
          title: "Referral Code Generated",
          description: `Your new referral code: ${newCode}`,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to generate referral code. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error generating referral code:', error);
      toast({
        title: "Error",
        description: "Failed to generate referral code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard.",
    });
  };

  const shareUrl = (code: string) => {
    const url = `${window.location.origin}?ref=${code}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Share URL Copied!",
      description: "Referral link copied to clipboard.",
    });
  };

  if (!isWalletConnected) {
    return (
      <div className="text-center py-8">
        <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Connect Your Wallet</h3>
        <p className="text-gray-500">Connect your wallet to access the referral program.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <Gift className="w-8 h-8 text-gold-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Pending Rewards</p>
              <p className="text-2xl font-bold text-gold-600">
                ${(rewards?.total_pending_rewards || 0).toFixed(4)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Earned</p>
              <p className="text-2xl font-bold text-green-600">
                ${((rewards?.total_pending_rewards || 0) + (rewards?.total_paid_rewards || 0)).toFixed(4)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Referrals</p>
              <p className="text-2xl font-bold text-blue-600">{usageHistory.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Codes */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Referral Codes</h3>
          <Button
            onClick={handleGenerateCode}
            disabled={isGenerating}
            className="bg-gold-600 hover:bg-gold-700"
          >
            {isGenerating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Generate New Code
          </Button>
        </div>
        
        {referralCodes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No referral codes yet. Generate your first code to start earning rewards!
          </p>
        ) : (
          <div className="space-y-3">
            {referralCodes.map((code) => (
              <div key={code.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="font-mono text-lg font-bold text-gold-600 mr-4">{code.code}</span>
                  <span className="text-sm text-gray-500">
                    Created {new Date(code.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(code.code)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareUrl(code.code)}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage History */}
      {usageHistory.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Referral History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Donation</th>
                  <th className="text-left py-2">Fee</th>
                  <th className="text-left py-2">Your Reward</th>
                </tr>
              </thead>
              <tbody>
                {usageHistory.map((usage) => (
                  <tr key={usage.id} className="border-b">
                    <td className="py-2">{new Date(usage.created_at).toLocaleDateString()}</td>
                    <td className="py-2">${Number(usage.donation_amount).toFixed(2)}</td>
                    <td className="py-2">${Number(usage.service_fee_amount).toFixed(4)}</td>
                    <td className="py-2 text-gold-600 font-semibold">
                      ${Number(usage.reward_amount).toFixed(4)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* How It Works */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">How Referral Rewards Work</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Share your referral code with friends</li>
          <li>• When someone donates using your code, you earn 50% of the service fee</li>
          <li>• Service fee is 5% of the donation amount</li>
          <li>• Rewards are tracked automatically but paid manually once fees are collected</li>
          <li>• You cannot use your own referral code</li>
        </ul>
      </div>
    </div>
  );
};

export default ReferralDashboard;
