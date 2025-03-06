
// Helper function to generate a mock wallet address
export const generateMockAddress = (type: string) => {
  const prefix = type === 'MetaMask' ? '0x' : '';
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = prefix;
  
  // Generate a random string for the address
  for (let i = 0; i < (type === 'MetaMask' ? 40 : 32); i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

// Contract addresses
export const CONTRACT_ADDRESSES = {
  poolAddress: 'BQ7HxJbuGjLxs6PDEg19RLmzHamdTjnByNqBiDTin3rt', // Pool address (onedollargoldcard.sol)
  feeAddress: '5ecoPEMgbz8CL8ymcLVhUNFkp3ded5mWH731L2So7e9Q' // Platform fee address
};
