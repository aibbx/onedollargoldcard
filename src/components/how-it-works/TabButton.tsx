
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TabButtonProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: (id: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ id, label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
        isActive
          ? 'bg-gold-500 text-white shadow-md transform scale-105'
          : 'bg-white text-gray-700 hover:bg-gold-100 hover:scale-105'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default TabButton;
