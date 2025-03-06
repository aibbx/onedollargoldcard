
import React from 'react';
import InfoPoint from './InfoPoint';

const SecurityFeaturesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Security Features</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h4 className="text-xl font-bold text-gray-800 mb-3">Donation Security</h4>
          <ul className="space-y-2 text-gray-700">
            <InfoPoint text="Ensures the service fee is exactly 5% on top of the donation amount" />
            <InfoPoint text="Transfers donation to prize pool and service fee to platform wallet" />
            <InfoPoint text="Records timestamp of donation for the 7-day inactivity check" />
          </ul>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h4 className="text-xl font-bold text-gray-800 mb-3">Winner Selection Security</h4>
          <ul className="space-y-2 text-gray-700">
            <InfoPoint text="Uses Switchboard VRF for provably fair random number generation" />
            <InfoPoint text="Selects winner based on their proportional contribution" />
            <InfoPoint text="Emits blockchain events for transparent transaction tracking" />
          </ul>
        </div>
      </div>
      
      <div className="bg-gold-50 p-6 rounded-lg border border-gold-200 mt-6">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Transparency & Security</h4>
        <p className="text-gray-700 mb-4">
          Our platform is built with transparency and security as core principles:
        </p>
        <ul className="space-y-2 text-gray-700">
          <InfoPoint text="All code is open source and audited" />
          <InfoPoint text="Smart contract available for public review" />
          <InfoPoint text="All donations and prize distributions recorded on-chain" />
          <InfoPoint text="No centralized control over funds" />
        </ul>
      </div>
    </div>
  );
};

export default SecurityFeaturesTab;
