
import React from 'react';
import { Input } from '@/components/ui/input';

interface AmountSelectorProps {
  amount: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  presetAmounts: number[];
  setAmount: (amount: string) => void;
}

const AmountSelector: React.FC<AmountSelectorProps> = ({ 
  amount, 
  onChange, 
  presetAmounts, 
  setAmount 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {presetAmounts.map((preset) => (
          <button
            key={preset}
            className={`py-2 px-1 rounded-md transition-all duration-200 ${
              parseFloat(amount) === preset
                ? 'bg-gold-500 text-black font-medium'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            onClick={() => setAmount(preset.toString())}
          >
            ${preset}
          </button>
        ))}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (USDT)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <Input
            type="text"
            value={amount}
            onChange={onChange}
            className="pl-8 border-2 focus:ring-gold-500 focus:border-gold-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AmountSelector;
