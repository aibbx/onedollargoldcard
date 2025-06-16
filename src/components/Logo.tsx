
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer gold ring */}
        <circle 
          cx="50" 
          cy="50" 
          r="48" 
          fill="url(#goldGradient)"
          stroke="#B8860B"
          strokeWidth="2"
        />
        
        {/* Inner darker gold circle */}
        <circle 
          cx="50" 
          cy="50" 
          r="38" 
          fill="url(#darkGoldGradient)"
        />
        
        {/* The number "1" */}
        <text 
          x="50" 
          y="65" 
          textAnchor="middle" 
          fontSize="40" 
          fontWeight="bold" 
          fill="white"
          fontFamily="Georgia, serif"
        >
          1
        </text>
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="darkGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DAA520" />
            <stop offset="50%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
