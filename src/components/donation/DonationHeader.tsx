
import React from 'react';

interface DonationHeaderProps {
  title: string;
}

const DonationHeader: React.FC<DonationHeaderProps> = ({ title }) => {
  return (
    <div className="bg-gold-500 px-6 py-4 text-black flex items-center justify-between">
      <h3 className="font-bold text-xl">{title}</h3>
      <div className="flex items-center">
        <span className="text-sm font-bold mr-1">$1</span>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFC300" stroke="#333" strokeWidth="1.5"/>
          <path d="M8 12H16M12 8V16" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
};

export default DonationHeader;
