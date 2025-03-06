
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Wallet } from 'lucide-react';

interface DonationActionsProps {
  isWalletConnected: boolean;
  handleDonation: () => void;
  handleShareOnX?: () => void;
  donateButtonText: string;
  connectWalletText: string;
  shareOnXText?: string;
}

const DonationActions: React.FC<DonationActionsProps> = ({
  isWalletConnected,
  handleDonation,
  handleShareOnX,
  donateButtonText,
  connectWalletText,
  shareOnXText
}) => {
  return (
    <div className="space-y-3">
      <button
        onClick={handleDonation}
        className="btn-gold w-full py-3 flex justify-center items-center"
      >
        {isWalletConnected ? (
          <>
            {donateButtonText}
            <CheckCircle2 className="w-5 h-5 ml-2" />
          </>
        ) : (
          <>
            {connectWalletText}
            <Wallet className="w-5 h-5 ml-2" />
          </>
        )}
      </button>
      
      {isWalletConnected && handleShareOnX && shareOnXText && (
        <Button
          onClick={handleShareOnX}
          variant="outline"
          className="w-full flex items-center justify-center"
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
