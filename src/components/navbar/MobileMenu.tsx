
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { Wallet } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleSectionNavigation = (sectionId: string) => {
    // If we're not on the homepage, navigate there first
    if (currentPath !== '/') {
      navigate('/', { state: { scrollToSection: sectionId } });
    } else {
      // If already on homepage, just scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClose(); // Close the mobile menu after navigation
  };

  return (
    <div className={cn(
      'md:hidden bg-white absolute w-full left-0 right-0 shadow-md transition-all duration-300 ease-in-out overflow-hidden',
      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
    )}>
      <div className="py-4 px-6 space-y-4">
        <Link 
          to="/"
          className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
          onClick={onClose}
        >
          {t('nav.home')}
        </Link>
        <Link 
          to="/how-it-works"
          className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
          onClick={onClose}
        >
          {t('nav.howItWorks')}
        </Link>
        <Link 
          to="/faq"
          className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
          onClick={onClose}
        >
          {t('nav.faq')}
        </Link>
        <Link 
          to="/terms"
          className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
          onClick={onClose}
        >
          {t('nav.terms')}
        </Link>
        <button 
          className="btn-gold w-full mt-4 flex items-center justify-center gap-2"
          onClick={onDonateClick}
        >
          {isWalletConnected ? t('hero.donateNow') : "Connect Wallet"}
          {!isWalletConnected && <Wallet className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
