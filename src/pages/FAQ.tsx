
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ExternalLinkIcon } from 'lucide-react';

const FAQ = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: 'General Questions',
      questions: [
        {
          q: 'What is OneDollarGoldCard?',
          a: 'OneDollarGoldCard is a decentralized donation platform built on Solana blockchain that allows non-US citizens to donate USDC and potentially win $5 million to fund their Gold Card application.'
        },
        {
          q: 'What is the "Gold Card"?',
          a: 'The "Gold Card" refers to a pathway to US residency for individuals who make a significant investment. Our platform\'s prize is designed to cover the $5 million requirement for this application.'
        },
        {
          q: 'Who can participate?',
          a: 'Participation is limited to non-US citizens and non-green card holders. US citizens and green card holders are not eligible to participate.'
        },
        {
          q: 'Is this platform associated with the US government?',
          a: 'No, OneDollarGoldCard is not affiliated with any government entity or official immigration program. We are an independent platform facilitating donations and prize distribution.'
        }
      ]
    },
    {
      title: 'Donation Process',
      questions: [
        {
          q: 'What is the minimum donation amount?',
          a: 'The minimum donation is 1.05 USDC (approximately $1.05 USD), of which 1 USDC goes to the prize pool and 0.05 USDC covers platform fees.'
        },
        {
          q: 'What happens to my donation?',
          a: '100% of your donation amount goes directly into the prize pool. An additional 5% service fee is charged separately and is not included in the donation pool. This service fee covers essential operational costs including smart contract audits, legal compliance, and platform maintenance.'
        },
        {
          q: 'Can I donate multiple times?',
          a: 'Yes, you can donate as many times as you wish. Each donation increases your chances of winning proportionally.'
        },
        {
          q: 'Which wallets are supported?',
          a: 'You can use any Solana-compatible wallet, including Phantom, Solflare, and others. The wallet must be able to hold and transfer USDC-SPL tokens.'
        }
      ]
    },
    {
      title: 'Winner Selection',
      questions: [
        {
          q: 'How are winners selected?',
          a: 'Winners are selected using Switchboard VRF (Verifiable Random Function) when the pool reaches $10 million. The selection is proportional to donation amounts, so larger donors have higher chances of winning.'
        },
        {
          q: 'What are my chances of winning?',
          a: 'Your chances are directly proportional to your contribution to the pool. For example, if you contributed 1% of the total pool, your chance of winning is 1%.'
        },
        {
          q: 'What happens if the pool doesn\'t reach $10 million?',
          a: 'If the pool doesn\'t reach $10 million and there are no donations for 7 consecutive days, the last donor will win the entire pool balance as a backup mechanism.'
        },
        {
          q: 'How do I receive the prize if I win?',
          a: 'The prize of $5 million USDC will be automatically transferred to your Solana wallet if you\'re selected as the winner. No further action is required.'
        }
      ]
    },
    {
      title: 'Technical & Security',
      questions: [
        {
          q: 'Is the platform secure?',
          a: 'Yes, our smart contracts are open source, audited, and use proven blockchain technology. All transactions are transparent and verifiable on the Solana blockchain.'
        },
        {
          q: 'Can I verify that the selection is fair?',
          a: 'Absolutely. We use Switchboard\'s Verifiable Random Function (VRF), which provides cryptographic proof that the selection was random and not manipulated. All contract code is open source.'
        },
        {
          q: 'Where can I view the smart contract?',
          a: 'The smart contract code is available on GitHub and can be viewed on Solana explorers. Links to these resources are available in the footer of our website.'
        }
      ]
    },
    {
      title: 'Legal & Compliance',
      questions: [
        {
          q: 'Is this legal?',
          a: 'Our platform operates as a donation-based prize pool mechanism. We\'ve designed it with compliance in mind, but participants should consult their local laws regarding donations and cryptocurrency.'
        },
        {
          q: 'Does winning guarantee a Gold Card?',
          a: 'No. Winning provides the funds that could be used for a Gold Card application, but approval depends on meeting all immigration requirements and is at the discretion of immigration authorities.'
        },
        {
          q: 'How do you verify participants aren\'t US citizens?',
          a: 'We rely on participants to self-declare their eligibility. By participating, you confirm that you meet the eligibility requirements. We do not independently verify citizenship or immigration status.'
        }
      ]
    }
  ];

  const partnerLogos = [
    { 
      name: 'Gold Card', 
      logo: '/logos/gold-card-64x64.png',
      logoLarge: '/logos/gold-card-256x256.png',
      url: 'https://onedollargoldcard.com'
    },
    { 
      name: 'Phantom Wallet', 
      logo: '/wallet-icons/phantom-icon.png',
      url: 'https://phantom.app/' 
    },
    { 
      name: 'Solflare Wallet', 
      logo: '/wallet-icons/solflare-icon.png',
      url: 'https://solflare.com/' 
    },
    { 
      name: 'OKX Wallet', 
      logo: '/wallet-icons/okx-icon.png',
      url: 'https://www.okx.com/web3' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gold-50/30 to-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Everything you need to know about OneDollarGoldCard and how it works.
        </p>
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-gold-100 transition-all duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gold-600 text-left">{section.title}</h2>
              <div className="space-y-6">
                {section.questions.map((item, qIndex) => (
                  <div key={qIndex} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 text-left">{item.q}</h3>
                    <p className="text-gray-600 text-left">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Have a question that's not answered here?</h3>
          <Button
            className="bg-gold-500 hover:bg-gold-600 text-black font-medium py-2 px-6 rounded-md transition-all inline-flex items-center gap-2"
            onClick={() => window.open('https://twitter.com/intent/tweet?text=@OneDollarGoldCard', '_blank')}
          >
            <ExternalLinkIcon className="w-5 h-5" />
            Ask on X
          </Button>
        </div>

        {/* Partner Resources Section */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-center mb-6 text-gold-600">Partner Resources</h2>
          <div className="bg-white rounded-xl shadow-md p-8 border border-gold-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {partnerLogos.map((partner, index) => (
                <a 
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center group transition-all duration-300"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3 bg-white shadow-sm border border-gray-100 p-2 overflow-hidden group-hover:shadow-md transition-all">
                    <img 
                      src={partner.logoLarge || partner.logo} 
                      alt={`${partner.name} logo`} 
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <span className="text-sm text-gray-600 text-center group-hover:text-gold-600 transition-colors">
                    {partner.name}
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-8 text-center text-sm text-gray-500">
              These are the official partners and supported wallets for the OneDollarGoldCard platform.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
