
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
        <InfoPoint text="Each donation increases your chance to win proportionally" />
      </ul>
    </div>
  );
};

export default DonationMechanicsTab;
