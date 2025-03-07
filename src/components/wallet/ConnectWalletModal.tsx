
import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X } from 'lucide-react';
import { WalletType } from '../../types/wallet';
import { Link } from 'react-router-dom';
import { detectWallets } from '../../utils/walletUtils';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet: (type: WalletType) => Promise<void>;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ 
  isOpen, 
  onClose, 
  onConnectWallet 
}) => {
  const { t } = useLanguage();
  const [availableWallets, setAvailableWallets] = React.useState({
    phantom: false,
    solflare: false,
    okx: false,
    metamask: false
  });

  React.useEffect(() => {
    // Check what wallets are available in the browser
    const detectAvailableWallets = () => {
      setAvailableWallets(detectWallets());
    };
    
    // Small delay to ensure browser extensions have loaded
    const timer = setTimeout(() => {
      detectAvailableWallets();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  const handleWalletConnect = async (type: WalletType) => {
    try {
      await onConnectWallet(type);
      onClose();
    } catch (error) {
      console.error(`Failed to connect ${type} wallet:`, error);
    }
  };

  const openWalletSite = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-2xl font-medium text-gray-800">Connect Wallet</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Connect your Solana wallet to donate and participate in the Gold Card program.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleWalletConnect('Phantom')}
              className={`wallet-option-button flex items-center justify-between w-full p-4 rounded-lg border ${
                availableWallets.phantom 
                  ? 'border-purple-200 hover:bg-purple-50' 
                  : 'border-gray-200 bg-gray-50 opacity-70'
              }`}
              disabled={!availableWallets.phantom}
            >
              <div className="flex items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                  <circle cx="20" cy="20" r="20" fill="#AB9FF2"/>
                  <path d="M12 13C12 11.8954 12.8954 11 14 11H26C27.1046 11 28 11.8954 28 13V27C28 28.1046 27.1046 29 26 29H14C12.8954 29 12 28.1046 12 27V13Z" fill="white" stroke="white" strokeWidth="2"/>
                  <circle cx="20" cy="20" r="4" fill="#AB9FF2"/>
                </svg>
                <span className="ml-3 font-medium">Phantom</span>
              </div>
              {!availableWallets.phantom && (
                <span 
                  className="text-xs text-purple-600 underline font-medium cursor-pointer" 
                  onClick={(e) => openWalletSite('https://phantom.app/', e)}
                >
                  Install
                </span>
              )}
            </button>
            
            <button
              onClick={() => handleWalletConnect('Solflare')}
              className={`wallet-option-button flex items-center justify-between w-full p-4 rounded-lg border ${
                availableWallets.solflare 
                  ? 'border-orange-200 hover:bg-orange-50' 
                  : 'border-gray-200 bg-gray-50 opacity-70'
              }`}
              disabled={!availableWallets.solflare}
            >
              <div className="flex items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                  <circle cx="20" cy="20" r="20" fill="white"/>
                  <path d="M20 10L30 20L20 30L10 20L20 10Z" fill="#FC8E2D"/>
                </svg>
                <span className="ml-3 font-medium">Solflare</span>
              </div>
              {!availableWallets.solflare && (
                <span 
                  className="text-xs text-orange-600 underline font-medium cursor-pointer" 
                  onClick={(e) => openWalletSite('https://solflare.com/', e)}
                >
                  Install
                </span>
              )}
            </button>
            
            <button
              onClick={() => handleWalletConnect('OKX')}
              className={`wallet-option-button flex items-center justify-between w-full p-4 rounded-lg border ${
                availableWallets.okx 
                  ? 'border-blue-200 hover:bg-blue-50' 
                  : 'border-gray-200 bg-gray-50 opacity-70'
              }`}
              disabled={!availableWallets.okx}
            >
              <div className="flex items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                  <circle cx="20" cy="20" r="20" fill="white"/>
                  <rect x="10" y="10" width="8" height="8" fill="black"/>
                  <rect x="22" y="10" width="8" height="8" fill="black"/>
                  <rect x="10" y="22" width="8" height="8" fill="black"/>
                  <rect x="22" y="22" width="8" height="8" fill="black"/>
                </svg>
                <span className="ml-3 font-medium">OKX Wallet</span>
              </div>
              {!availableWallets.okx && (
                <span 
                  className="text-xs text-blue-600 underline font-medium cursor-pointer" 
                  onClick={(e) => openWalletSite('https://www.okx.com/web3', e)}
                >
                  Install
                </span>
              )}
            </button>
            
            <button
              onClick={() => handleWalletConnect('MetaMask')}
              className={`wallet-option-button flex items-center justify-between w-full p-4 rounded-lg border ${
                availableWallets.metamask 
                  ? 'border-amber-200 hover:bg-amber-50' 
                  : 'border-gray-200 bg-gray-50 opacity-70'
              }`}
              disabled={!availableWallets.metamask}
            >
              <div className="flex items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                  <circle cx="20" cy="20" r="20" fill="white"/>
                  <path d="M32.0502 8.94995L22.101 16.2262L24.3748 11.2758L32.0502 8.94995Z" fill="#E17726" stroke="#E17726" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7.9498 8.94995L17.8158 16.2927L15.6252 11.2758L7.9498 8.94995Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28.0691 27.3214L25.0484 32.1282L31.1995 33.9741L33.0411 27.4219L28.0691 27.3214Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.9751 27.4219L8.8005 33.9741L14.9353 32.1282L11.9307 27.3214L6.9751 27.4219Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.5182 19.0248L12.5599 22.0842L18.6261 22.4188L18.3743 15.8564L14.5182 19.0248Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M25.4815 19.0248L21.558 15.7894L21.3896 22.4188L27.4396 22.0842L25.4815 19.0248Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.9354 32.1282L18.1887 30.1192L15.403 27.4722L14.9354 32.1282Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.8115 30.1192L25.0484 32.1282L24.5971 27.4722L21.8115 30.1192Z" fill="#E27625" stroke="#E27625" strokeWidth="0.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="ml-3 font-medium">MetaMask</span>
              </div>
              {!availableWallets.metamask && (
                <span 
                  className="text-xs text-amber-600 underline font-medium cursor-pointer" 
                  onClick={(e) => openWalletSite('https://metamask.io/', e)}
                >
                  Install
                </span>
              )}
            </button>
          </div>
          
          <p className="text-sm text-center text-gray-500 mt-6">
            By connecting your wallet, you agree to our <Link to="/terms" className="text-gold-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-gold-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletModal;
