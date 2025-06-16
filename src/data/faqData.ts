
export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQSection {
  title: string;
  questions: FAQItem[];
}

export const faqSections: FAQSection[] = [
  {
    title: 'General Questions',
    questions: [
      {
        q: 'What is OneDollarGoldCard?',
        a: 'OneDollarGoldCard is a decentralized donation platform built on Solana blockchain that allows non-US citizens to donate USD1 and potentially win $5 million to fund their Gold Card application.'
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
        a: 'The minimum donation is 1.05 USD1 (approximately $1.05 USD), of which 1 USD1 goes to the prize pool and 0.05 USD1 covers platform fees.'
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
        a: 'You can use any Solana-compatible wallet, including Phantom, Solflare, and others. The wallet must be able to hold and transfer USD1-SPL tokens.'
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
        a: 'The prize of $5 million USD1 will be automatically transferred to your Solana wallet if you\'re selected as the winner. No further action is required.'
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
