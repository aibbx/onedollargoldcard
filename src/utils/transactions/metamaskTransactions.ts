
import { CONTRACT_ADDRESSES } from '../walletUtils';

// Handle transactions specifically for MetaMask wallet
export const sendMetaMaskTransaction = async (
  provider: any,
  amount: number,
  walletAddress: string
): Promise<string> => {
  // Convert amount to Wei (Ethereum's smallest unit)
  const weiAmount = `0x${(amount * 0.0004 * 1e18).toString(16)}`;
  
  const txParams = {
    from: walletAddress,
    to: CONTRACT_ADDRESSES.ethereumPoolAddress,
    value: weiAmount,
    gas: '0x5208',
    gasPrice: '0x9184e72a000',
  };
  
  return await provider.request({
    method: 'eth_sendTransaction',
    params: [txParams],
  });
};
