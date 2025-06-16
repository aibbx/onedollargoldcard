
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { cn } from '@/lib/utils';
import { Menu, X, Shield } from 'lucide-react';
import WalletConnector from './navbar/WalletConnector';
import MobileMenu from './navbar/MobileMenu';
import NavLinks from './navbar/NavLinks';
import { useWallet } from '../context/WalletContext';
import Logo from './Logo';

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
          ? 'bg-blue-900/95 backdrop-blur-md shadow-lg py-3 border-b border-blue-700'
          : 'bg-blue-900/80 backdrop-blur-sm py-4'
      )}
    >
      {/* Top banner */}
      <div className="w-full h-1 bg-gradient-to-r from-red-600 via-white via-red-600 via-white to-red-600"></div>
      
      <div className="container-custom mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-3">
            <Logo size="md" />
            <div>
              <span className="font-bold text-xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
                OneDollarGoldCard
              </span>
              <div className="text-gold-400 text-xs font-semibold uppercase tracking-wider -mt-1">
                Fully On-Chain
              </div>
            </div>
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLinks isScrolled={true} />
          <WalletConnector />
          <LanguageSelector />
          <div className="flex items-center gap-2 bg-green-500/20 border border-green-400 rounded-full px-3 py-1">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-xs font-semibold uppercase tracking-wide">Secure</span>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <LanguageSelector />
          <button 
            onClick={toggleMobileMenu} 
            className="ml-2 p-2 text-gold-400 hover:text-gold-300 transition-colors"
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
