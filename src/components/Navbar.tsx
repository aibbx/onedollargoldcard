
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import WalletConnector from './navbar/WalletConnector';
import MobileMenu from './navbar/MobileMenu';
import NavLinks from './navbar/NavLinks';
import { useWallet } from '../context/WalletContext';

const Navbar = () => {
  const { t } = useLanguage();
  const { isWalletConnected } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuDonateClick = () => {
    setIsMobileMenuOpen(false);
    
    if (isWalletConnected) {
      const donationSection = document.getElementById('donation-section');
      if (donationSection) {
        donationSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <img src="/gold-card.svg" alt="OneDollarGoldCard" className="h-8 w-auto" />
            <span className={cn(
              'font-bold text-xl',
              isScrolled ? 'text-black' : 'text-black'
            )}>
              OneDollarGoldCard
            </span>
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLinks isScrolled={isScrolled} />
          <LanguageSelector />
          <WalletConnector />
        </div>

        <div className="md:hidden flex items-center">
          <LanguageSelector />
          <button 
            onClick={toggleMobileMenu} 
            className="ml-2 p-2 text-gold-600 hover:text-gold-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isWalletConnected={isWalletConnected}
        onDonateClick={handleMobileMenuDonateClick}
      />
    </nav>
  );
};

export default Navbar;
