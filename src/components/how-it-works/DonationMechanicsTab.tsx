
import React from 'react';
import InfoPoint from './InfoPoint';

const DonationMechanicsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Donation Mechanics</h3>
      <ul className="space-y-4 text-gray-700">
        <InfoPoint text="Minimum donation of $1.00 plus a 5% service fee (1.05 USDC)" />
        <InfoPoint text="All donations go directly to the prize pool" />
        <InfoPoint text="A 5% service fee is added for platform operations (audits, legal, maintenance)" />
        <InfoPoint text="More you donate, higher your chances to win!" />
      </ul>
      
      <div className="bg-gold-50 p-6 rounded-lg border border-gold-200 mt-6">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Backup Mechanism</h4>
        <p className="text-gray-700">
          To ensure the prize pool is always distributed, our smart contract includes a backup mechanism:
          If no donations are received for 7 days, the entire pool is automatically sent to the last donor.
          This prevents indefinite accumulation and guarantees that someone always wins.
        </p>
      </div>
    </div>
  );
};

export default DonationMechanicsTab;
