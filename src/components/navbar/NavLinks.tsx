
import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation, Link, useNavigate } from 'react-router-dom';

interface NavLinksProps {
  isScrolled: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ isScrolled }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

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
  };

  return (
    <>
      <Link to="/" className={cn(
        'transition-all duration-200 hover:text-gold-300 relative font-medium',
        'text-white hover:text-gold-300',
        isActive('/') && 'text-gold-400'
      )}>
        {t('nav.home')}
        {isActive('/') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-400 rounded-full"></span>}
      </Link>
      <Link to="/faq" className={cn(
        'transition-all duration-200 hover:text-gold-300 relative font-medium',
        'text-white hover:text-gold-300',
        isActive('/faq') && 'text-gold-400'
      )}>
        {t('nav.faq')}
        {isActive('/faq') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-400 rounded-full"></span>}
      </Link>
      <Link to="/terms" className={cn(
        'transition-all duration-200 hover:text-gold-300 relative font-medium',
        'text-white hover:text-gold-300',
        isActive('/terms') && 'text-gold-400'
      )}>
        {t('nav.terms')}
        {isActive('/terms') && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-400 rounded-full"></span>}
      </Link>
    </>
  );
};

export default NavLinks;
