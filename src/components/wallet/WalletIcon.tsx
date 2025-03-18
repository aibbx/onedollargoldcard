
import React from 'react';
import { WalletType } from '../../types/wallet';

interface WalletIconProps {
  walletType: WalletType | null;
  className?: string;
}

const WalletIcon: React.FC<WalletIconProps> = ({ walletType, className = "w-12 h-12" }) => {
  switch (walletType) {
    case 'MetaMask':
      return (
        <div className={className}>
          <svg width="100%" height="100%" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.9582 1L19.8241 10.7183L22.2103 5.12254L32.9582 1Z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.02795 1L15.0585 10.809L12.7758 5.12254L2.02795 1Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M28.2891 23.5363L24.8486 28.7886L32.2505 30.7966L34.3983 23.6731L28.2891 23.5363Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M0.61682 23.6731L2.7494 30.7966L10.1513 28.7886L6.71082 23.5363L0.61682 23.6731Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.77042 14.8081L7.70782 17.8972L15.0585 18.2076L14.8094 10.354L9.77042 14.8081Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25.2149 14.8081L20.1149 10.2631L19.8242 18.2076L27.1749 17.8972L25.2149 14.8081Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.1514 28.7886L14.6177 26.6438L10.7733 23.7186L10.1514 28.7886Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.3677 26.6438L24.8488 28.7886L24.2122 23.7186L20.3677 26.6438Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.8488 28.7884L20.3677 26.6436L20.7124 29.3931L20.6868 30.7053L24.8488 28.7884Z" fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.1514 28.7884L14.3133 30.7053L14.2878 29.3931L14.6177 26.6436L10.1514 28.7884Z" fill="#D7C1B3" stroke="#D7C1B3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.3899 21.9735L10.6698 20.9067L13.3338 19.7313L14.3899 21.9735Z" fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.5957 21.9735L21.6517 19.7313L24.3309 20.9067L20.5957 21.9735Z" fill="#233447" stroke="#233447" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.1513 28.7886L10.7986 23.5363L6.71082 23.6731L10.1513 28.7886Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.2014 23.5363L24.8487 28.7886L28.2892 23.6731L24.2014 23.5363Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M27.1749 17.897L19.8242 18.2075L20.6113 21.9734L21.6673 19.7312L24.3465 20.9066L27.1749 17.897Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.6698 20.9066L13.349 19.7312L14.39 21.9734L15.1922 18.2075L7.70782 17.897L10.6698 20.9066Z" fill="#CD6116" stroke="#CD6116" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.70776 17.897L10.7732 23.7187L10.6698 20.9066L7.70776 17.897Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24.3464 20.9066L24.2122 23.7187L27.1748 17.897L24.3464 20.9066Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.1921 18.2075L14.3899 21.9735L15.3679 26.0132L15.6841 20.4594L15.1921 18.2075Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.8241 18.2075L19.3472 20.4448L19.6175 26.0132L20.6112 21.9735L19.8241 18.2075Z" fill="#E4751F" stroke="#E4751F" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.6112 21.9735L19.6175 26.0133L20.3677 26.6437L24.2122 23.7186L24.3464 20.9065L20.6112 21.9735Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.6698 20.9065L10.7732 23.7186L14.6176 26.6437L15.3678 26.0133L14.3898 21.9735L10.6698 20.9065Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.6868 30.7054L20.7124 29.3932L20.3933 29.1096H14.5921L14.2878 29.3932L14.3133 30.7054L10.1514 28.7885L11.4422 29.8553L14.5665 32H20.419L23.5585 29.8553L24.8493 28.7885L20.6868 30.7054Z" fill="#C0AD9E" stroke="#C0AD9E" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.3677 26.6438L19.6175 26.0134H15.3678L14.6177 26.6438L14.2878 29.3932L14.5921 29.1097H20.3933L20.7125 29.3932L20.3677 26.6438Z" fill="#161616" stroke="#161616" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M33.548 11.3487L34.6807 6.15674L32.9582 1L20.3677 10.4348L25.2149 14.8082L32.0374 16.6793L33.5736 14.9568L32.9261 14.4903L33.9822 13.5439L33.1799 12.9406L34.236 12.1383L33.548 11.3487Z" fill="#763D16" stroke="#763D16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M0.319336 6.15674L1.45208 11.3487L0.74927 12.1383L1.80533 12.9406L1.01784 13.5439L2.07391 14.4903L1.4264 14.9568L2.94717 16.6793L9.76974 14.8082L14.6169 10.4348L2.02645 1L0.319336 6.15674Z" fill="#763D16" stroke="#763D16" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32.0374 16.6792L25.2148 14.8081L27.1748 17.8971L24.2122 23.7187L28.2744 23.6731H34.3983L32.0374 16.6792Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.76964 14.8081L2.94707 16.6792L0.61682 23.6731H6.71082L10.7731 23.7187L7.81044 17.8971L9.76964 14.8081Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.8241 18.2076L20.3676 10.4348L22.2254 5.12256H12.7758L14.6177 10.4348L15.1922 18.2076L15.3521 20.474L15.3678 26.0133H19.6175L19.6484 20.474L19.8241 18.2076Z" fill="#F6851B" stroke="#F6851B" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      );
    case 'OKX':
      return (
        <div className={className}>
          <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="#1C1C1C"/>
            <rect x="8" y="8" width="10" height="10" rx="1" fill="white"/>
            <rect x="22" y="8" width="10" height="10" rx="1" fill="white"/>
            <rect x="8" y="22" width="10" height="10" rx="1" fill="white"/>
            <rect x="22" y="22" width="10" height="10" rx="1" fill="white"/>
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default WalletIcon;
