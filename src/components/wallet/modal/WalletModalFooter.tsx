
import React from 'react';
import { Link } from 'react-router-dom';

const WalletModalFooter: React.FC = () => {
  return (
    <div className="px-6 pb-6">
      <p className="text-center text-xs text-zinc-500 leading-relaxed">
        By connecting, you agree to our{' '}
        <Link to="/terms" className="text-gold-400 hover:text-gold-300 hover:underline transition-colors">
          Terms
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-gold-400 hover:text-gold-300 hover:underline transition-colors">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default WalletModalFooter;
