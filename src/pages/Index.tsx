
import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/how-it-works/HowItWorks';
import DonationCard from '../components/DonationCard';
import PoolStats from '../components/PoolStats';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
        <Navbar />
        <main className="relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <Hero />
          <Features />
          <HowItWorks />
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-gold-50/30 to-transparent" />
            <DonationCard />
            <PoolStats />
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
