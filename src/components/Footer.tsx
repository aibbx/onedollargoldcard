import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { Github, ExternalLink, Home, HelpCircle, FileText, MessageCircle, Sparkle, X } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const text = "Amazing! I am in #OneDollarGoldCard on @solana to win $5M for the Gold Card application! Join now:";
    const url = "https://onedollargoldcard.com";
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://x.com/OneDollarGold', '_blank');
  };

  const navigateToTop = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleScrollToSection = (sectionId: string) => {
    // Navigate to home page if not already there
    if (window.location.pathname !== '/') {
      navigate('/');
      // Add a small delay to ensure navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      // If already on home page, scroll directly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-custom">
        {/* Trump Quote Card */}
        <div className="mb-12 bg-white rounded-xl p-8 shadow-sm border border-gold-100">
          <div className="flex items-start">
            <div className="text-gold-500 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Gold Card Initiative by President Trump</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-gray-700 italic">{t('trump.support1')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-gray-700 italic">{t('trump.support2')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-gray-700 italic">{t('trump.support3')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-gray-700 italic">{t('trump.support4')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/gold-card.svg" alt="OneDollarGoldCard" className="h-8 w-auto" />
              <span className="font-bold text-xl">OneDollarGoldCard</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              A decentralized donation platform on Solana blockchain offering non-US citizens
              a chance to win enough to apply for the US Gold Card residency.
            </p>
            <div className="p-4 bg-gold-50 border-l-4 border-gold-400 rounded-r-md">
              <p className="text-sm text-gray-700 font-medium">
                {t('footer.disclaimer')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => navigateToTop('/')}
                className="flex items-center px-4 py-3 bg-white hover:bg-gold-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gold-200 group text-left"
              >
                <Home className="w-4 h-4 mr-2 text-gold-500" />
                <span className="text-gray-700 group-hover:text-gold-600 font-medium">{t('nav.home')}</span>
              </button>
              
              <button 
                onClick={() => navigateToTop('/how-it-works')}
                className="flex items-center justify-start px-4 py-3 bg-white hover:bg-gold-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gold-200 text-left group"
              >
                <Sparkle className="w-4 h-4 mr-2 text-gold-500" />
                <span className="text-gray-700 group-hover:text-gold-600 font-medium">{t('nav.howItWorks')}</span>
              </button>
              
              <button 
                onClick={() => navigateToTop('/faq')}
                className="flex items-center px-4 py-3 bg-white hover:bg-gold-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gold-200 group text-left"
              >
                <HelpCircle className="w-4 h-4 mr-2 text-gold-500" />
                <span className="text-gray-700 group-hover:text-gold-600 font-medium">{t('nav.faq')}</span>
              </button>
              
              <a 
                href="#" 
                onClick={handleContactClick}
                className="flex items-center px-4 py-3 bg-white hover:bg-gold-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gold-200 group"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-gold-500" />
                <span className="text-gray-700 group-hover:text-gold-600 font-medium">{t('footer.contact')}</span>
                <ExternalLink className="ml-1 w-3 h-3 text-gray-400 group-hover:text-gold-500" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex justify-between flex-col md:flex-row items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} OneDollarGoldCard. {t('footer.rights')}
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/aibbx/onedollargoldcard.git" className="text-gray-500 hover:text-gold-600 transition-all duration-200" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gold-600 transition-all duration-200" onClick={handleShare}>
              <X className="h-5 w-5" />
              <span className="sr-only">Share on X</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
