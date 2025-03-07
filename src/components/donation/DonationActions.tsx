
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Wallet, Sparkles, Loader2 } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

interface DonationActionsProps {
  isWalletConnected: boolean;
  handleDonation: () => void;
  handleShareOnX?: () => void;
  donateButtonText: string;
  connectWalletText: string;
  shareOnXText?: string;
  isLoading?: boolean;
}

const DonationActions: React.FC<DonationActionsProps> = ({
  isWalletConnected,
  handleDonation,
  handleShareOnX,
  donateButtonText,
  connectWalletText,
  shareOnXText,
  isLoading = false
}) => {
  const { isProcessing, walletType } = useWallet();
  const buttonDisabled = isLoading || isProcessing;
  
  const getButtonText = () => {
    if (buttonDisabled) {
      return "Processing...";
    }
    return isWalletConnected ? donateButtonText : connectWalletText;
  };
  
  return (
    <div className="space-y-3">
      <button
        onClick={handleDonation}
        disabled={buttonDisabled}
        className="relative overflow-hidden w-full py-3 rounded-lg font-medium text-black 
                   shadow-md hover:shadow-lg transition-all duration-300 
                   bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 
                   transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center group
                   disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        aria-label={buttonDisabled ? "Processing donation" : (isWalletConnected ? "Donate USDC" : "Connect wallet")}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmerTranslate"></span>
        
        {buttonDisabled ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing {walletType && `with ${walletType}`}...
          </>
        ) : isWalletConnected ? (
          <>
            {donateButtonText}
            <CheckCircle2 className="w-5 h-5 ml-2" />
          </>
        ) : (
          <>
            {connectWalletText}
            <Sparkles className="w-5 h-5 ml-2" />
          </>
        )}
      </button>
      
      {isWalletConnected && handleShareOnX && shareOnXText && (
        <Button
          onClick={handleShareOnX}
          variant="outline"
          className="w-full flex items-center justify-center hover:bg-gold-50 hover:border-gold-300 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
          {shareOnXText}
        </Button>
      )}
    </div>
  );
};

export default DonationActions;
