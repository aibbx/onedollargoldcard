
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../../context/LanguageContext';

interface NavLinksProps {
  isScrolled: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isScrolled }) => {
  const { t } = useLanguage();

  return (
    <>
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
    </>
  );
};

export default NavLinks;
