
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 flex items-start">
      <div className="mr-4 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const WhySolanaTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Solana?</h3>
      <p className="text-gray-700 mb-6">
        We've chosen the Solana blockchain for its low transaction costs, high throughput, and robust ecosystem. This allows for:
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard
          icon={
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          }
          title="Minimal Fees"
          description="Even for small donations, transaction costs remain extremely low"
        />
        
        <FeatureCard
          icon={
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          }
          title="Fast Transactions"
          description="Near-instantaneous transaction confirmation"
        />
        
        <FeatureCard
          icon={
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          }
          title="Full Transparency"
          description="Complete on-chain verification of all transactions"
        />
        
        <FeatureCard
          icon={
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          }
          title="Secure Selection"
          description="Tamper-proof random selection using Switchboard VRF"
        />
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Important Disclaimer</h4>
        <p className="text-gray-700">
          OneDollarGoldCard is not affiliated with any government entity or official immigration program. 
          We do not guarantee that winning the prize will guarantee a successful Gold Card application or US residency. 
          Participants are responsible for their own eligibility for immigration programs and should consult with qualified immigration attorneys.
        </p>
      </div>
    </div>
  );
};

export default WhySolanaTab;
