
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-black">
      <main className="relative">
        <Hero />
        <Features />
        <div className="relative bg-gradient-to-b from-slate-800 to-slate-900">
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
