
import React, { useState } from 'react';
import DonationCardContainer from './donation/DonationCardContainer';
import ConnectWalletModal from './wallet/ConnectWalletModal';
import { useWallet, WalletType } from '../context/WalletContext';

const DonationCard = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { connectWallet } = useWallet();

  const handleConnectWallet = async (type: WalletType) => {
    try {
      await connectWallet(type);
      setShowWalletModal(false);
      return Promise.resolve();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return Promise.reject(error);
    }
  };

  return (
    <>
      <DonationCardContainer showWalletModal={() => setShowWalletModal(true)} />
      
      <ConnectWalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnectWallet={handleConnectWallet}
      />
    </>
  );
};

export default DonationCard;
