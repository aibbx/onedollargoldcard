
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Wallet, Sparkles, Loader2, AlertCircle, Smartphone, ArrowLeft } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useIsMobile } from '../../hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const buttonDisabled = isLoading || isProcessing;
  
  // Check for pending mobile connection
  const pendingMobileConnection = localStorage.getItem('pendingMobileConnection');
  const mobileConnectionTimestamp = localStorage.getItem('mobileConnectionTimestamp');
  
  // Check if pending connection is recent (within 5 minutes)
  const hasPendingConnection = pendingMobileConnection && mobileConnectionTimestamp && 
    (Date.now() - parseInt(mobileConnectionTimestamp)) < 5 * 60 * 1000;
  
  const getButtonText = () => {
    if (buttonDisabled) {
      return walletType ? `Processing with ${walletType}...` : "Processing...";
    }
    if (hasPendingConnection && isMobile) {
      return `Waiting for ${pendingMobileConnection} connection...`;
    }
    return isWalletConnected ? donateButtonText : connectWalletText;
  };
  
  return (
    <div className="space-y-3">
      {/* Mobile-specific guidance */}
      {isMobile && !isWalletConnected && !hasPendingConnection && (
        <div className="p-3 bg-blue-900/30 border border-blue-500/20 rounded-md text-blue-200 text-sm">
          <div className="flex items-center">
            <Smartphone className="w-4 h-4 mr-2 flex-shrink-0" />
            <p>
              <strong>Mobile users:</strong> Make sure you have MetaMask or OKX app installed. 
              You might be redirected to your wallet app to complete the connection.
            </p>
          </div>
        </div>
      )}
      
      {/* Pending mobile connection guidance */}
      {isMobile && hasPendingConnection && (
        <div className="p-4 bg-amber-900/30 border border-amber-500/20 rounded-md text-amber-200 text-sm">
          <div className="flex items-start gap-3">
            <ArrowLeft className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium mb-2">Waiting for {pendingMobileConnection} connection...</p>
              <p className="text-xs opacity-90">
                If you've completed the connection in your {pendingMobileConnection} app, 
                please wait a moment for the connection to be detected. You can also try refreshing the page.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={handleDonation}
        disabled={buttonDisabled}
        className={`relative overflow-hidden w-full rounded-lg font-medium text-black 
                   shadow-md hover:shadow-lg transition-all duration-300 
                   bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 
                   transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center group
                   disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
                     isMobile ? 'py-4 text-lg' : 'py-3'
                   }`}
        aria-label={buttonDisabled ? "Processing donation" : (isWalletConnected ? "Donate USD1" : "Connect wallet")}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmerTranslate"></span>
        
        {buttonDisabled ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {walletType ? `Processing with ${walletType}...` : "Processing..."}
          </>
        ) : hasPendingConnection && isMobile ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Waiting for {pendingMobileConnection} connection...
          </>
        ) : isWalletConnected ? (
          <>
            {donateButtonText}
            <CheckCircle2 className="w-5 h-5 ml-2" />
          </>
        ) : (
          <>
            {connectWalletText}
            {isMobile ? <Smartphone className="w-5 h-5 ml-2" /> : <Sparkles className="w-5 h-5 ml-2" />}
          </>
        )}
      </button>
      
      {buttonDisabled && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            <p>
              <strong>Please note:</strong> You'll need to approve this transaction in your {walletType} wallet.
              {isMobile && " You may be redirected to your wallet app."}
              If you don't see a prompt, check your wallet extension{isMobile ? " or app" : ""}.
            </p>
          </div>
        </div>
      )}
      
      {isWalletConnected && handleShareOnX && shareOnXText && (
        <Button
          onClick={handleShareOnX}
          variant="outline"
          className={`w-full flex items-center justify-center hover:bg-gold-50 hover:border-gold-300 transition-all duration-300 ${
            isMobile ? 'py-3 text-base' : ''
          }`}
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
