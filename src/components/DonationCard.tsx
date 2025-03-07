
import React, { useState, useEffect } from 'react';
import DonationCardContainer from './donation/DonationCardContainer';
import ConnectWalletModal from './wallet/ConnectWalletModal';
import { useWallet, WalletType } from '../context/WalletContext';
// Import buffer polyfill early
import '../utils/buffer-polyfill';

const DonationCard = () => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const { connectWallet } = useWallet();

  // Initialize buffer polyfill on component mount
  useEffect(() => {
    // Buffer should be available globally now
    console.log('DonationCard loaded, Buffer availability:', 
      typeof window !== 'undefined' ? !!window.Buffer : 'Not in browser');
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
