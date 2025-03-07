
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { DonationRecord, WalletType } from '../types/wallet';
import { generateTransactionHash, getExplorerUrl, CONTRACT_ADDRESSES } from '../utils/walletUtils';

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
            // For example, $1 might be 0.0004 ETH (at $2500/ETH) which would be 400000000000000 wei
            // This is just an example, in a real app you'd use proper conversion rates
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
            // Create Solana transaction (this is simplified - in a real app you'd build a proper transaction)
            const transaction = {
              feePayer: walletAddress,
              recentBlockhash: 'simulated_blockhash',
              instructions: [
                {
                  programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', // Token program ID
                  data: Buffer.from([]), // Would contain serialized instruction data
                  keys: [
                    { pubkey: walletAddress, isSigner: true, isWritable: true },
                    { pubkey: CONTRACT_ADDRESSES.poolAddress, isSigner: false, isWritable: true },
                    { pubkey: CONTRACT_ADDRESSES.feeAddress, isSigner: false, isWritable: true }
                  ]
                }
              ]
            };

            console.log("Requesting signature from wallet...");
            
            // This should trigger the wallet popup
            const signedTx = await provider.request({
              method: 'signTransaction',
              params: { message: transaction }
            });
            
            console.log("Transaction signed successfully!", signedTx);
            
            // In a real app, you'd send the transaction to the network here
            // await provider.request({ method: 'sendTransaction', params: { signedTransaction: signedTx } });
            
            // For our demo, we'll simulate a successful transaction
            transactionId = generateTransactionHash('solana');
            console.log("Transaction ID:", transactionId);
          } 
          else if (walletType === 'Solflare' && provider.signTransaction) {
            console.log("Requesting Solflare wallet to sign transaction...");
            // Similar process for Solflare
            // This would use provider.signTransaction() in a real implementation
            
            // Simulate user signing
            await new Promise(resolve => setTimeout(resolve, 1000));
            transactionId = generateTransactionHash('solana');
          }
          else if (walletType === 'OKX' && provider.signTransaction) {
            console.log("Requesting OKX wallet to sign transaction...");
            // Similar process for OKX
            // This would use provider.signTransaction() in a real implementation
            
            // Simulate user signing
            await new Promise(resolve => setTimeout(resolve, 1000));
            transactionId = generateTransactionHash('solana');
          }
          else {
            console.log("Simulating transaction for wallet type:", walletType);
            // If we reach here, we'll simulate a transaction for demo purposes
            await new Promise(resolve => setTimeout(resolve, 1500));
            transactionId = generateTransactionHash(walletType === 'MetaMask' ? 'ethereum' : 'solana');
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
        console.warn("No provider available, simulating transaction");
        // Simulate network delay for demo purposes
        await new Promise(resolve => setTimeout(resolve, 1500));
        transactionId = generateTransactionHash(walletType === 'MetaMask' ? 'ethereum' : 'solana');
      }
      
      // Create a donation record with realistic data
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
      
      // Calculate winning chance based on total pool size and user contribution
      // This simulates a real lottery mechanism where each dollar is one entry
      const totalPoolSize = 1250000; // Total pool size in USD
      const userContribution = total;
      const userEntries = userContribution * 100; // $1 = 100 entries
      const totalEntries = totalPoolSize * 100;
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
