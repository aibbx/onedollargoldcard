
import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';

const ContactSection = () => {
  return (
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
  );
};

export default ContactSection;
