
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation, Link } from 'react-router-dom';

interface NavLinksProps {
  isScrolled: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isScrolled }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <>
      <Link to="/" className={cn(
        'transition-all duration-200 hover:text-gold-600 relative',
        isScrolled ? 'text-gray-800' : 'text-gray-800',
        isActive('/') && 'font-medium text-gold-600'
      )}>
        {t('nav.home')}
        {isActive('/') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500 rounded-full"></span>}
      </Link>
      <a href="#how-it-works" className={cn(
        'transition-all duration-200 hover:text-gold-600',
        isScrolled ? 'text-gray-800' : 'text-gray-800'
      )}>
        {t('nav.howItWorks')}
      </a>
      <Link to="/faq" className={cn(
        'transition-all duration-200 hover:text-gold-600 relative',
        isScrolled ? 'text-gray-800' : 'text-gray-800',
        isActive('/faq') && 'font-medium text-gold-600'
      )}>
        {t('nav.faq')}
        {isActive('/faq') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500 rounded-full"></span>}
      </Link>
      <Link to="/terms" className={cn(
        'transition-all duration-200 hover:text-gold-600 relative',
        isScrolled ? 'text-gray-800' : 'text-gray-800',
        isActive('/terms') && 'font-medium text-gold-600'
      )}>
        {t('nav.terms')}
        {isActive('/terms') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-500 rounded-full"></span>}
      </Link>
    </>
  );
};

export default NavLinks;
