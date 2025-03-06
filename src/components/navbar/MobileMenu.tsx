
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { Wallet } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isWalletConnected: boolean;
  onDonateClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  onClose, 
  isWalletConnected, 
  onDonateClick 
}) => {
  const { t } = useLanguage();

  return (
    <div className={cn(
      'md:hidden bg-white absolute w-full left-0 right-0 shadow-md transition-all duration-300 ease-in-out overflow-hidden',
      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    )}>
      <div className="py-4 px-6 space-y-4">
        <a 
          href="/" 
          className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
          onClick={onClose}
        >
          {t('nav.home')}
        </a>
        <a 
          href="#how-it-works" 
          className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
          onClick={onClose}
        >
          {t('nav.howItWorks')}
        </a>
        <a 
          href="/faq" 
          className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
          onClick={onClose}
        >
          {t('nav.faq')}
        </a>
        <a 
          href="/terms" 
          className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
          onClick={onClose}
        >
          {t('nav.terms')}
        </a>
        <button 
          className="btn-gold w-full mt-4 flex items-center justify-center gap-2"
          onClick={onDonateClick}
        >
          {isWalletConnected ? t('hero.donateNow') : t('hero.donateButton')}
          {!isWalletConnected && <Wallet className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
