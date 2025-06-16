import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const Terms = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();

  const sections = [
    {
      title: "1. Eligibility",
      items: [
        {
          point: "1.1. Participation in the USD1GoldCard platform is strictly limited to non-US citizens and non-green card holders.",
        },
        {
          point: "1.2. US citizens and green card holders are expressly prohibited from participating.",
        },
        {
          point: "1.3. Participants must be at least 18 years old or the legal age of majority in their jurisdiction.",
        },
        {
          point: "1.4. By participating, you confirm that you meet these eligibility requirements and that your participation does not violate any laws in your jurisdiction.",
        },
      ]
    },
    {
      title: "2. Platform Operation",
      items: [
        {
          point: "2.1. USD1GoldCard operates as a donation platform where participants donate USD1 tokens on the EVM blockchain.",
        },
        {
          point: "2.2. 100% of each donation goes directly to the prize pool. An additional 5% service fee is charged separately and is allocated to platform fees for audits, legal compliance, and operations.",
        },
        {
          point: "2.3. When the pool reaches $10 million, a winner is randomly selected using Chainlink VRF to receive $5 million USD1.",
        },
        {
          point: "2.4. If the pool doesn't reach $10 million and there are no donations for 7 consecutive days, the last donor wins the entire pool.",
        },
        {
          point: "2.5. The selection probability is proportional to a participant's contribution to the total pool.",
        },
      ]
    },
    {
      title: "3. Donations",
      items: [
        {
          point: "3.1. All donations are final and non-refundable.",
        },
        {
          point: "3.2. The minimum donation amount is 1.05 USD1.",
        },
        {
          point: "3.3. Participants may make multiple donations to increase their chances of winning.",
        },
        {
          point: "3.4. By donating, you acknowledge that you are not guaranteed to win and that your donation serves as a voluntary contribution.",
        },
      ]
    },
    {
      title: "4. Prize Distribution",
      items: [
        {
          point: "4.1. The prize of $5 million USD1 will be automatically transferred to the winner's EVM wallet address.",
        },
        {
          point: "4.2. The winner is solely responsible for any taxes, fees, or other obligations related to receiving the prize.",
        },
        {
          point: "4.3. USD1GoldCard does not guarantee that winning the prize will result in a successful Gold Card application or US residency.",
        },
        {
          point: "4.4. Winners should consult with qualified immigration attorneys regarding their Gold Card application.",
        },
      ]
    },
    {
      title: "5. Disclaimers",
      items: [
        {
          point: "5.1. USD1GoldCard is not affiliated with any government entity or official immigration program.",
        },
        {
          point: "5.2. Participation is at your own risk. We make no guarantees regarding the success of immigration applications.",
        },
        {
          point: "5.3. The platform relies on blockchain technology and smart contracts. While we take security seriously, we cannot guarantee the absence of technical vulnerabilities.",
        },
        {
          point: "5.4. We are not responsible for issues related to the EVM blockchain, including but not limited to network congestion, outages, or wallet malfunctions.",
        },
      ]
    },
    {
      title: "6. Privacy",
      items: [
        {
          point: "6.1. All donations are recorded on the EVM blockchain and are publicly viewable.",
        },
        {
          point: "6.2. Wallet addresses of participants and winners will be publicly visible on the blockchain.",
        },
        {
          point: "6.3. We do not collect personal identification information beyond wallet addresses.",
        },
      ]
    },
    {
      title: "7. Modifications",
      items: [
        {
          point: "7.1. We reserve the right to modify these Terms & Conditions at any time.",
        },
        {
          point: "7.2. Material changes will be announced on our website and social media channels.",
        },
        {
          point: "7.3. Continued use of the platform after changes constitutes acceptance of the updated terms.",
        },
      ]
    },
    {
      title: "8. Governing Law",
      items: [
        {
          point: "8.1. These Terms & Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which the platform is legally established.",
        },
        {
          point: "8.2. Any disputes arising from these terms shall be resolved through arbitration in accordance with the rules of the jurisdiction.",
        },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600">
          Terms & Conditions
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Please read these terms carefully before using USD1GoldCard.
        </p>
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-gold-100 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gold-600 text-left">{section.title}</h2>
              <div className="space-y-6">
                {section.items.map((item, qIndex) => (
                  <div key={qIndex} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <p className="text-gray-600 text-left">{item.point}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-gold-100">
            <p className="text-gray-700 mb-4">
              By using the USD1GoldCard platform, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms & Conditions.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Last updated: {currentDate}
            </p>
            <div className="flex justify-center">
              <Button 
                className="bg-gold-500 hover:bg-gold-600 text-black font-medium transition-all duration-300"
                onClick={() => navigate('/')}
              >
                I Agree & Want to Donate Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
