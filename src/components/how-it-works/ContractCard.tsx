
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import InfoPoint from './InfoPoint';
import { ContractSection } from './contractData';

interface ContractCardProps {
  section: ContractSection;
  isOpen: boolean;
  toggleOpen: () => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ section, isOpen, toggleOpen }) => {
  return (
    <div className="mb-8 rounded-lg overflow-hidden border border-gray-200 transition-shadow duration-300 hover:shadow-lg bg-white">
      <div 
        className="bg-gradient-to-r from-gray-50 to-white p-6 flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            {section.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
        </div>
        <button
          className="text-gray-500 hover:text-gold-500 transition-colors"
          aria-label={isOpen ? "Collapse section" : "Expand section"}
        >
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="p-6 animate-fadeIn">
          <p className="text-gray-700 mb-6">{section.description}</p>
          
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-300"></div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono ml-3 shadow-md whitespace-pre text-left">
              <code>{section.code}</code>
            </pre>
          </div>
          
          <div className="mt-6 bg-gold-50 p-6 rounded-lg border border-gold-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Security Features</h4>
            <ul className="space-y-2">
              {section.securityPoints.map((point, index) => (
                <InfoPoint key={index} text={point} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractCard;
