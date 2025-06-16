
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

      if (typeof window === 'undefined') {
        console.log('服务端环境，跳过钱包检测');
        return;
      }

      // 检测 MetaMask - 更严格的检测
      try {
        if (window.ethereum) {
          // 检查多个可能的 MetaMask 标识
          const isMetaMask = window.ethereum.isMetaMask || 
                           (window.ethereum.providers && 
                            window.ethereum.providers.some((p: any) => p.isMetaMask));
          
          if (isMetaMask) {
            detection.metamask = true;
            console.log('✅ 检测到 MetaMask 钱包');
          }
        }
      } catch (error) {
        console.warn('MetaMask 检测出错:', error);
      }

      // 检测 OKX - 改进检测逻辑
      try {
        // OKX 钱包可能以多种方式注入
        const hasOkxWallet = window.okxwallet?.ethereum;
        const hasOkx = window.okx;
        const hasOKXProvider = window.ethereum?.isOKExWallet;
        
        // 检查多个可能的 OKX 注入方式
        if (hasOkxWallet || hasOkx || hasOKXProvider) {
          detection.okx = true;
          console.log('✅ 检测到 OKX 钱包');
          console.log('OKX 检测详情:', {
            okxwallet: !!window.okxwallet,
            okxwalletEthereum: !!window.okxwallet?.ethereum,
            okx: !!window.okx,
            isOKExWallet: !!window.ethereum?.isOKExWallet
          });
        } else {
          console.log('❌ 未检测到 OKX 钱包');
          console.log('OKX 检测详情:', {
            okxwallet: !!window.okxwallet,
            okxwalletEthereum: !!window.okxwallet?.ethereum,
            okx: !!window.okx,
            isOKExWallet: !!window.ethereum?.isOKExWallet,
            windowKeys: Object.keys(window).filter(key => key.toLowerCase().includes('okx'))
          });
        }
      } catch (error) {
        console.warn('OKX 检测出错:', error);
      }

      // 检测 Binance - 改进检测逻辑
      try {
        const hasBinanceChain = window.BinanceChain;
        const isBinance = window.BinanceChain?.isBinance;
        
        if (hasBinanceChain && isBinance) {
          detection.binance = true;
          console.log('✅ 检测到 Binance 钱包');
        } else {
          console.log('❌ 未检测到 Binance 钱包');
          console.log('Binance 检测详情:', {
            BinanceChain: !!window.BinanceChain,
            isBinance: !!window.BinanceChain?.isBinance
          });
        }
      } catch (error) {
        console.warn('Binance 检测出错:', error);
      }

      // 检测 Bitget
      try {
        if (window.bitkeep?.ethereum) {
          detection.bitget = true;
          console.log('✅ 检测到 Bitget 钱包');
        }
      } catch (error) {
        console.warn('Bitget 检测出错:', error);
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
      setTimeout(detectWallets, 3000),
      setTimeout(detectWallets, 5000) // 增加一个更长的延迟
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

    // 监听扩展注入事件（某些钱包会触发这个事件）
    const handleEthereumProviderChange = () => {
      console.log('以太坊提供者变化，重新检测钱包...');
      setTimeout(detectWallets, 100);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('load', handleLoad);
      window.addEventListener('ethereum#initialized', handleEthereumProviderChange);
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
      }
      
      // 监听钱包扩展可能触发的事件
      window.addEventListener('okxwallet#initialized', handleEthereumProviderChange);
    }

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleLoad);
        window.removeEventListener('ethereum#initialized', handleEthereumProviderChange);
        window.removeEventListener('okxwallet#initialized', handleEthereumProviderChange);
        document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      }
    };
  }, []);

  return { availableWallets };
};
