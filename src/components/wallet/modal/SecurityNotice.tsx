
import React from 'react';
import { Shield } from 'lucide-react';

const SecurityNotice: React.FC = () => {
  return (
    <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-xl">
      <div className="flex items-start space-x-3">
        <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-blue-200 font-medium text-sm mb-1">Security First</h4>
          <p className="text-blue-300 text-xs leading-relaxed">
            Your wallet connection is secure and encrypted. We never store your private keys.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice;
