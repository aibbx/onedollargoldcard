
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
    type: 'MetaMask',
    name: 'MetaMask',
    installUrl: 'https://metamask.io/',
    detectionKey: 'ethereum',
    secondaryCheck: (window) => !!(window.ethereum?.isMetaMask)
  },
  {
    type: 'OKX',
    name: 'OKX Wallet',
    installUrl: 'https://www.okx.com/web3',
    detectionKey: 'okxwallet',
    secondaryCheck: (window) => !!(window.okxwallet?.ethereum)
  }
];

// Get installation URL by wallet type
export const getWalletInstallUrl = (type: WalletType): string => {
  const config = WALLET_CONFIGS.find(config => config.type === type);
  return config?.installUrl || '';
};
