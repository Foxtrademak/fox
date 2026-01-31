import React from 'react';

// Stable seed for consistent background generation
const generateBackgroundCandles = (count: number) => {
  return [...Array(count)].map((_, i) => {
    const seed = (i + 1) * 123.456;
    const pseudoRand = (s: number) => (Math.sin(s) + 1) / 2;
    
    return {
      height: 40 + pseudoRand(seed) * 100,
      y: 150 - (pseudoRand(seed * 2) * 100),
      isUp: pseudoRand(seed * 3) > 0.4,
      x: i * 35
    };
  });
};

const BACKGROUND_CANDLES = generateBackgroundCandles(30);

/**
 * Responsibility: Render the decorative SVG candlestick chart in the background.
 */
export const BackgroundCandleChart = React.memo(() => {
  const candles = BACKGROUND_CANDLES;

  return (
    <div 
      className="absolute top-[10%] left-[5%] w-full h-[30%] opacity-[0.5] rotate-[-5deg] scale-110 transform-gpu"
      style={{ contain: 'paint' }}
    >
      <svg viewBox="0 0 1000 300" className="w-full h-full will-change-transform">
        {candles.map((candle, i) => {
          const color = "#D4AF37"; // Golden
          return (
            <g key={i} transform={`translate(${candle.x}, ${candle.y})`}>
              <line x1="10" y1="-20" x2="10" y2={candle.height + 20} stroke={color} strokeWidth="1" />
              <rect 
                x="2" 
                y="0" 
                width="16" 
                height={candle.height} 
                fill={candle.isUp ? color : 'transparent'} 
                stroke={color} 
                strokeWidth="1.5"
                rx="1"
              />
            </g>
          );
        })}
        <path 
          d="M 0 200 Q 250 100 500 180 T 1000 50" 
          fill="none" 
          stroke="#D4AF37" 
          strokeWidth="2" 
          strokeDasharray="10 5" 
        />
      </svg>
    </div>
  );
});
