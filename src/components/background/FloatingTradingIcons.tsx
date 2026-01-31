import React from 'react';
import { Target, PenTool, Ruler, MousePointer2, CandlestickChart } from 'lucide-react';

/**
 * Responsibility: Render floating trading-related icons for background decoration.
 */
export const FloatingTradingIcons = React.memo(() => {
  return (
    <div className="absolute inset-0 transform-gpu" style={{ contain: 'paint' }}>
      <div className="absolute top-[5%] right-[10%] transform-gpu">
        <Target className="w-16 h-16 text-[#D4AF37]" strokeWidth={1} />
      </div>
      
      <div className="absolute top-[40%] left-[15%] rotate-12 transform-gpu">
        <PenTool className="w-12 h-12 text-[#D4AF37]" strokeWidth={1} />
      </div>

      <div className="absolute bottom-[20%] right-[15%] -rotate-12 opacity-80 transform-gpu">
        <Ruler className="w-20 h-20 text-[#D4AF37]" strokeWidth={1} />
      </div>

      <div className="absolute top-[60%] right-[5%] rotate-[-15deg] transform-gpu">
        <MousePointer2 className="w-10 h-10 text-[#D4AF37]" strokeWidth={1} />
      </div>

      <div className="absolute bottom-[10%] left-[10%] opacity-40 transform-gpu">
        <CandlestickChart className="w-24 h-24 text-[#D4AF37]" strokeWidth={0.5} />
      </div>
    </div>
  );
});
