
import { WalletType } from '../types/wallet';

interface WalletConfig {
  type: WalletType;
  name: string;
  installUrl: string;
  detectionKey: string;
  secondaryCheck?: (window: Window) => boolean;
}

export const WALLET_CONFIGS: WalletConfig[] = [
  {
    type: 'Phantom',
    name: 'Phantom',
    installUrl: 'https://phantom.app/',
    detectionKey: 'solana',
    secondaryCheck: (window) => !!(window.solana?.isPhantom)
  },
  {
    type: 'Solflare',
    name: 'Solflare',
    installUrl: 'https://solflare.com/',
    detectionKey: 'solflare'
  },
  {
    type: 'OKX',
    name: 'OKX Wallet',
    installUrl: 'https://www.okx.com/web3',
    detectionKey: 'okxwallet',
    secondaryCheck: (window) => !!(window.okxwallet?.solana)
  }
];

// Get installation URL by wallet type
export const getWalletInstallUrl = (type: WalletType): string => {
  const config = WALLET_CONFIGS.find(config => config.type === type);
  return config?.installUrl || '';
};
