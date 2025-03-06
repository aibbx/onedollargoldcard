
import React from 'react';

interface SecurityPointProps {
  text: string;
}

const SecurityPoint: React.FC<SecurityPointProps> = ({ text }) => {
  return (
    <li className="flex items-start">
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gold-100 flex items-center justify-center mt-1 mr-2">
        <span className="text-gold-600 text-xs font-bold">✓</span>
      </div>
      <p>{text}</p>
    </li>
  );
};

const SecurityFeaturesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Security Features</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h4 className="text-xl font-bold text-gray-800 mb-3">Donation Security</h4>
          <ul className="space-y-2 text-gray-700">
            <SecurityPoint text="Ensures the service fee is exactly 5% of the donation amount" />
            <SecurityPoint text="Transfers donation to prize pool and service fee to platform wallet" />
            <SecurityPoint text="Records timestamp of donation for the 7-day inactivity check" />
          </ul>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h4 className="text-xl font-bold text-gray-800 mb-3">Winner Selection Security</h4>
          <ul className="space-y-2 text-gray-700">
            <SecurityPoint text="Uses Switchboard VRF for provably fair random number generation" />
            <SecurityPoint text="Selects winner based on their proportional contribution" />
            <SecurityPoint text="Emits blockchain events for transparent transaction tracking" />
          </ul>
        </div>
      </div>
      
      <div className="bg-gold-50 p-6 rounded-lg border border-gold-200 mt-6">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Transparency & Security</h4>
        <p className="text-gray-700 mb-4">
          Our platform is built with transparency and security as core principles:
        </p>
        <ul className="space-y-2 text-gray-700">
          <SecurityPoint text="All code is open source and audited" />
          <SecurityPoint text="Smart contract available for public review" />
          <SecurityPoint text="All donations and prize distributions recorded on-chain" />
          <SecurityPoint text="No centralized control over funds" />
        </ul>
      </div>
    </div>
  );
};

export default SecurityFeaturesTab;
