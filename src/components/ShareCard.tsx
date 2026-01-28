import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, Trophy, Wallet } from 'lucide-react';
import { cn } from '../lib/utils';
import logo from '../assets/app-logo-new.png';
import background from '../assets/background.png';

interface ShareCardProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  data: {
    totalProfit: number;
    growthPercentage: number;
    winRate: number;
    currentCapital: number;
    period: string;
    healthScore: number;
  };
  theme?: 'light' | 'dark';
}

export const ShareCard: React.FC<ShareCardProps> = ({ cardRef, data }) => {
  const isPositive = data.totalProfit >= 0;
  const theme = 'dark';

  return (
    <div className={cn("fixed left-[-9999px] top-[-9999px]", "bg-black")}>
      <div 
        ref={cardRef}
        className={cn(
          "w-[1080px] h-[1920px] flex flex-col items-center justify-center p-24 relative overflow-hidden",
          "bg-[#050507]"
        )}
        style={{
          imageRendering: 'crisp-edges',
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        {/* Background Image - Low Opacity to match app overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.08]"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Noise Texture for Premium Look */}
        <div className="absolute inset-0 z-1 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {/* Content Container */}
        <div className="z-10 w-full flex flex-col items-center space-y-24">
          
          {/* Header Identity */}
          <div className="flex flex-col items-center space-y-10">
            <div className="w-56 h-56 bg-white/[0.05] border border-white/[0.1] rounded-[4rem] flex items-center justify-center p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent" />
              <img src={logo} alt="Fox Trade" className="w-full h-full object-contain relative z-10" />
            </div>
            <div className="flex flex-col items-center space-y-6">
              <h1 className="text-7xl font-black tracking-[0.8em] uppercase translate-x-[0.4em] text-white/90">Fox Trade</h1>
              <div className="h-[2px] w-48 bg-white/10 rounded-full" />
              <p className="text-2xl font-black tracking-[0.5em] uppercase text-white/30">{data.period} Performance</p>
            </div>
          </div>

          {/* Main Profit Card - Premium Glass Style */}
          <div className="w-full relative px-10">
            <div className="ios-premium-card bg-white/[0.04] border border-white/[0.1] rounded-[5rem] p-24 flex flex-col items-center space-y-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden">
              {/* Inner Gloss */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent pointer-events-none" />
              <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-[inherit] pointer-events-none" />
              
              <div className="flex flex-col items-center space-y-6">
                <div className={cn(
                  "px-8 py-3 rounded-full text-lg font-black uppercase tracking-[0.3em] border shadow-inner",
                  isPositive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500/80" : "bg-rose-500/10 border-rose-500/20 text-rose-500/80"
                )}>
                  Net Result
                </div>
                <div className="flex items-baseline gap-6">
                  <span className={cn(
                    "text-[200px] font-black tracking-tighter leading-none drop-shadow-2xl",
                    isPositive ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {isPositive ? '+' : ''}{Math.round(data.totalProfit).toLocaleString()}
                  </span>
                  <span className="text-7xl font-black text-white/10">$</span>
                </div>
              </div>

              <div className={cn(
                "flex items-center gap-8 px-16 py-8 rounded-[2.5rem] border backdrop-blur-md",
                isPositive ? "bg-emerald-500/5 border-emerald-500/10 text-emerald-500" : "bg-rose-500/5 border-rose-500/10 text-rose-500"
              )}>
                {isPositive ? <TrendingUp className="w-16 h-16" /> : <TrendingDown className="w-16 h-16" />}
                <span className="text-6xl font-black tracking-tight">
                  {isPositive ? '+' : ''}{data.growthPercentage.toFixed(1)}% Growth
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Stats Grid */}
          <div className="grid grid-cols-2 gap-12 w-full px-10">
            <div className="ios-card bg-white/[0.04] border border-white/[0.1] rounded-[4rem] p-16 flex flex-col items-center space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
              <div className="w-24 h-24 bg-white/[0.05] rounded-3xl flex items-center justify-center border border-white/10 relative z-10">
                <Trophy className="w-12 h-12 text-white/40" />
              </div>
              <div className="text-center relative z-10">
                <p className="text-xl font-black tracking-[0.4em] uppercase text-white/20 mb-3">Win Rate</p>
                <p className="text-7xl font-black text-white/90">{Math.round(data.winRate)}%</p>
              </div>
            </div>

            <div className="ios-card bg-white/[0.04] border border-white/[0.1] rounded-[4rem] p-16 flex flex-col items-center space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
              <div className="w-24 h-24 bg-white/[0.05] rounded-3xl flex items-center justify-center border border-white/10 relative z-10">
                <Sparkles className="w-12 h-12 text-white/40" />
              </div>
              <div className="text-center relative z-10">
                <p className="text-xl font-black tracking-[0.4em] uppercase text-white/20 mb-3">Health</p>
                <p className="text-7xl font-black text-white/90">{Math.round(data.healthScore)}%</p>
              </div>
            </div>
          </div>

          {/* Footer Portfolio Value */}
          <div className="flex flex-col items-center space-y-16 pt-10">
            <div className="px-14 py-8 bg-white/[0.03] border border-white/[0.08] rounded-full flex items-center gap-8 shadow-xl backdrop-blur-xl">
              <Wallet className="w-10 h-10 text-white/20" />
              <span className="text-3xl font-black tracking-[0.4em] uppercase text-white/30">
                Portfolio: <span className="text-white/80">${data.currentCapital.toLocaleString()}</span>
              </span>
            </div>
            
            <div className="flex flex-col items-center space-y-6 opacity-20">
              <p className="text-2xl font-black tracking-[1em] uppercase text-white translate-x-[0.5em]">MAK GROUP SYSTEMS</p>
              <div className="h-[1px] w-48 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
