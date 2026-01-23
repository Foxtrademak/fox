import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import React from 'react';
import { type Statistics, type PeriodStats } from '../lib/statistics';
import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown, Target, Zap, Activity, Calendar, Award, AlertTriangle } from 'lucide-react';
import { TradeHeatmap } from './TradeHeatmap';
import { type DailyRecord } from '../types';

interface StatsOverviewProps {
  stats: Statistics;
  records: DailyRecord[];
  periodStats: {
    weekly: PeriodStats[];
    monthly: PeriodStats[];
    daily: PeriodStats[];
  };
}

export function StatsOverview({ stats, periodStats, records }: StatsOverviewProps) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Key Metrics Grid - 2x2 on Mobile */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatCard 
          label="Win Rate" 
          value={`${stats.winRate.toFixed(0)}%`} 
          icon={<Target className="w-4 h-4" />}
          subtext={`${stats.winningTrades}W - ${stats.losingTrades}L`}
          trend={stats.winRate >= 50 ? 'positive' : 'negative'}
        />
        <StatCard 
          label="Profit Factor" 
          value={stats.profitFactor.toFixed(2)} 
          icon={<Zap className="w-4 h-4" />}
          subtext="Gross W/L"
          trend={stats.profitFactor >= 1.5 ? 'positive' : stats.profitFactor >= 1 ? 'neutral' : 'negative'}
        />
        <StatCard 
          label="Max DD" 
          value={`${stats.maxDrawdown.toFixed(1)}%`} 
          icon={<TrendingDown className="w-4 h-4" />}
          subtext={`-$${Math.round(stats.maxDrawdownValue)}`}
          trend="negative"
        />
        <StatCard 
          label="Avg P/L" 
          value={`$${Math.round(stats.expectedValue)}`} 
          icon={<Activity className="w-4 h-4" />}
          subtext="Per Trade"
          trend={stats.expectedValue > 0 ? 'positive' : 'negative'}
        />
      </div>

      {/* Trade Analysis Section - 2x2 on Mobile */}
      <div className="grid grid-cols-2 gap-2.5">
        <StatCard 
          label="Avg Win" 
          value={`+$${Math.round(stats.averageWin)}`} 
          icon={<TrendingUp className="w-4 h-4" />}
          trend="positive"
        />
        <StatCard 
          label="Avg Loss" 
          value={`-$${Math.round(stats.averageLoss)}`} 
          icon={<TrendingDown className="w-4 h-4" />}
          trend="negative"
        />
        <StatCard 
          label="Best Day" 
          value={`+$${Math.round(stats.bestDay)}`} 
          icon={<Award className="w-4 h-4" />}
          trend="positive"
        />
        <StatCard 
          label="Worst Day" 
          value={`$${Math.round(stats.worstDay)}`} 
          icon={<AlertTriangle className="w-4 h-4" />}
          trend="negative"
        />
      </div>

      {/* Weekly Performance & Heatmap - Compact Stack */}
      <div className="flex flex-col gap-3">
        {/* Weekly Performance Chart - Reduced Height */}
        <div className="w-full h-[280px]">
          <div className="ios-card !p-4 text-center flex flex-col justify-between h-full !rounded-[2rem]">
            <div className="mb-2 relative z-10 flex flex-col items-center">
              <div className="p-2 bg-primary/10 rounded-xl mb-2 backdrop-blur-md border border-primary/10">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 bg-white/5 px-3 py-1 rounded-full inline-block border border-white/5">Weekly Performance</p>
            </div>

            <div className="flex-1 w-full relative z-10 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={periodStats.weekly.slice(-5)} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGradientPositive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ade80" stopOpacity={1} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="barGradientNegative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f87171" stopOpacity={1} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis 
                    dataKey="label" 
                    fontSize={8} 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontWeight: 800 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                    contentStyle={{ 
                      backgroundColor: 'rgba(28, 28, 30, 0.95)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '900',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar dataKey="profit" radius={[6, 6, 0, 0]}>
                    {periodStats.weekly.slice(-5).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.profit >= 0 ? 'url(#barGradientPositive)' : 'url(#barGradientNegative)'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="h-auto">
          <TradeHeatmap records={records} />
        </div>
      </div>
    </div>
  );  
}

function StatCard({ label, value, icon, subtext, trend }: { 
  label: string; 
  value: string | number; 
  icon: React.ReactNode;
  subtext?: string;
  trend?: 'positive' | 'negative' | 'neutral';
}) {
  return (
    <div className="ios-card !p-3.5 flex flex-col gap-1.5 !rounded-[1.5rem] relative overflow-hidden group">
      <div className="flex items-center justify-between relative z-10">
        <div className={cn(
          "p-1.5 rounded-lg",
          trend === 'positive' ? "bg-green-500/10 text-green-500" : 
          trend === 'negative' ? "bg-red-500/10 text-red-500" : 
          "bg-primary/10 text-primary"
        )}>
          {React.cloneElement(icon as React.ReactElement<any>, { className: "w-3.5 h-3.5" })}
        </div>
        {subtext && <span className="text-[7px] font-black text-muted-foreground/40 uppercase tracking-widest">{subtext}</span>}
      </div>
      <div className="relative z-10 text-left">
        <p className="text-[8px] font-black text-muted-foreground/50 uppercase tracking-[0.15em] mb-0.5">{label}</p>
        <p className={cn(
          "text-base font-black tracking-tighter",
          trend === 'positive' ? "text-green-400" : 
          trend === 'negative' ? "text-red-400" : 
          "text-white"
        )}>{value}</p>
      </div>
    </div>
  );
}
