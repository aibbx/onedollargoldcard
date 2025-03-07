
import { toast } from "@/hooks/use-toast";

// Function to handle OKX transaction errors
export const handleTransactionError = (error: any): never => {
  console.error('OKX transaction error:', error);
  
  // More helpful error messages
  if (error.message && error.message.includes('insufficient funds')) {
    toast({
      title: "Insufficient Funds",
      description: "Insufficient USDC balance for this transaction. Please add more USDC to your wallet.",
      variant: "destructive",
    });
    throw new Error('Insufficient USDC balance for this transaction. Please add more USDC to your wallet.');
  } else if (error.message && error.message.includes('Blockhash not found')) {
    toast({
      title: "Transaction Timeout",
      description: "Transaction took too long to confirm. Please try again.",
      variant: "destructive",
    });
    throw new Error('Transaction took too long to confirm. Please try again.');
  } else if (error.message && error.message.includes('User rejected')) {
    toast({
      title: "Transaction Cancelled",
      description: "You cancelled the transaction in your wallet.",
      variant: "destructive",
    });
    throw new Error('Transaction was cancelled by the user');
  }
  
  toast({
    title: "Transaction Failed",
    description: `OKX transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    variant: "destructive",
  });
  
  throw new Error(`OKX transaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
};
