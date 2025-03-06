
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { cn } from '@/lib/utils';
import { Menu, X, Wallet } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
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

  const connectWallet = (type: string) => {
    // Mock wallet connection
    setTimeout(() => {
      setIsWalletConnected(true);
      setShowWalletOptions(false);
      toast({
        title: "Wallet Connected",
        description: `Your ${type} wallet has been connected successfully.`,
      });
    }, 1000);
  };

  const handleDonateClick = () => {
    if (isWalletConnected) {
      // If wallet is connected, scroll to donation section
      const donationSection = document.getElementById('donation-section');
      if (donationSection) {
        donationSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If wallet is not connected, show wallet options
      setShowWalletOptions(!showWalletOptions);
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
          <div className="relative">
            <button 
              className="btn-gold flex items-center gap-2"
              onClick={handleDonateClick}
            >
              {isWalletConnected ? t('hero.donateNow') : t('hero.donateButton')}
              {!isWalletConnected && <Wallet className="w-4 h-4" />}
            </button>

            {/* Wallet options dropdown */}
            {showWalletOptions && !isWalletConnected && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-100">
                  Select Wallet
                </div>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
                  onClick={() => connectWallet('Phantom')}
                >
                  <img src="/wallet-icons/phantom-icon.svg" alt="Phantom" className="w-5 h-5 mr-3" />
                  Phantom
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
                  onClick={() => connectWallet('Solflare')}
                >
                  <img src="/wallet-icons/solflare-icon.svg" alt="Solflare" className="w-5 h-5 mr-3" />
                  Solflare
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
                  onClick={() => connectWallet('OKX')}
                >
                  <img src="/wallet-icons/okx-icon.svg" alt="OKX" className="w-5 h-5 mr-3" />
                  OKX Wallet
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gold-50"
                  onClick={() => connectWallet('MetaMask')}
                >
                  <img src="/wallet-icons/metamask-icon.svg" alt="MetaMask" className="w-5 h-5 mr-3" />
                  MetaMask
                </button>
              </div>
            )}
          </div>
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
      <div className={cn(
        'md:hidden bg-white absolute w-full left-0 right-0 shadow-md transition-all duration-300 ease-in-out overflow-hidden',
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="py-4 px-6 space-y-4">
          <a 
            href="/" 
            className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('nav.home')}
          </a>
          <a 
            href="#how-it-works" 
            className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('nav.howItWorks')}
          </a>
          <a 
            href="/faq" 
            className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('nav.faq')}
          </a>
          <a 
            href="/terms" 
            className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('nav.terms')}
          </a>
          <button 
            className="btn-gold w-full mt-4 flex items-center justify-center gap-2"
            onClick={handleDonateClick}
          >
            {isWalletConnected ? t('hero.donateNow') : t('hero.donateButton')}
            {!isWalletConnected && <Wallet className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
