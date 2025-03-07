
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
                <img src="/wallet-icons/phantom-icon.png" alt="Phantom" className="w-10 h-10" />
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
                <img src="/wallet-icons/solflare-icon.png" alt="Solflare" className="w-10 h-10" />
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
                <img src="/wallet-icons/okx-icon.png" alt="OKX" className="w-10 h-10" />
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
                <img src="/wallet-icons/metamask-icon.png" alt="MetaMask" className="w-10 h-10" />
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
