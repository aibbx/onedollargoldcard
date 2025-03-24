
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Share2, Sparkles, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Hero = () => {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const safeguardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      { ref: titleRef, delay: 0 },
      { ref: subtitleRef, delay: 2 },
      { ref: descRef, delay: 4 },
      { ref: buttonsRef, delay: 6 },
      { ref: safeguardRef, delay: 8 },
    ];

    elements.forEach(({ ref, delay }) => {
      if (ref.current) {
        ref.current.style.setProperty('--delay', String(delay));
        ref.current.classList.add('slide-up');
      }
    });
  }, []);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const text = `Amazing! I am in #OneDollarGoldCard on #BSC to win $5M for the Gold Card application! Join now:`;
    const url = "https://onedollargoldcard.com/";
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleDonateClick = () => {
    scrollToDonationSection();
  };
  
  const scrollToDonationSection = () => {
    const donationSection = document.getElementById('donation-section');
    if (donationSection) {
      donationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OneDollarGoldCard",
    "url": "https://onedollargoldcard.com",
    "logo": "https://onedollargoldcard.com/gold-card.svg",
    "description": "A decentralized donation platform offering non-US citizens a chance to win enough to apply for the US Gold Card residency.",
    "sameAs": [
      "https://onedollargoldcard.xyz",
      "https://1dollargoldcard.com",
      "https://1dollargoldcard.xyz"
    ]
  };

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Gold Card Opportunity",
    "description": "An opportunity to win $5 million for applying to the Gold Card program introduced by President Trump.",
    "offers": {
      "@type": "Offer",
      "price": "1.05",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <Helmet>
        <link rel="canonical" href="https://onedollargoldcard.com" />
        <link rel="alternate" href="https://onedollargoldcard.com" hrefLang="x-default" />
        <link rel="alternate" href="https://onedollargoldcard.com" hrefLang="en" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(productData)}
        </script>
      </Helmet>
      
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gold-50 to-white opacity-70"></div>
      
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute w-72 h-72 rounded-full bg-gold-200 opacity-20 blur-3xl -top-20 -left-20 animate-float"></div>
        <div className="absolute w-64 h-64 rounded-full bg-gold-300 opacity-10 blur-2xl top-1/4 right-10 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-80 h-80 rounded-full bg-gold-200 opacity-10 blur-3xl bottom-10 left-1/4 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-custom relative z-10 text-center px-4 py-24 md:py-32">
        <h1 
          ref={titleRef}
          className="heading-xl mb-4 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600"
        >
          One Dollar, One Dream
        </h1>
        
        <div 
          ref={subtitleRef}
          className="mb-6 max-w-3xl mx-auto"
        >
          <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 uppercase tracking-wide">
            Your Path to American Greatness
          </h3>
        </div>
        
        <p 
          ref={descRef}
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          {t('hero.description')}
        </p>
        
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            className="btn-gold min-w-[180px] flex items-center justify-center gap-2 relative overflow-hidden group"
            onClick={handleDonateClick}
            aria-label="Donate now for a chance to win the Gold Card opportunity"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
            
            <Sparkles className="w-5 h-5 text-gray-800" />
            <span className="relative z-10">{t('hero.donateButton')}</span>
          </button>
          <button 
            onClick={handleShare}
            className="btn-outline min-w-[180px] flex items-center justify-center gap-2"
            aria-label="Share this opportunity on X (Twitter)"
          >
            <Share2 className="w-4 h-4" />
            Share on X
          </button>
        </div>
        
        <div
          ref={safeguardRef}
          className="mt-8 max-w-2xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gold-200 rounded-xl p-4 shadow-lg animate-pulse">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <h4 className="text-lg font-bold text-purple-800">7-Day Inactivity Safeguard Contract</h4>
            </div>
            <p className="text-sm text-gray-700">
              Our unique backup mechanism ensures funds are never locked: After 7 days without donations, 
              the entire pool automatically transfers to the last donor. Your donation is always protected!
            </p>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce">
        <div className="w-10 h-10 rounded-full border-2 border-gold-400 flex items-center justify-center">
          <svg className="w-4 h-4 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
