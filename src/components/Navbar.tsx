
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { t } = useLanguage();
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
          <a href="#" className={cn(
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
          <a href="#" className={cn(
            'transition-all duration-200 hover:text-gold-600',
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          )}>
            {t('nav.faq')}
          </a>
          <a href="#" className={cn(
            'transition-all duration-200 hover:text-gold-600',
            isScrolled ? 'text-gray-800' : 'text-gray-800'
          )}>
            {t('nav.aboutUs')}
          </a>
          <LanguageSelector />
          <button className="btn-gold">
            {t('hero.donateButton')}
          </button>
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
            href="#" 
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
            href="#" 
            className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('nav.faq')}
          </a>
          <a 
            href="#" 
            className="block py-2 text-gray-800 hover:text-gold-600 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t('nav.aboutUs')}
          </a>
          <button className="btn-gold w-full mt-4">
            {t('hero.donateButton')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
