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
          "w-[1080px] h-[1920px] flex flex-col items-center justify-between p-20 relative overflow-hidden",
          "bg-black bg-cover bg-center"
        )}
        style={{
          backgroundImage: `url(${background})`,
          imageRendering: 'crisp-edges',
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        {/* Background Elements */}
        <div className={cn(
          "absolute top-[-5%] left-[-5%] w-[60%] h-[40%] blur-[180px] rounded-full",
          "bg-primary/20"
        )} />
        <div className={cn(
          "absolute bottom-[-5%] right-[-5%] w-[60%] h-[40%] blur-[180px] rounded-full",
          "bg-primary/10"
        )} />
        
        {/* Top Section: Logo & Brand */}
        <div className="z-10 flex flex-col items-center space-y-6 mt-16">
          <div className="relative">
            <div className={cn(
              "absolute inset-0 blur-3xl rounded-full scale-150",
              "bg-primary/30"
            )} />
            <div className={cn(
              "w-40 h-40 backdrop-blur-3xl rounded-[2.5rem] border flex items-center justify-center p-5 relative z-10 shadow-2xl",
              "bg-white/5 border-white/10"
            )}>
              <img src={logo} alt="Fox Trade" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]" />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <h1 className={cn(
              "text-4xl font-black tracking-[0.6em] uppercase translate-x-[0.3em]",
              "text-white"
            )}>Fox Trade</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </div>

        {/* Main Content: Profit/Loss */}
        <div className="z-10 flex flex-col items-center space-y-6 w-full">
          <div className={cn(
            "px-6 py-2 border rounded-full backdrop-blur-3xl",
            "bg-white/[0.06] border-white/[0.05]"
          )}>
            <span className={cn(
              "text-lg font-black uppercase tracking-[0.4em]",
              "text-white/40"
            )}>{data.period} Performance</span>
          </div>

          <div className="relative group">
            <div className={cn(
              "absolute inset-0 blur-[100px] opacity-30 scale-150",
              isPositive ? "bg-green-500" : "bg-red-500"
            )} />
            <div className="relative flex flex-col items-center space-y-2">
              <span className={cn(
                "text-[120px] font-black tracking-tighter leading-none",
                isPositive ? "text-green-500" : "text-red-500"
              )}>
                {isPositive ? '+' : ''}{data.totalProfit.toLocaleString()}
                <span className={cn(
                  "text-3xl font-light ml-3 opacity-50",
                  "text-white"
                )}>$</span>
              </span>
            </div>
          </div>

          <div className={cn(
            "flex items-center gap-5 px-8 py-4 rounded-[2.5rem] border-2 backdrop-blur-3xl transition-all duration-500",
            isPositive 
              ? "bg-green-500/10 border-green-500/20 text-green-500"
              : "bg-red-500/10 border-red-500/20 text-red-500"
          )}>
            {isPositive ? <TrendingUp className="w-10 h-10" /> : <TrendingDown className="w-10 h-10" />}
            <span className="text-4xl font-black tracking-tight">
              {isPositive ? '+' : ''}{data.growthPercentage.toFixed(1)}% Growth
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="z-10 grid grid-cols-2 gap-6 w-full px-8">
          <div className={cn(
            "ios-card overflow-visible border rounded-[2.5rem] p-8 flex flex-col items-center space-y-3 backdrop-blur-xl",
            "bg-white/[0.05] border-white/[0.05]"
          )}>
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center w-full overflow-hidden">
              <p className={cn(
                "text-lg font-black uppercase tracking-widest mb-1",
                "text-white/20"
              )}>Win Rate</p>
              <p className={cn(
                "text-4xl font-black truncate px-2",
                "text-white"
              )}>{Math.round(data.winRate)}%</p>
            </div>
          </div>

          <div className={cn(
            "border rounded-[2.5rem] p-8 flex flex-col items-center space-y-3 backdrop-blur-xl",
            "bg-white/[0.05] border-white/[0.05]"
          )}>
            <div className="p-4 bg-amber-500/10 rounded-2xl">
              <Sparkles className="w-10 h-10 text-amber-500" />
            </div>
            <div className="text-center w-full overflow-hidden">
              <p className={cn(
                "text-lg font-black uppercase tracking-widest mb-1",
                "text-white/20"
              )}>Health Score</p>
              <p className={cn(
                "text-4xl font-black truncate px-2",
                "text-white"
              )}>{Math.round(data.healthScore)}%</p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Footer */}
        <div className="z-10 w-full flex flex-col items-center space-y-6 mb-8">
          <div className={cn(
            "flex items-center gap-5 px-6 py-3 border rounded-full",
            "bg-white/[0.05] border-white/[0.05]"
          )}>
            <Wallet className={cn("w-5 h-5", "text-white/20")} />
            <span className={cn(
              "text-lg font-black uppercase tracking-[0.3em]",
              "text-white/40"
            )}>
              Portfolio Value: <span className="text-white">${data.currentCapital.toLocaleString()}</span>
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <p className={cn(
              "text-base font-black uppercase tracking-[0.6em]",
              "text-white/10"
            )}>Professional Trading Companion</p>
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_15px_rgba(var(--primary-rgb),1)]" />
              <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary/30" />
            </div>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 border-t-4 border-r-4 border-primary/20 rounded-tr-[10rem] -translate-x-10 translate-y-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 border-b-4 border-l-4 border-primary/20 rounded-bl-[10rem] translate-x-10 -translate-y-10" />
      </div>
    </div>
  );
};
