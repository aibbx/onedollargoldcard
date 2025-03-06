
import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface PoolStatCardProps {
  icon: LucideIcon;
  title: string;
  value: ReactNode;
}

const PoolStatCard = ({ icon: Icon, title, value }: PoolStatCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center mr-3">
          <Icon className="w-5 h-5 text-gold-600" />
        </div>
        <span className="text-gray-700 font-medium">{title}</span>
      </div>
      <div className="text-3xl font-bold text-gray-800">
        {value}
      </div>
    </div>
  );
};

export default PoolStatCard;
