
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface PoolProgressProps {
  poolAmount: number;
  targetAmount: number;
  progress: number;
  formatNumber: (num: number) => string;
}

const PoolProgress = ({ poolAmount, targetAmount, progress, formatNumber }: PoolProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-2">
        <div>
          <div className="text-gray-600 mb-1">Current Amount</div>
          <div className="text-4xl font-bold bg-clip-text text-transparent bg-gold-gradient">
            ${formatNumber(poolAmount)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-gray-600 mb-1">Target</div>
          <div className="text-2xl font-semibold text-gray-800">
            ${formatNumber(targetAmount)}
          </div>
        </div>
      </div>
      
      <Progress 
        value={progress} 
        className="h-3 bg-gray-100"
      />
      
      <div className="mt-2 text-sm text-gray-500 text-right">
        {progress.toFixed(1)}% complete
      </div>
    </div>
  );
};

export default PoolProgress;
