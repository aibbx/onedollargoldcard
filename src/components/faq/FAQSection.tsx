
import React from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  title: string;
  questions: FAQItem[];
}

const FAQSection = ({ title, questions }: FAQSectionProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 border border-gold-100 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gold-600 text-left">{title}</h2>
      <div className="space-y-6">
        {questions.map((item, qIndex) => (
          <div key={qIndex} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <h3 className="text-lg font-medium text-gray-900 mb-2 text-left">{item.q}</h3>
            <p className="text-gray-600 text-left">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
