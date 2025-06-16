
import { useState, useEffect } from 'react';
import { WalletDetectionResult } from '../types/wallet';

export const useWalletDetection = () => {
  const [availableWallets, setAvailableWallets] = useState<WalletDetectionResult>({
    metamask: false,
    okx: false,
    binance: false,
    bitget: false
  });

  useEffect(() => {
    const detectWallets = () => {
      console.log('开始检测钱包...');
      
      const detection: WalletDetectionResult = {
        metamask: false,
        okx: false,
        binance: false,
        bitget: false
      };

      // 检测 MetaMask
      if (typeof window !== 'undefined' && window.ethereum) {
        if (window.ethereum.isMetaMask) {
          detection.metamask = true;
          console.log('检测到 MetaMask 钱包');
        }
      }

      // 检测 OKX
      if (typeof window !== 'undefined' && window.okxwallet && window.okxwallet.ethereum) {
        detection.okx = true;
        console.log('检测到 OKX 钱包');
      }

      // 检测 Binance
      if (typeof window !== 'undefined' && window.BinanceChain) {
        if (window.BinanceChain.isBinance) {
          detection.binance = true;
          console.log('检测到 Binance 钱包');
        }
      }

      // 检测 Bitget
      if (typeof window !== 'undefined' && window.bitkeep && window.bitkeep.ethereum) {
        detection.bitget = true;
        console.log('检测到 Bitget 钱包');
      }

      console.log('钱包检测结果:', detection);
      setAvailableWallets(detection);
    };

    // 初始检测
    detectWallets();

    // 延迟检测以确保浏览器扩展完全加载
    const timeouts = [
      setTimeout(detectWallets, 100),
      setTimeout(detectWallets, 500),
      setTimeout(detectWallets, 1000),
      setTimeout(detectWallets, 2000)
    ];

    // 监听窗口加载事件
    const handleLoad = () => {
      setTimeout(detectWallets, 500);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
      }
    };
  }, []);

  return { availableWallets };
};
