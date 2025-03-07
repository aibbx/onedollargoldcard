
import { NetworkType } from '../../hooks/useWalletConnectors';

export const connectMetaMaskWallet = async (): Promise<{ 
  address: string; 
  provider: any;
}> => {
  if (typeof window === 'undefined' || !window.ethereum || !window.ethereum.isMetaMask) {
    throw new Error('MetaMask wallet not installed');
  }
  
  const provider = window.ethereum;
  
  // Request connection to the wallet
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  
  if (!accounts || accounts.length === 0) {
    throw new Error('Failed to connect to MetaMask. No accounts returned.');
  }
  
  const address = accounts[0];
  
  // Request switch to Ethereum test network (Sepolia)
  try {
    // Try to switch to Sepolia testnet (chainId 0xaa36a7)
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xaa36a7' }], // Sepolia testnet
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0xaa36a7',
            chainName: 'Sepolia Test Network',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: ['https://sepolia.infura.io/v3/'],
            blockExplorerUrls: ['https://sepolia.etherscan.io/']
          }]
        });
      } catch (addError) {
        console.error('Failed to add Sepolia network to MetaMask:', addError);
      }
    } else {
      console.error('Failed to switch to Sepolia network:', switchError);
    }
  }
  
  console.log('Connected to MetaMask wallet');
  
  return {
    address,
    provider
  };
};

export const autoConnectMetaMaskWallet = async (): Promise<{ 
  address: string; 
  provider: any;
} | null> => {
  try {
    if (typeof window === 'undefined' || !window.ethereum || !window.ethereum.isMetaMask) {
      return null;
    }
    
    const provider = window.ethereum;
    
    // Check if already connected
    const accounts = await provider.request({ method: 'eth_accounts' });
    
    if (!accounts || accounts.length === 0) {
      return null;
    }
    
    const address = accounts[0];
    
    console.log('Auto-connected to MetaMask wallet');
    
    return {
      address,
      provider
    };
  } catch (error) {
    console.error('Error auto-connecting MetaMask wallet:', error);
    return null;
  }
};

export const disconnectMetaMaskWallet = async (): Promise<void> => {
  // MetaMask doesn't have a disconnect method
  // The connection persists until the user disconnects from the dApp in the MetaMask UI
  console.log('Note: MetaMask doesn\'t support programmatic disconnection');
};
