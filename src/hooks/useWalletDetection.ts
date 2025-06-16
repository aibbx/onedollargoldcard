
import { useState, useEffect } from 'react';
import { WalletDetectionResult } from '../types/wallet';

export const useWalletDetection = () => {
  const [availableWallets, setAvailableWallets] = useState<WalletDetectionResult>({
    metamask: false,
    okx: false,
    binance: false,
    bitget: false
  });

  useEffect(() => {
    const detectWallets = () => {
      const detection: WalletDetectionResult = {
        metamask: !!(typeof window !== 'undefined' && window.ethereum?.isMetaMask),
        okx: !!(typeof window !== 'undefined' && window.okxwallet?.ethereum),
        binance: !!(typeof window !== 'undefined' && window.BinanceChain?.isBinance),
        bitget: !!(typeof window !== 'undefined' && window.bitkeep?.ethereum)
      };

      console.log('Detected wallets:', detection);
      setAvailableWallets(detection);
    };

    // Initial detection
    detectWallets();

    // Re-detect after a short delay to account for slow-loading extensions
    const timeouts = [
      setTimeout(detectWallets, 500),
      setTimeout(detectWallets, 1000),
      setTimeout(detectWallets, 2000)
    ];

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return { availableWallets };
};
