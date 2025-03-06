
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FAQ = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('general');
  
  const categories = [
    { id: 'general', label: 'General Questions' },
    { id: 'donation', label: 'Donation Process' },
    { id: 'winner', label: 'Winner Selection' },
    { id: 'technical', label: 'Technical & Security' },
    { id: 'legal', label: 'Legal & Compliance' },
  ];
  
  const faqItems = {
    general: [
      {
        question: 'What is OneDollarGoldCard?',
        answer: 'OneDollarGoldCard is a decentralized donation platform built on Solana blockchain that allows non-US citizens to donate USDC and potentially win $5 million to fund their Gold Card application.'
      },
      {
        question: 'What is the "Gold Card"?',
        answer: 'The "Gold Card" refers to a pathway to US residency for individuals who make a significant investment. Our platform\'s prize is designed to cover the $5 million requirement for this application.'
      },
      {
        question: 'Who can participate?',
        answer: 'Participation is limited to non-US citizens and non-green card holders. US citizens and green card holders are not eligible to participate.'
      },
      {
        question: 'Is this platform associated with the US government?',
        answer: 'No, OneDollarGoldCard is not affiliated with any government entity or official immigration program. We are an independent platform facilitating donations and prize distribution.'
      }
    ],
    donation: [
      {
        question: 'What is the minimum donation amount?',
        answer: 'The minimum donation is 1.05 USDC (approximately $1.05 USD), of which 1 USDC goes to the prize pool and 0.05 USDC covers platform fees.'
      },
      {
        question: 'What happens to my donation?',
        answer: '100% of your donation amount goes directly into the prize pool. An additional 5% service fee is charged separately and is not included in the donation pool. This service fee covers essential operational costs including smart contract audits, legal compliance, and platform maintenance.'
      },
      {
        question: 'Can I donate multiple times?',
        answer: 'Yes, you can donate as many times as you wish. Each donation increases your chances of winning proportionally.'
      },
      {
        question: 'Which wallets are supported?',
        answer: 'You can use any Solana-compatible wallet, including Phantom, Solflare, and others. The wallet must be able to hold and transfer USDC-SPL tokens.'
      }
    ],
    winner: [
      {
        question: 'How are winners selected?',
        answer: 'Winners are selected using Switchboard VRF (Verifiable Random Function) when the pool reaches $10 million. The selection is proportional to donation amounts, so larger donors have higher chances of winning.'
      },
      {
        question: 'What are my chances of winning?',
        answer: 'Your chances are directly proportional to your contribution to the pool. For example, if you contributed 1% of the total pool, your chance of winning is 1%.'
      },
      {
        question: 'What happens if the pool doesn\'t reach $10 million?',
        answer: 'If the pool doesn\'t reach $10 million and there are no donations for 7 consecutive days, the last donor will win the entire pool balance as a backup mechanism.'
      },
      {
        question: 'How do I receive the prize if I win?',
        answer: 'The prize of $5 million USDC will be automatically transferred to your Solana wallet if you\'re selected as the winner. No further action is required.'
      }
    ],
    technical: [
      {
        question: 'Is the platform secure?',
        answer: 'Yes, our smart contracts are open source, audited, and use proven blockchain technology. All transactions are transparent and verifiable on the Solana blockchain.'
      },
      {
        question: 'Can I verify that the selection is fair?',
        answer: 'Absolutely. We use Switchboard\'s Verifiable Random Function (VRF), which provides cryptographic proof that the selection was random and not manipulated. All contract code is open source.'
      },
      {
        question: 'Where can I view the smart contract?',
        answer: 'The smart contract code is available on GitHub and can be viewed on Solana explorers. Links to these resources are available in the footer of our website.'
      }
    ],
    legal: [
      {
        question: 'Is this legal?',
        answer: 'Our platform operates as a donation-based prize pool mechanism. We\'ve designed it with compliance in mind, but participants should consult their local laws regarding donations and cryptocurrency.'
      },
      {
        question: 'Does winning guarantee a Gold Card?',
        answer: 'No. Winning provides the funds that could be used for a Gold Card application, but approval depends on meeting all immigration requirements and is at the discretion of immigration authorities.'
      },
      {
        question: 'How do you verify participants aren\'t US citizens?',
        answer: 'We rely on participants to self-declare their eligibility. By participating, you confirm that you meet the eligibility requirements. We do not independently verify citizenship or immigration status.'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="heading-lg mb-6">Frequently Asked Questions</h1>
            <div className="w-20 h-1 bg-gold-400 mx-auto"></div>
          </div>
          
          {/* Category Selector */}
          <div className="flex overflow-x-auto pb-4 mb-8 justify-center">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gold-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gold-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* FAQ Items */}
          <div className="max-w-3xl mx-auto">
            {faqItems[activeCategory as keyof typeof faqItems].map((item, index) => (
              <div 
                key={index}
                className="mb-6 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                    <span className="transition-transform group-open:rotate-180">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gold-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600">
                    <p>{item.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="#contact" 
              className="inline-flex items-center text-gold-600 hover:text-gold-800 transition-colors"
            >
              Still have questions? Contact us
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FAQ;
