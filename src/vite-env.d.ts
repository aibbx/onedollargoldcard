
/// <reference types="vite/client" />

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isOKExWallet?: boolean;
      isOkxWallet?: boolean;
      isBinance?: boolean;
      providers?: any[];
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      selectedAddress?: string;
      networkVersion?: string;
      chainId?: string;
    };
    okxwallet?: {
      ethereum?: {
        isOKExWallet?: boolean;
        request: (args: { method: string; params?: any[] }) => Promise<any>;
        selectedAddress?: string;
      };
    };
    okx?: {
      ethereum?: {
        isOKExWallet?: boolean;
        request: (args: { method: string; params?: any[] }) => Promise<any>;
        selectedAddress?: string;
      };
    };
    BinanceChain?: {
      isBinance?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      selectedAddress?: string;
    };
    bitkeep?: {
      ethereum?: {
        request: (args: { method: string; params?: any[] }) => Promise<any>;
        selectedAddress?: string;
      };
    };
    Buffer: typeof Buffer;
  }
}

export {};
