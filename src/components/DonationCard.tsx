
import React, { useState, useEffect } from 'react';
import DonationCardContainer from './donation/DonationCardContainer';
import ConnectWalletModal from './wallet/ConnectWalletModal';
import { useWallet, WalletType } from '../context/WalletContext';
// Import buffer polyfill early - ensure it's imported at the top
import '../utils/buffer-polyfill';

const DonationCard = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { connectWallet } = useWallet();

  // Initialize buffer polyfill on component mount
  useEffect(() => {
    // Additional check to ensure Buffer is properly polyfilled
    if (typeof window !== 'undefined' && !window.Buffer) {
      console.error('Buffer polyfill not properly initialized');
      // Force re-initialize if needed
      import('../utils/buffer-polyfill').then(() => {
        console.log('Buffer polyfill loaded dynamically');
      });
    } else {
      console.log('Buffer polyfill verified:', !!window.Buffer);
    }
  }, []);

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
