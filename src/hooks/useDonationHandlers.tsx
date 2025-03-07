
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { DonationRecord, WalletType } from '../types/wallet';
import { getExplorerUrl, CONTRACT_ADDRESSES } from '../utils/walletUtils';

export const useDonationHandlers = (
  isWalletConnected: boolean,
  walletAddress: string,
  walletType: WalletType,
  provider: any,
  initialDonations: DonationRecord[] = []
) => {
  const { toast } = useToast();
  const [donations, setDonations] = useState<DonationRecord[]>(initialDonations);
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [winningChance, setWinningChance] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Send donation function
  const sendDonation = async (amount: number): Promise<string | null> => {
    if (!isWalletConnected || !walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to make a donation.",
        variant: "destructive",
      });
      return null;
    }
    
    if (isProcessing) {
      toast({
        title: "Transaction in Progress",
        description: "Please wait for your current transaction to complete.",
        variant: "destructive",
      });
      return null;
    }
    
    try {
      setIsProcessing(true);
      let transactionId;
      
      // Create an actual transaction to send funds to the contract address
      if (provider) {
        try {
          if (walletType === 'MetaMask') {
            console.log("Creating MetaMask transaction to donate ETH...");
            console.log("Amount:", amount);
            console.log("Contract address:", CONTRACT_ADDRESSES.ethereumPoolAddress);

            // Convert amount to wei (1 ETH = 10^18 wei)
            // For production, use proper conversion rates based on current ETH prices
            const weiAmount = `0x${(amount * 0.0004 * 1e18).toString(16)}`;
            
            // Create Ethereum transaction
            const txParams = {
              from: walletAddress,
              to: CONTRACT_ADDRESSES.ethereumPoolAddress,
              value: weiAmount, // Value in wei
              gas: '0x5208', // 21000 gas (standard Ethereum transaction)
              gasPrice: '0x9184e72a000', // 10 Gwei
            };
            
            console.log("Requesting signature from MetaMask wallet...");
            
            // This will trigger the MetaMask popup
            const txHash = await provider.request({
              method: 'eth_sendTransaction',
              params: [txParams],
            });
            
            console.log("Transaction sent successfully!", txHash);
            transactionId = txHash;
          } 
          else if (walletType === 'Phantom' && provider.request) {
            console.log("Creating Solana transaction...");
            // In production, we would create a proper Solana transaction here
            // This would involve using @solana/web3.js to construct the transaction
            
            // Create a "Send SOL" transaction to the pool address
            const createTransactionRequest = {
              method: 'transfer',
              params: {
                to: CONTRACT_ADDRESSES.poolAddress,
                amount: amount // Amount in USDC or SOL
              }
            };
            
            console.log("Requesting signature from Phantom wallet...");
            
            // This will trigger the wallet popup
            const signedTx = await provider.request(createTransactionRequest);
            transactionId = signedTx.signature;
            
            console.log("Transaction signed and sent successfully!", transactionId);
          } 
          else if (walletType === 'Solflare') {
            console.log("Creating Solana transaction for Solflare...");
            // For production, implement actual Solflare transaction using their API
            
            // This would use provider methods in a real implementation
            const result = await provider.signAndSendTransaction({
              to: CONTRACT_ADDRESSES.poolAddress,
              amount: amount
            });
            
            transactionId = result.signature;
            console.log("Transaction sent successfully:", transactionId);
          }
          else if (walletType === 'OKX' && provider) {
            console.log("Creating Solana transaction for OKX...");
            // For production, implement actual OKX transaction using their API
            
            const result = await provider.signAndSendTransaction({
              to: CONTRACT_ADDRESSES.poolAddress,
              amount: amount
            });
            
            transactionId = result.signature;
            console.log("Transaction sent successfully:", transactionId);
          }
          else {
            console.error("Unsupported wallet type:", walletType);
            toast({
              title: "Unsupported Wallet",
              description: "This wallet type is not currently supported for transactions.",
              variant: "destructive",
            });
            setIsProcessing(false);
            return null;
          }
        } catch (err) {
          console.error("Error requesting signature:", err);
          toast({
            title: "Signature Declined",
            description: "You declined the transaction signature. The donation was not processed.",
            variant: "destructive",
          });
          setIsProcessing(false);
          return null;
        }
      } else {
        console.error("No provider available");
        toast({
          title: "Wallet Error",
          description: "Cannot access your wallet. Please reconnect and try again.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return null;
      }
      
      // Create a donation record with transaction data
      if (transactionId) {
        const newDonation: DonationRecord = {
          id: `donation_${Date.now()}`,
          amount: amount,
          timestamp: new Date(),
          transactionId: transactionId
        };
        
        // Update the donations state
        const updatedDonations = [...donations, newDonation];
        setDonations(updatedDonations);
        
        // Save to localStorage with proper serialization
        try {
          localStorage.setItem('donations', JSON.stringify(updatedDonations.map(d => ({
            ...d,
            timestamp: d.timestamp.toISOString() // Convert Date to ISO string for storage
          }))));
        } catch (err) {
          console.error('Error saving donations to localStorage:', err);
        }
        
        // Show explorer link in toast
        const explorerUrl = getExplorerUrl(transactionId, walletType);
        
        toast({
          title: "Donation Successful",
          description: (
            <div>
              <p>{`Thank you for your donation of $${amount.toFixed(2)} ${walletType === 'MetaMask' ? 'ETH' : 'USDC'}!`}</p>
              <a 
                href={explorerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gold-600 hover:text-gold-700 underline mt-2 inline-block"
              >
                View transaction
              </a>
            </div>
          ),
        });
        
        return transactionId;
      } else {
        toast({
          title: "Transaction Failed",
          description: "The transaction could not be processed. Please try again.",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error('Error sending donation:', error);
      toast({
        title: "Donation Failed",
        description: "Your donation could not be processed. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Update statistics when donations change
  const updateDonationStats = () => {
    if (donations.length > 0) {
      const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
      setTotalDonationAmount(total);
      
      // Calculate winning chance based on actual pool size (for production)
      // This should be fetched from the blockchain in a production app
      // This is a simplified example
      const currentPoolSize = 1250000; // This should be fetched from the contract in production
      const userContribution = total;
      const userEntries = userContribution * 100; // $1 = 100 entries (example)
      const totalEntries = currentPoolSize * 100;
      const chance = (userEntries / totalEntries) * 100;
      
      setWinningChance(chance);
    } else {
      setTotalDonationAmount(0);
      setWinningChance(0);
    }
  };

  return {
    donations,
    setDonations,
    totalDonationAmount,
    winningChance,
    sendDonation,
    updateDonationStats,
    isProcessing
  };
};
