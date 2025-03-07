
import { useState, useEffect } from 'react';
import { WALLET_CONFIGS } from '../utils/walletConfig';

interface DetectedWallets {
  phantom: boolean;
  solflare: boolean;
  okx: boolean;
  metamask: boolean;
}

export const useWalletDetection = () => {
  const [availableWallets, setAvailableWallets] = useState<DetectedWallets>({
    phantom: false,
    solflare: false,
    okx: false,
    metamask: false
  });
  const [detectionComplete, setDetectionComplete] = useState(false);

  useEffect(() => {
    // Check what wallets are available in the browser
    const detectAvailableWallets = () => {
      if (typeof window === 'undefined') return;
      
      const detected: DetectedWallets = {
        phantom: false,
        solflare: false,
        okx: false,
        metamask: false
      };
      
      // Log for debugging
      console.log('Detecting wallets...');
      
      // Primary detection
      WALLET_CONFIGS.forEach(config => {
        const key = config.detectionKey as string;
        const exists = key in window;
        
        console.log(`Checking ${config.type}: ${key} exists: ${exists}`);
        
        // Secondary check if needed
        if (exists && config.secondaryCheck) {
          const passesSecondaryCheck = config.secondaryCheck(window);
          console.log(`${config.type} secondary check: ${passesSecondaryCheck}`);
          
          if (passesSecondaryCheck) {
            const walletKey = config.type.toLowerCase() as keyof DetectedWallets;
            detected[walletKey] = true;
          }
        } else if (exists) {
          const walletKey = config.type.toLowerCase() as keyof DetectedWallets;
          detected[walletKey] = true;
        }
      });
      
      console.log('Available wallets:', detected);
      setAvailableWallets(detected);
      setDetectionComplete(true);
    };
    
    // Small delay to ensure browser extensions have loaded
    const timer = setTimeout(() => {
      detectAvailableWallets();
    }, 1000); // Increased timer to ensure extensions are loaded
    
    return () => clearTimeout(timer);
  }, []);

  return {
    availableWallets,
    detectionComplete
  };
};
