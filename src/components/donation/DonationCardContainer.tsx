
import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { WalletType } from '../../types/wallet';
import ConnectWalletModal from '../wallet/ConnectWalletModal';
import DonationCardContent from './DonationCardContent';

interface DonationCardContainerProps {
  showWalletModal: () => void;
}

const DonationCardContainer: React.FC<DonationCardContainerProps> = ({ showWalletModal }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white w-full" id="donation-section">
      <div className="container-custom">
        <div className="max-w-md mx-auto w-full">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gold-gradient opacity-30 blur-md"></div>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden relative">
              <DonationCardContent 
                showWalletModal={showWalletModal} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationCardContainer;
