import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { cn } from '../../lib/utils';
import { Card } from '../ui/Card';
import { ChartGradients } from '../charts/ChartGradients';
import { useData } from '../../context/DataContext';
import { useUI } from '../../context/UIContext';

interface DailyDistributionChartProps {
  className?: string;
}

export const DailyDistributionChart = React.memo(function DailyDistributionChart({
  className
}: DailyDistributionChartProps) {
  const { periodStats } = useData();
  const { theme } = useUI();
  
  const chartData = useMemo(() => periodStats.daily.slice(-15), [periodStats.daily]);

  const themeConfig = useMemo(() => ({
    gridStroke: theme === 'light' ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.02)",
    tickFill: theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.2)',
    cursorFill: theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
    tooltipBg: theme === 'light' ? 'rgba(255,255,255,0.9)' : 'rgba(10,10,12,0.8)',
    tooltipBorder: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
    textMain: theme === 'light' ? '#0f172a' : '#ffffff'
  }), [theme]);

  return (
    <Card 
      className={cn(
        "border overflow-hidden sm:overflow-visible p-8 shadow-2xl relative group rounded-[3rem]",
        theme === 'light' ? "bg-white/60 border-white/60" : "bg-white/[0.05] border-white/[0.05]",
        className
      )}
    >
      <div className="flex items-center justify-between relative z-10 mb-8">
        <p className={cn("text-[9px] font-black uppercase tracking-[0.3em]", theme === 'light' ? "text-slate-900/40" : "text-white/30")}>
          Daily Distribution (Last 15 Days)
        </p>
        <div className={cn("w-2 h-2 rounded-full", theme === 'light' ? "bg-black/10" : "bg-white/10")} />
      </div>
      
      <div className="h-[200px] w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 0, left: -30, bottom: 0 }}>
            <ChartGradients />
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={themeConfig.gridStroke} 
              vertical={false} 
            />
            <XAxis 
              dataKey="label" 
              fontSize={8} 
              tickLine={false} 
              axisLine={false} 
              tick={{ fill: themeConfig.tickFill, fontWeight: 900 }}
            />
            <Tooltip 
              cursor={{ fill: themeConfig.cursorFill }}
              contentStyle={{ 
                backgroundColor: themeConfig.tooltipBg, 
                border: themeConfig.tooltipBorder,
                borderRadius: '16px',
                fontSize: '10px',
                fontWeight: '900',
                color: themeConfig.textMain
              }}
              itemStyle={{ color: themeConfig.textMain }}
            />
            <Bar dataKey="profit" radius={[4, 4, 0, 0]} barSize={18}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-daily-${index}`} 
                  fill={entry.profit >= 0 ? 'url(#barGradientPositive)' : 'url(#barGradientNegative)'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
});

