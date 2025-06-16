
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ReferralDashboard from '../components/referral/ReferralDashboard';

const Referral = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Referral Program - OneDollarGoldCard</title>
        <meta name="description" content="Earn rewards by referring friends to the OneDollarGoldCard platform. Get 50% of service fees from successful referrals." />
      </Helmet>
      
      <div className="container-custom py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Referral Program
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share OneDollarGoldCard with friends and earn 50% of the service fee for each successful donation.
            </p>
          </div>
          
          <ReferralDashboard />
        </div>
      </div>
    </div>
  );
};

export default Referral;
