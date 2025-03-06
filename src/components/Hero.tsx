
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Share2, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Hero = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [walletType, setWalletType] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const elements = [
      { ref: titleRef, delay: 0 },
      { ref: subtitleRef, delay: 2 },
      { ref: descRef, delay: 4 },
      { ref: buttonsRef, delay: 6 },
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
    const text = `Join me in supporting OneDollarGoldCard! #OneDollarGoldCard`;
    const url = window.location.href;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const connectWallet = (type: string) => {
    // Mock wallet connection
    setWalletType(type);
    setTimeout(() => {
      setIsWalletConnected(true);
      setShowWalletOptions(false);
      toast({
        title: "Wallet Connected",
        description: `Your ${type} wallet has been connected successfully.`,
      });
    }, 1000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gold-50 to-white opacity-70"></div>
      
      {/* Floating card background effect */}
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
          {t('hero.title')}
        </h1>
        
        <h2 
          ref={subtitleRef}
          className="heading-md mb-6 text-gray-800 max-w-3xl mx-auto"
        >
          {t('hero.subtitle')}
        </h2>
        
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
            className="btn-gold min-w-[180px] flex items-center justify-center gap-2"
            onClick={() => setShowWalletOptions(true)}
          >
            <Wallet className="w-4 h-4" />
            {t('hero.donateButton')}
          </button>
          <button 
            onClick={handleShare}
            className="btn-outline min-w-[180px] flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share on X
          </button>
        </div>
        
        {/* Wallet options */}
        {showWalletOptions && !isWalletConnected && (
          <div className="mt-6 space-y-3 bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
            <h4 className="font-medium text-gray-800 mb-2">Select Wallet</h4>
            <button 
              onClick={() => connectWallet('Phantom')}
              className="w-full py-2 px-4 flex justify-between items-center bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              Phantom <img src="/wallet-icons/phantom-icon.svg" alt="Phantom" className="w-5 h-5" />
            </button>
            <button 
              onClick={() => connectWallet('Solflare')}
              className="w-full py-2 px-4 flex justify-between items-center bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
            >
              Solflare <img src="/wallet-icons/solflare-icon.svg" alt="Solflare" className="w-5 h-5" />
            </button>
            <button 
              onClick={() => connectWallet('OKX')}
              className="w-full py-2 px-4 flex justify-between items-center bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              OKX Wallet <img src="/wallet-icons/okx-icon.svg" alt="OKX" className="w-5 h-5" />
            </button>
            <button 
              onClick={() => connectWallet('MetaMask')}
              className="w-full py-2 px-4 flex justify-between items-center bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
            >
              MetaMask <img src="/wallet-icons/metamask-icon.svg" alt="MetaMask" className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Card floating effect */}
        <div className="relative mt-16 md:mt-24 max-w-md mx-auto">
          <div className="absolute -inset-1 rounded-2xl bg-gold-gradient opacity-50 blur-lg animate-pulse"></div>
          <img 
            src="/src/assets/gold-card.svg" 
            alt="Gold Card" 
            className="relative w-full h-auto rounded-2xl shadow-xl animate-float bg-white p-4"
          />
        </div>
      </div>
      
      {/* Scroll indicator */}
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
