
import React from 'react';

const Logo: React.FC<{ className?: string; showText?: boolean }> = ({ className = "w-24 h-24", showText = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-full aspect-square">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
          <defs>
            <linearGradient id="logoGradient" x1="40" y1="40" x2="360" y2="360" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>

          {/* Fundo Azul Claro Gradiente Original */}
          <rect x="40" y="40" width="320" height="320" rx="64" fill="url(#logoGradient)" />
          
          {/* Estrutura da Balança Minimalista */}
          <g transform="translate(0, -15)">
            <path 
              d="M200 90 V230 M180 230 H220" 
              stroke="#1B3B7D" 
              strokeWidth="10" 
              strokeLinecap="round" 
            />
            <path 
              d="M90 130 Q200 90 310 130" 
              stroke="#1B3B7D" 
              strokeWidth="10" 
              strokeLinecap="round" 
              fill="none"
            />
            <g>
               <line x1="90" y1="130" x2="65" y2="190" stroke="#1B3B7D" strokeWidth="3" />
               <line x1="90" y1="130" x2="115" y2="190" stroke="#1B3B7D" strokeWidth="3" />
               <path d="M65 190 Q90 220 115 190 Z" fill="#1B3B7D" />
            </g>
            <g>
               <line x1="310" y1="130" x2="285" y2="190" stroke="#1B3B7D" strokeWidth="3" />
               <line x1="310" y1="130" x2="335" y2="190" stroke="#1B3B7D" strokeWidth="3" />
               <path d="M285 190 Q310 220 335 190 Z" fill="#1B3B7D" />
            </g>
            <circle cx="200" cy="110" r="6" fill="white" stroke="#1B3B7D" strokeWidth="4" />
          </g>
          
          <text 
            x="200" 
            y="300" 
            textAnchor="middle" 
            fill="#1B3B7D" 
            style={{ 
              fontSize: '80px', 
              fontWeight: 900, 
              fontFamily: 'Inter, sans-serif', 
              letterSpacing: '-0.05em',
            }}
          >
            VSM
          </text>
        </svg>
      </div>
      
      {showText && (
        <div className="mt-3 text-center">
          <p className="text-[#1B3B7D] font-bold text-[10px] uppercase tracking-[0.4em]">Study Guide</p>
        </div>
      )}
    </div>
  );
};

export default Logo;
