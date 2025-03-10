
import React from 'react';
import InfoPoint from './InfoPoint';

const WinnerSelectionTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Winner Selection</h3>
      <ul className="space-y-4 text-gray-700">
        <InfoPoint text="When the fund reaches $10 million, a winner is selected" />
        <InfoPoint text="Selection uses Switchboard VRF (Verifiable Random Function) for transparency" />
        <InfoPoint text="The winner receives $5 million USDC automatically" />
        <InfoPoint text="The remaining $5 million stays in the fund for the next round" />
        <InfoPoint text="Donations continue to accumulate for the next milestone" />
      </ul>
      
      <div className="bg-gold-50 p-6 rounded-lg border border-gold-200 mt-6">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Fairness Guarantees</h4>
        <p className="text-gray-700">
          Our winner selection process is completely transparent and fair. The smart contract 
          verifies the fund has reached $10 million, uses Switchboard VRF for provably fair random 
          number generation, and selects winners based on their proportional contribution.
        </p>
      </div>
    </div>
  );
};

export default WinnerSelectionTab;
