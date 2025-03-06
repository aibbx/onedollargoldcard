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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600">
              Terms & Conditions
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using OneDollarGoldCard.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto border border-gold-100">
            <p className="text-gray-700 mb-8">
              By using the OneDollarGoldCard platform, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use the platform.
            </p>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Eligibility</h2>
                <div className="space-y-3 text-gray-700">
                  <p>1.1. Participation in the OneDollarGoldCard platform is strictly limited to non-US citizens and non-green card holders.</p>
                  <p>1.2. US citizens and green card holders are expressly prohibited from participating.</p>
                  <p>1.3. Participants must be at least 18 years old or the legal age of majority in their jurisdiction.</p>
                  <p>1.4. By participating, you confirm that you meet these eligibility requirements and that your participation does not violate any laws in your jurisdiction.</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Platform Operation</h2>
                <div className="space-y-3 text-gray-700">
                  <p>2.1. OneDollarGoldCard operates as a donation platform where participants donate USDC tokens on the Solana blockchain.</p>
                  <p>2.2. 100% of each donation goes directly to the prize pool. An additional 5% service fee is charged separately and is allocated to platform fees for audits, legal compliance, and operations.</p>
                  <p>2.3. When the pool reaches $10 million, a winner is randomly selected using Switchboard VRF to receive $5 million USDC.</p>
                  <p>2.4. If the pool doesn't reach $10 million and there are no donations for 7 consecutive days, the last donor wins the entire pool.</p>
                  <p>2.5. The selection probability is proportional to a participant's contribution to the total pool.</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Donations</h2>
                <div className="space-y-3 text-gray-700">
                  <p>3.1. All donations are final and non-refundable.</p>
                  <p>3.2. The minimum donation amount is 1.05 USDC.</p>
                  <p>3.3. Participants may make multiple donations to increase their chances of winning.</p>
                  <p>3.4. By donating, you acknowledge that you are not guaranteed to win and that your donation serves as a voluntary contribution.</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Prize Distribution</h2>
                <div className="space-y-3 text-gray-700">
                  <p>4.1. The prize of $5 million USDC will be automatically transferred to the winner's Solana wallet address.</p>
                  <p>4.2. The winner is solely responsible for any taxes, fees, or other obligations related to receiving the prize.</p>
                  <p>4.3. OneDollarGoldCard does not guarantee that winning the prize will result in a successful Gold Card application or US residency.</p>
                  <p>4.4. Winners should consult with qualified immigration attorneys regarding their Gold Card application.</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Disclaimers</h2>
                <div className="space-y-3 text-gray-700">
                  <p>5.1. OneDollarGoldCard is not affiliated with any government entity or official immigration program.</p>
                  <p>5.2. Participation is at your own risk. We make no guarantees regarding the success of immigration applications.</p>
                  <p>5.3. The platform relies on blockchain technology and smart contracts. While we take security seriously, we cannot guarantee the absence of technical vulnerabilities.</p>
                  <p>5.4. We are not responsible for issues related to the Solana blockchain, including but not limited to network congestion, outages, or wallet malfunctions.</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Privacy</h2>
                <div className="space-y-3 text-gray-700">
                  <p>6.1. All donations are recorded on the Solana blockchain and are publicly viewable.</p>
                  <p>6.2. Wallet addresses of participants and winners will be publicly visible on the blockchain.</p>
                  <p>6.3. We do not collect personal identification information beyond wallet addresses.</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Modifications</h2>
                <div className="space-y-3 text-gray-700">
                  <p>7.1. We reserve the right to modify these Terms & Conditions at any time.</p>
                  <p>7.2. Material changes will be announced on our website and social media channels.</p>
                  <p>7.3. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Governing Law</h2>
                <div className="space-y-3 text-gray-700">
                  <p>8.1. These Terms & Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which the platform is legally established.</p>
                  <p>8.2. Any disputes arising from these terms shall be resolved through arbitration in accordance with the rules of the jurisdiction.</p>
                </div>
              </section>
            </div>
            
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm text-center mb-8">
                Last updated: {currentDate}
              </p>
              <div className="flex justify-center">
                <Button 
                  className="bg-gold-500 hover:bg-gold-600 text-black font-medium transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate('/')}
                >
                  I Agree & Want to Donate Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Terms;
