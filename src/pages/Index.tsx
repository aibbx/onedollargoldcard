
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import DonationCard from '../components/DonationCard';
import PoolStats from '../components/PoolStats';

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a section to scroll to (coming from navigation)
    if (location.state && location.state.scrollToSection) {
      const sectionId = location.state.scrollToSection;
      // Small timeout to ensure the page has fully loaded
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <main className="relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <Hero />
        <Features />
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-gold-50/30 to-transparent" />
          <div id="donation-section">
            <DonationCard />
            <PoolStats />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
