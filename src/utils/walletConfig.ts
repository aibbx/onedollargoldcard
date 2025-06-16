
import { WalletType } from '../types/wallet';

interface WalletConfig {
  type: WalletType;
  name: string;
  installUrl: string;
  detectionKey: string;
  secondaryCheck?: (window: Window) => boolean;
  icon?: string;
}

export const WALLET_CONFIGS: WalletConfig[] = [
  {
    type: 'MetaMask',
    name: 'MetaMask',
    installUrl: 'https://metamask.io/',
    detectionKey: 'ethereum',
    secondaryCheck: (window) => !!(window.ethereum?.isMetaMask),
    icon: '🦊'
  },
  {
    type: 'OKX',
    name: 'OKX Wallet',
    installUrl: 'https://www.okx.com/web3/dapp-store/app-front-page',
    detectionKey: 'okxwallet',
    secondaryCheck: (window) => !!(window.okxwallet?.ethereum || window.okx?.ethereum || window.ethereum?.isOKExWallet),
    icon: '⭕'
  },
  {
    type: 'Binance',
    name: 'Binance Wallet',
    installUrl: 'https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp',
    detectionKey: 'BinanceChain',
    secondaryCheck: (window) => !!(window.BinanceChain?.isBinance),
    icon: '🟡'
  },
  {
    type: 'Bitget',
    name: 'Bitget Wallet',
    installUrl: 'https://chrome.google.com/webstore/detail/bitget-wallet-formerly-bi/jiidiaalihmmhddjgbnbgdfflelocpak',
    detectionKey: 'bitkeep',
    secondaryCheck: (window) => !!(window.bitkeep?.ethereum),
    icon: '🔷'
  }
];

// Get installation URL by wallet type
export const getWalletInstallUrl = (type: WalletType): string => {
  const config = WALLET_CONFIGS.find(config => config.type === type);
  return config?.installUrl || '';
};

// Get wallet display name
export const getWalletDisplayName = (type: WalletType): string => {
  const config = WALLET_CONFIGS.find(config => config.type === type);
  return config?.name || type;
};

// Get wallet icon
export const getWalletIcon = (type: WalletType): string => {
  const config = WALLET_CONFIGS.find(config => config.type === type);
  return config?.icon || '💰';
};
