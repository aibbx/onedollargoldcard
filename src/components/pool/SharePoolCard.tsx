
import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SharePoolCardProps {
  title: string;
  onShare: () => void;
}

const SharePoolCard = ({ title, onShare }: SharePoolCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center mr-3">
          <Share2 className="w-5 h-5 text-gold-600" />
        </div>
        <span className="text-gray-700 font-medium">{title}</span>
      </div>
      <Button 
        onClick={onShare}
        variant="outline"
        className="flex items-center text-gray-700 hover:text-gold-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
        Share on X
      </Button>
    </div>
  );
};

export default SharePoolCard;
