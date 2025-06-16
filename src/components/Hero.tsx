
import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Share2, Sparkles, Shield, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Logo from './Logo';

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
    const text = `🚀 Join the USD1 On-Chain Lottery! Win $5M for Gold Card application! 💰 Pure blockchain donation & draw system + HUGE referral rewards! Start with just 1 USD1! #OneDollarGoldCard #USD1 #OnChainLottery #GoldCard`;
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
    "description": "Independent blockchain platform for the Gold Card initiative - democratizing access to US residency opportunities.",
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
    "description": "Independent opportunity to win $5 million for applying to the Gold Card program.",
    "offers": {
      "@type": "Offer",
      "price": "1.05",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
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
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      ></div>
      
      {/* American Flag Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-white via-red-600 via-white via-red-600 via-white to-red-600"></div>
      <div className="absolute top-2 left-0 w-full h-1 bg-white opacity-80"></div>
      
      <div className="container-custom relative z-10 text-center px-4 py-24 md:py-32">
        {/* Platform Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" className="drop-shadow-2xl" />
        </div>

        <h1 
          ref={titleRef}
          className="text-4xl md:text-7xl font-bold mb-4 text-white tracking-wide"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          ONE USD1 GOLD CARD
        </h1>
        
        <div 
          ref={subtitleRef}
          className="mb-6 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gold-400 uppercase tracking-wider mb-2">
            Fully On-Chain Donation Initiatives
          </h2>
          <div className="w-32 h-1 bg-gold-400 mx-auto mb-4"></div>
          <p className="text-xl md:text-2xl text-blue-100 font-semibold">
            Decentralized EVM Platform for Gold Card Applications
          </p>
        </div>
        
        <p 
          ref={descRef}
          className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Independent blockchain-based dApp supporting the Gold Card initiative. 
          Participate with USD1 contributions for a chance to win $5 million toward your Gold Card application. 
          Fully transparent, secure, and built on EVM chains with no government affiliation.
        </p>
        
        {/* Trust Indicators */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 text-blue-200">
          <div className="flex items-center gap-2 bg-blue-800/50 px-4 py-2 rounded-lg border border-blue-600">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-semibold">Blockchain Verified</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-800/50 px-4 py-2 rounded-lg border border-blue-600">
            <Shield className="w-5 h-5 text-blue-300" />
            <span className="text-sm font-semibold">Decentralized dApp</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-800/50 px-4 py-2 rounded-lg border border-blue-600">
            <Sparkles className="w-5 h-5 text-gold-400" />
            <span className="text-sm font-semibold">EVM Compatible</span>
          </div>
        </div>
        
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <button 
            className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-blue-900 font-bold py-4 px-8 rounded-lg shadow-2xl transform hover:scale-105 transition-all duration-200 min-w-[220px] text-lg uppercase tracking-wide border-2 border-gold-400"
            onClick={handleDonateClick}
            aria-label="Participate in the Gold Card initiative dApp"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              PARTICIPATE NOW
            </span>
          </button>
          <button 
            onClick={handleShare}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-4 px-8 rounded-lg transition-all duration-200 min-w-[220px] text-lg uppercase tracking-wide"
            aria-label="Share the Gold Card initiative"
          >
            <span className="flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              SHARE INITIATIVE
            </span>
          </button>
        </div>
        
        <div
          ref={safeguardRef}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-8 h-8 text-red-400 flex-shrink-0" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">Smart Contract Security</h3>
            </div>
            <p className="text-blue-100 leading-relaxed">
              <strong>7-Day Safeguard Mechanism:</strong> Our advanced smart contract includes enterprise-grade security protocols. 
              If no qualifying contributions are received within 7 days, all pooled funds are automatically secured and 
              transferred to the final qualified participant. Your contribution is protected by blockchain technology 
              on EVM-compatible networks.
            </p>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="mt-8 text-blue-200 text-sm">
          <p className="mb-2">
            <strong>NOTICE:</strong> This is an independent dApp platform with no government affiliation
          </p>
          <p>
            Minimum participation: $1.05 USD1 • EVM blockchain security • Transparent verification
          </p>
        </div>
      </div>
      
      <div className="hidden md:block absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce">
        <div className="w-12 h-12 rounded-full border-2 border-gold-400 bg-gold-400/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
