
import React, { useState } from 'react';
import { useWallet, WalletType } from '../../context/WalletContext';
import ConnectWalletModal from '../wallet/ConnectWalletModal';
import DonationCardContent from './DonationCardContent';

const DonationCardContainer = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { connectWallet } = useWallet();

  const handleConnectWallet = async (type: WalletType) => {
    try {
      await connectWallet(type);
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return Promise.reject(error);
    }
  };

  return (
    <section className="py-24 bg-white" id="donation-section">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gold-gradient opacity-30 blur-md"></div>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden relative">
              <DonationCardContent 
                showWalletModal={() => setShowWalletModal(true)} 
              />
            </div>
          </div>
        </div>
      </div>

      <ConnectWalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnectWallet={handleConnectWallet}
      />
    </section>
  );
};

export default DonationCardContainer;
