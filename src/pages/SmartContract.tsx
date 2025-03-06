
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, Check, Code } from 'lucide-react';

const SmartContract = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = React.useState(false);

  const smartContractAddress = "CsJmRcZGp4RYvyGZzwbKWnbkLcWCesf4vyWp5cxyyxVa";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(smartContractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewOnExplorer = () => {
    window.open(`https://explorer.solana.com/address/${smartContractAddress}`, '_blank');
  };

  const handleViewSourceCode = () => {
    window.open('https://github.com/OneDollarGoldCard/smart-contract', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600">
              Smart Contract
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our transparent and secure smart contract powering the OneDollarGoldCard platform.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Contract Address Card */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gold-100 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Contract Address</h2>
                <Code className="text-gold-500 h-6 w-6" />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex-1 font-mono text-sm overflow-x-auto">
                  {smartContractAddress}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="flex-shrink-0 border-gold-200 hover:bg-gold-50 hover:text-gold-600"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="border-gold-200 hover:bg-gold-50 hover:text-gold-600 flex items-center gap-2"
                  onClick={handleViewOnExplorer}
                >
                  <ExternalLink className="h-4 w-4" />
                  View on Explorer
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gold-200 hover:bg-gold-50 hover:text-gold-600 flex items-center gap-2"
                  onClick={handleViewSourceCode}
                >
                  <Code className="h-4 w-4" />
                  View Source Code
                </Button>
              </div>
            </div>
            
            {/* Contract Details */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gold-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contract Details</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Platform Mechanics</h3>
                  <p className="text-gray-700">
                    The OneDollarGoldCard smart contract handles donations, prize pool management, and winner selection with 
                    complete transparency. Every transaction is recorded on the Solana blockchain and can be verified by anyone.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Donation Processing</h3>
                  <p className="text-gray-700">
                    When you donate, 100% of your donation amount is stored in the prize pool. An additional 5% service fee is charged 
                    separately to cover operational costs, smart contract audits, and platform maintenance.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Winner Selection</h3>
                  <p className="text-gray-700">
                    The smart contract uses Switchboard's Verifiable Random Function (VRF) to ensure that winner selection is 
                    provably fair and cannot be manipulated. Your chance of winning is directly proportional to your contribution 
                    to the prize pool.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Prize Distribution</h3>
                  <p className="text-gray-700">
                    When the pool reaches $10 million, the smart contract automatically initiates the winner selection process. 
                    $5 million is transferred to the winner's wallet, while the remaining $5 million stays in the pool for the next round.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Fallback Mechanism</h3>
                  <p className="text-gray-700">
                    If there are no donations for 7 consecutive days before reaching the target, the smart contract automatically 
                    transfers the entire pool to the last donor as a fallback mechanism.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Security Audit */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gold-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Audit</h2>
              <div className="mb-6">
                <p className="text-gray-700">
                  Our smart contract has been audited by leading blockchain security firms to ensure it's secure, 
                  efficient, and functions as intended. The full audit reports are available below.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="border-gold-200 hover:bg-gold-50 hover:text-gold-600 flex items-center gap-2"
                  onClick={() => window.open('https://example.com/audit-report-1', '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  View Audit Report 1
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gold-200 hover:bg-gold-50 hover:text-gold-600 flex items-center gap-2"
                  onClick={() => window.open('https://example.com/audit-report-2', '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  View Audit Report 2
                </Button>
              </div>
            </div>
            
            {/* Technical Documentation */}
            <div className="bg-white rounded-xl shadow-md p-8 border border-gold-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Technical Documentation</h2>
                <Code className="text-gold-500 h-6 w-6" />
              </div>
              <p className="text-gray-700 mb-6">
                For developers and technically-inclined users who want to understand how our smart contract works in detail, 
                we've prepared comprehensive technical documentation available on GitHub.
              </p>
              <Button 
                className="bg-gold-500 hover:bg-gold-600 text-black font-medium transition-all duration-300 transform hover:scale-105"
                onClick={() => window.open('https://github.com/OneDollarGoldCard/docs', '_blank')}
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SmartContract;
