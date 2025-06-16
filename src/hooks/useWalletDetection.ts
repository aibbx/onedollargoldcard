
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
      console.log('开始检测可用钱包...');
      
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
          console.log('✅ 检测到 MetaMask 钱包');
        }
      }

      // 检测 OKX
      if (typeof window !== 'undefined' && window.okxwallet && window.okxwallet.ethereum) {
        detection.okx = true;
        console.log('✅ 检测到 OKX 钱包');
      }

      // 检测 Binance
      if (typeof window !== 'undefined' && window.BinanceChain) {
        if (window.BinanceChain.isBinance) {
          detection.binance = true;
          console.log('✅ 检测到 Binance 钱包');
        }
      }

      // 检测 Bitget
      if (typeof window !== 'undefined' && window.bitkeep && window.bitkeep.ethereum) {
        detection.bitget = true;
        console.log('✅ 检测到 Bitget 钱包');
      }

      console.log('钱包检测完成，结果:', detection);
      setAvailableWallets(detection);
    };

    // 立即检测一次
    detectWallets();

    // 设置多个延迟检测，确保浏览器扩展完全加载
    const timeouts = [
      setTimeout(detectWallets, 500),
      setTimeout(detectWallets, 1000),
      setTimeout(detectWallets, 2000),
      setTimeout(detectWallets, 3000)
    ];

    // 监听窗口加载事件
    const handleLoad = () => {
      console.log('窗口加载完成，重新检测钱包...');
      setTimeout(detectWallets, 1000);
    };

    // 监听 DOM 内容加载完成
    const handleDOMContentLoaded = () => {
      console.log('DOM 加载完成，重新检测钱包...');
      setTimeout(detectWallets, 500);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('load', handleLoad);
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
      }
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
        document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      }
    };
  }, []);

  return { availableWallets };
};
