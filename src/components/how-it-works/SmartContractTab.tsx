
import React, { useState } from 'react';
import ContractCard from './ContractCard';
import ContractAddresses from './ContractAddresses';
import { contractSections } from './contractData';

const SmartContractTab: React.FC = () => {
  const [openSectionId, setOpenSectionId] = useState('donation-processing');

  const toggleSection = (sectionId: string) => {
    setOpenSectionId(openSectionId === sectionId ? '' : sectionId);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Smart Contract</h3>
      
      <p className="text-gray-700 mb-8">
        Our platform is built on robust, audited smart contracts deployed on the Solana blockchain. 
        These contracts manage the entire donation process, winner selection, and backup mechanisms 
        with complete transparency and security.
      </p>
      
      <div className="space-y-4">
        {contractSections.map((section) => (
          <ContractCard 
            key={section.id}
            section={section}
            isOpen={openSectionId === section.id}
            toggleOpen={() => toggleSection(section.id)}
          />
        ))}
      </div>
      
      <ContractAddresses />
    </div>
  );
};

export default SmartContractTab;
