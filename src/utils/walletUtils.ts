
// Helper function to generate a mock wallet address that's more realistic
export const generateMockAddress = (type: string) => {
  const random = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  
  // Generate Solana-like address (base58 encoded, 44 characters)
  const base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < 44; i++) {
    result += base58Chars.charAt(Math.floor(Math.random() * base58Chars.length));
  }
  return result;
};

// Generate transaction hash
export const generateTransactionHash = (chainType: 'solana' | 'ethereum') => {
  if (chainType === 'ethereum') {
    // Ethereum tx hash: 0x + 64 hex characters
    return `0x${Array(64).fill(0).map(() => 
      "0123456789abcdef"[Math.floor(Math.random() * 16)]
    ).join('')}`;
  } else {
    // Solana tx signature: base58, typically 88 characters
    const base58Chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 88; i++) {
      result += base58Chars.charAt(Math.floor(Math.random() * base58Chars.length));
    }
    return result;
  }
};

// Get explorer URL for transaction ID
export const getExplorerUrl = (txId: string, walletType: string) => {
  // Solana-based wallets
  return `https://solscan.io/tx/${txId}`;
};

// Detect available wallets
export const detectWallets = () => {
  if (typeof window === 'undefined') return {
    phantom: false,
    solflare: false,
    okx: false
  };
  
  // Ensure we're checking in a browser environment
  return {
    phantom: 'solana' in window,
    solflare: 'solflare' in window,
    okx: 'okxwallet' in window && 'solana' in (window.okxwallet || {})
  };
};

// Enhanced wallet detection with additional fallback checks
export const detectWalletsEnhanced = () => {
  if (typeof window === 'undefined') return {
    phantom: false,
    solflare: false,
    okx: false
  };
  
  // Primary detection
  const primary = {
    phantom: 'solana' in window,
    solflare: 'solflare' in window,
    okx: 'okxwallet' in window && 'solana' in (window.okxwallet || {})
  };
  
  // Secondary fallback detection for cases where window objects exist but may not be fully loaded
  const secondary = {
    phantom: primary.phantom || (window.solana && window.solana.isPhantom) || false,
    solflare: primary.solflare || (window.solflare !== undefined) || false,
    okx: primary.okx || (window.okxwallet !== undefined) || false
  };
  
  return {
    phantom: primary.phantom || secondary.phantom,
    solflare: primary.solflare || secondary.solflare,
    okx: primary.okx || secondary.okx
  };
};

// Contract addresses
export const CONTRACT_ADDRESSES = {
  poolAddress: 'BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt', // Pool address (onedollargoldcard.sol)
  feeAddress: '5ecoPEMgbz8CL8ymcLVhUNFkp3ded5mWH731L2So7e9Q' // Platform fee address
};
