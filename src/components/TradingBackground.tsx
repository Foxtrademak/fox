import { 
  Activity, 
  Target, 
  MousePointer2, 
  Ruler, 
  PenTool,
  CandlestickChart
} from 'lucide-react';
import logo from '../assets/app-logo-new.png';

export function TradingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Side Logos - Giant & Half visible on each side (Lower Transparency) */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-[300px] sm:-left-[500px] w-[600px] sm:w-[1000px] aspect-square opacity-[0.06] blur-[1px]">
        <img 
          src={logo} 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-[300px] sm:-right-[500px] w-[600px] sm:w-[1000px] aspect-square opacity-[0.06] blur-[1px]">
        <img 
          src={logo} 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute inset-0 opacity-[0.07]">
        {/* Background Trading Chart Pattern (Candlesticks) */}
      <div className="absolute top-[10%] left-[5%] w-full h-[30%] opacity-[0.5] rotate-[-5deg] scale-110">
        <svg viewBox="0 0 1000 300" className="w-full h-full">
          {/* Mock Candlestick Chart */}
          {[...Array(30)].map((_, i) => {
            const height = 40 + Math.random() * 100;
            const y = 150 - (Math.random() * 100);
            const isUp = Math.random() > 0.4;
            const color = "#D4AF37"; // Golden
            return (
              <g key={i} transform={`translate(${i * 35}, ${y})`}>
                <line x1="10" y1="-20" x2="10" y2={height + 20} stroke={color} strokeWidth="1" />
                <rect 
                  x="2" 
                  y="0" 
                  width="16" 
                  height={height} 
                  fill={isUp ? color : 'transparent'} 
                  stroke={color} 
                  strokeWidth="1.5"
                  rx="1"
                />
              </g>
            );
          })}
          {/* Trend Line */}
          <path 
            d="M 0 200 Q 250 100 500 180 T 1000 50" 
            fill="none" 
            stroke="#D4AF37" 
            strokeWidth="2" 
            strokeDasharray="10 5" 
          />
        </svg>
      </div>

      {/* Floating Trading Tools Icons */}
      <div className="absolute top-[5%] right-[10%]">
        <Target className="w-16 h-16 text-[#D4AF37]" strokeWidth={1} />
      </div>
      
      <div className="absolute top-[40%] left-[15%] rotate-12">
        <PenTool className="w-12 h-12 text-[#D4AF37]" strokeWidth={1} />
      </div>

      <div className="absolute bottom-[20%] right-[15%] -rotate-12 opacity-80">
        <Ruler className="w-20 h-20 text-[#D4AF37]" strokeWidth={1} />
      </div>

      <div className="absolute top-[60%] right-[5%] rotate-[-15deg]">
        <MousePointer2 className="w-10 h-10 text-[#D4AF37]" strokeWidth={1} />
      </div>

      <div className="absolute bottom-[10%] left-[10%] opacity-40">
        <CandlestickChart className="w-24 h-24 text-[#D4AF37]" strokeWidth={0.5} />
      </div>

      {/* Another Chart at bottom */}
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

      {/* Center Trading Symbols */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <Activity className="w-96 h-96 text-[#D4AF37]" strokeWidth={0.5} />
      </div>
    </div>
  </div>
);
}
