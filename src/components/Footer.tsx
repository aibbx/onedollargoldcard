import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { Github, ExternalLink, Home, HelpCircle, FileText, MessageCircle, Sparkle, X, Shield, Award } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const text = "Join the USD1GoldCard Gold Card initiative - your pathway to American opportunity! #GoldCard #USD1GoldCard";
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
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 pt-16 pb-8 text-white">
      <div className="container-custom">
        {/* Fully Secured Platform Statement Card */}
        <div className="mb-12 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-blue-400/30">
          <div className="flex items-start">
            <div className="text-gold-400 mr-6">
              <Award className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gold-400 mb-6 uppercase tracking-wide">Fully Secured Gold Card dApp</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-800/50 p-6 rounded-lg border border-blue-600/50">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-blue-300 mr-2" />
                    <h4 className="font-bold text-blue-100">Blockchain Security</h4>
                  </div>
                  <p className="text-blue-200 italic leading-relaxed">
                    "This platform operates as a fully on-chain dApp with blockchain transparency, ensuring every participant has equal opportunity in the Gold Card initiative."
                  </p>
                </div>
                <div className="bg-blue-800/50 p-6 rounded-lg border border-blue-600/50">
                  <div className="flex items-center mb-3">
                    <Sparkle className="w-6 h-6 text-gold-400 mr-2" />
                    <h4 className="font-bold text-blue-100">Community Access</h4>
                  </div>
                  <p className="text-blue-200 italic leading-relaxed">
                    "The Gold Card represents opportunity for talented individuals to contribute to American prosperity. This is how we build the future together."
                  </p>
                </div>
                <div className="bg-blue-800/50 p-6 rounded-lg border border-blue-600/50">
                  <div className="flex items-center mb-3">
                    <ExternalLink className="w-6 h-6 text-green-400 mr-2" />
                    <h4 className="font-bold text-blue-100">Transparent System</h4>
                  </div>
                  <p className="text-blue-200 italic leading-relaxed">
                    "Every contribution is recorded on the blockchain. Every selection is verifiable. This is community-driven democracy in action, powered by technology."
                  </p>
                </div>
                <div className="bg-blue-800/50 p-6 rounded-lg border border-blue-600/50">
                  <div className="flex items-center mb-3">
                    <Home className="w-6 h-6 text-red-400 mr-2" />
                    <h4 className="font-bold text-blue-100">American Dream</h4>
                  </div>
                  <p className="text-blue-200 italic leading-relaxed">
                    "This initiative embodies the American spirit - giving everyone a fair chance to achieve their dreams through merit and opportunity."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Logo size="md" />
              <div>
                <span className="font-bold text-2xl text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  USD1GoldCard
                </span>
                <div className="text-gold-400 text-sm font-semibold uppercase tracking-wide">Fully Secured</div>
              </div>
            </div>
            <p className="text-blue-200 mb-6 max-w-lg leading-relaxed">
              A fully secured digital dApp for the Gold Card initiative, providing transparent blockchain-based 
              access to US residency opportunities through the community Gold Card program.
            </p>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-xl mb-6 text-gold-400 uppercase tracking-wide">Platform Links</h3>
            <div className="grid grid-cols-1 gap-3">
              <button 
                onClick={() => navigateToTop('/')}
                className="flex items-center px-4 py-3 bg-blue-800/50 hover:bg-blue-700/50 rounded-lg border border-blue-600/50 hover:border-blue-500 transition-all duration-200 group text-left"
              >
                <Home className="w-5 h-5 mr-3 text-blue-300" />
                <span className="text-blue-100 group-hover:text-white font-semibold">USD1 Gold Card</span>
              </button>
              
              <button 
                onClick={() => navigateToTop('/faq')}
                className="flex items-center px-4 py-3 bg-blue-800/50 hover:bg-blue-700/50 rounded-lg border border-blue-600/50 hover:border-blue-500 transition-all duration-200 group text-left"
              >
                <HelpCircle className="w-5 h-5 mr-3 text-blue-300" />
                <span className="text-blue-100 group-hover:text-white font-semibold">FAQ & Support</span>
              </button>
              
              <a 
                href="#" 
                onClick={handleContactClick}
                className="flex items-center px-4 py-3 bg-blue-800/50 hover:bg-blue-700/50 rounded-lg border border-blue-600/50 hover:border-blue-500 transition-all duration-200 group"
              >
                <MessageCircle className="w-5 h-5 mr-3 text-green-400" />
                <span className="text-blue-100 group-hover:text-white font-semibold">Community Contact</span>
                <ExternalLink className="ml-auto w-4 h-4 text-blue-400 group-hover:text-blue-300" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-blue-700 pt-6 flex justify-between flex-col md:flex-row items-center">
          <div>
            <p className="text-sm text-blue-200 mb-2">
              &copy; {currentYear} USD1GoldCard Fully Secured dApp Platform. All rights reserved.
            </p>
            <p className="text-xs text-blue-300">
              Blockchain transparency • Fully secured operation • Equal opportunity access
            </p>
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/aibbx/onedollargoldcard.git" className="text-blue-300 hover:text-white transition-all duration-200" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub Repository</span>
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-all duration-200" onClick={handleShare}>
              <X className="h-6 w-6" />
              <span className="sr-only">Share Initiative</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
