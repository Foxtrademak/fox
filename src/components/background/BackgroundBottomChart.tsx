import React from 'react';

/**
 * Responsibility: Render the SVG line chart decoration at the bottom of the background.
 */
export const BackgroundBottomChart = React.memo(() => {
  return (
    <div className="absolute bottom-[5%] left-[-5%] w-full h-[25%] opacity-[0.3] rotate-[3deg]">
      <svg viewBox="0 0 1000 200" className="w-full h-full">
        <path 
          d="M 0 100 C 100 120 200 50 300 80 S 500 150 600 120 800 30 1000 70" 
          fill="none" 
          stroke="#D4AF37" 
          strokeWidth="3" 
        />
        <path 
          d="M 0 100 C 100 120 200 50 300 80 S 500 150 600 120 800 30 1000 70 V 200 H 0 Z" 
          fill="url(#goldGradient)" 
          opacity="0.1"
        />
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
});
