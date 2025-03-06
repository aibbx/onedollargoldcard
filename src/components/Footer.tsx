import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const text = "Amazing! I am in #OneDollarGoldCard on @solana to win $5M for the Gold Card application! Join now:";
    const url = "https://onedollargoldcard.com";
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/src/assets/gold-card.svg" alt="OneDollarGoldCard" className="h-8 w-auto" />
              <span className="font-bold text-xl">OneDollarGoldCard</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              A decentralized donation platform on Solana blockchain offering non-US citizens
              a chance to win enough to apply for the US Gold Card residency.
            </p>
            <p className="text-sm text-gray-500">
              {t('footer.disclaimer')}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gold-600 transition-all duration-200">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-600 hover:text-gold-600 transition-all duration-200">
                  {t('nav.howItWorks')}
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-gold-600 transition-all duration-200">
                  {t('nav.faq')}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gold-600 transition-all duration-200">
                  {t('nav.terms')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gold-600 transition-all duration-200">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gold-600 transition-all duration-200">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gold-600 transition-all duration-200">
                  {t('footer.contact')}
                </a>
              </li>
              <li className="pt-2">
                <div className="space-y-2 text-sm italic text-gray-600">
                  <p>{t('trump.support1')}</p>
                  <p>{t('trump.support2')}</p>
                  <p>{t('trump.support3')}</p>
                  <p>{t('trump.support4')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex justify-between flex-col md:flex-row items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} OneDollarGoldCard. {t('footer.rights')}
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gold-600 transition-all duration-200" onClick={(e) => {
              e.preventDefault();
              const text = `Join me in supporting OneDollarGoldCard! #OneDollarGoldCard`;
              const url = window.location.href;
              window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
            }}>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
              <span className="sr-only">Share on X</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
