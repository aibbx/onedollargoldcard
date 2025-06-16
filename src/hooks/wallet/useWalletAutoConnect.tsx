
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { WalletType } from '../../types/wallet';
import { autoConnectWallet } from '../../utils/wallet-connectors';

interface UseWalletAutoConnectProps {
  setIsWalletConnected: (connected: boolean) => void;
  setWalletType: (type: WalletType) => void;
  setWalletAddress: (address: string) => void;
  loadUserDonations: () => void;
  loadUserStats: () => void;
}

export const useWalletAutoConnect = ({
  setIsWalletConnected,
  setWalletType,
  setWalletAddress,
  loadUserDonations,
  loadUserStats
}: UseWalletAutoConnectProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const attemptAutoConnect = async () => {
      try {
        // Check if we have stored wallet connection info
        const savedWalletType = localStorage.getItem('walletType') as WalletType;
        const savedWalletAddress = localStorage.getItem('walletAddress');
        
        // Check for pending mobile connection
        const pendingMobileConnection = localStorage.getItem('pendingMobileConnection') as WalletType;
        const mobileConnectionTimestamp = localStorage.getItem('mobileConnectionTimestamp');
        
        // If there's a pending mobile connection that's recent (within 5 minutes), try to connect
        if (pendingMobileConnection && mobileConnectionTimestamp) {
          const timeDiff = Date.now() - parseInt(mobileConnectionTimestamp);
          const fiveMinutes = 5 * 60 * 1000;
          
          if (timeDiff < fiveMinutes) {
            console.log('检测到待处理的移动端连接，尝试自动连接:', pendingMobileConnection);
            
            try {
              const result = await autoConnectWallet(pendingMobileConnection);
              if (result) {
                console.log('移动端自动连接成功');
                setIsWalletConnected(true);
                setWalletType(pendingMobileConnection);
                setWalletAddress(result.address);
                
                // Update stored connection info
                localStorage.setItem('walletType', pendingMobileConnection);
                localStorage.setItem('walletAddress', result.address);
                localStorage.setItem('walletConnected', 'true');
                
                // Clear pending connection flags
                localStorage.removeItem('pendingMobileConnection');
                localStorage.removeItem('mobileConnectionTimestamp');
                
                // Load user data
                loadUserDonations();
                loadUserStats();
                
                // Show success message
                toast({
                  title: "钱包连接成功！",
                  description: `您的 ${pendingMobileConnection} 钱包已成功连接。`,
                });
                
                return;
              }
            } catch (error) {
              console.error('移动端自动连接失败:', error);
              // Clear failed pending connection
              localStorage.removeItem('pendingMobileConnection');
              localStorage.removeItem('mobileConnectionTimestamp');
            }
          } else {
            // Clear old pending connection
            localStorage.removeItem('pendingMobileConnection');
            localStorage.removeItem('mobileConnectionTimestamp');
          }
        }
        
        // Regular auto-connect logic
        if (savedWalletType && savedWalletAddress) {
          console.log('尝试自动连接已保存的钱包:', savedWalletType);
          
          const result = await autoConnectWallet(savedWalletType);
          if (result && result.address === savedWalletAddress) {
            console.log('自动连接成功');
            setIsWalletConnected(true);
            setWalletType(savedWalletType);
            setWalletAddress(result.address);
            localStorage.setItem('walletConnected', 'true');
            
            // Load user data
            loadUserDonations();
            loadUserStats();
          } else {
            console.log('自动连接失败或地址不匹配，清除保存的连接信息');
            localStorage.removeItem('walletType');
            localStorage.removeItem('walletAddress');
            localStorage.removeItem('walletConnected');
          }
        }
      } catch (error) {
        console.error('自动连接过程中出错:', error);
      }
    };

    // Small delay to ensure wallet extensions are loaded
    const timer = setTimeout(attemptAutoConnect, 1000);
    
    // Also attempt connection when page becomes visible (mobile app switch)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('页面重新获得焦点，检查钱包连接状态');
        setTimeout(attemptAutoConnect, 500);
      }
    };
    
    // Listen for page visibility changes (important for mobile app switching)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Listen for window focus events
    const handleFocus = () => {
      console.log('窗口重新获得焦点，检查钱包连接状态');
      setTimeout(attemptAutoConnect, 500);
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [setIsWalletConnected, setWalletType, setWalletAddress, loadUserDonations, loadUserStats, toast]);
};
