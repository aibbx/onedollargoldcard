
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import WalletConnector from './navbar/WalletConnector';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

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
    // Close the mobile menu
    setIsMobileMenuOpen(false);
    
    // Handle wallet or donation section navigation
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-custom mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <img src="/src/assets/gold-card.svg" alt="OneDollarGoldCard" className="h-8 w-auto" />
            <span className={cn(
              'font-bold text-xl',
              isScrolled ? 'text-black' : 'text-black'
            )}>
              OneDollarGoldCard
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="/" className={cn(
            'transition-all duration-200 hover:text-gold-600',
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          )}>
            {t('nav.home')}
          </a>
          <a href="#how-it-works" className={cn(
            'transition-all duration-200 hover:text-gold-600',
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          )}>
            {t('nav.howItWorks')}
          </a>
          <a href="/faq" className={cn(
            'transition-all duration-200 hover:text-gold-600',
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          )}>
            {t('nav.faq')}
          </a>
          <a href="/terms" className={cn(
            'transition-all duration-200 hover:text-gold-600',
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          )}>
            {t('nav.terms')}
          </a>
          <LanguageSelector />
          <WalletConnector 
            isWalletConnected={isWalletConnected}
            setIsWalletConnected={setIsWalletConnected}
          />
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
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
