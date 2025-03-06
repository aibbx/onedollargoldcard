
import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import DonationCard from '../components/DonationCard';
import PoolStats from '../components/PoolStats';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <DonationCard />
        <PoolStats />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
