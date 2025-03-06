
import React from 'react';

interface InfoPointProps {
  text: string;
}

const InfoPoint: React.FC<InfoPointProps> = ({ text }) => {
  return (
    <li className="flex items-start">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-3">
        <span className="text-gold-600 text-sm font-bold">•</span>
      </div>
      <p>{text}</p>
    </li>
  );
};

export default InfoPoint;
