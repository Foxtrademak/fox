import { useMemo } from 'react';
import type { Statistics } from '../lib/statistics';

export interface ThemeConfig {
  cardBg: string;
  stackLayer1: string;
  stackLayer2: string;
  labelBg: string;
  boxBg: string;
  textDim: string;
  textMain: string;
  edgeBorder: string;
  glossyOverlay: string;
  lineGradient: string;
  overallResults: {
    positive: string;
    negative: string;
  };
  profitIcon: {
    positive: string;
    negative: string;
  };
}

export const useNetPerformanceTheme = (theme: 'light' | 'dark', stats: Statistics) => {
  const themeConfig = useMemo((): ThemeConfig => ({
    cardBg: theme === 'light' ? "bg-white/60 border-white/60" : "bg-white/[0.05] border-white/[0.05]",
    stackLayer1: theme === 'light' ? "bg-white/40 border-white/40" : "bg-white/[0.05] border-white/[0.06]",
    stackLayer2: theme === 'light' ? "bg-white/20 border-white/20" : "bg-white/[0.005] border-white/[0.05]",
    labelBg: theme === 'light' ? "bg-black/[0.05] border-black/[0.06]" : "bg-white/[0.005] border-white/[0.05]",
    boxBg: theme === 'light' ? "bg-white/30 border-white/50 hover:bg-white/50" : "bg-white/[0.05] border-white/[0.05] hover:bg-white/[0.04]",
    textDim: theme === 'light' ? "text-slate-900/30" : "text-white/20",
    textMain: theme === 'light' ? "text-slate-900" : "text-white",
    edgeBorder: theme === 'light' ? "border-black/5" : "border-white/10",
    glossyOverlay: theme === 'light' ? "bg-gradient-to-tr from-white/10 to-transparent" : "bg-gradient-to-tr from-white/[0.05] to-transparent",
    lineGradient: theme === 'light' ? "from-black/5" : "from-white/5",
    overallResults: {
      positive: theme === 'light' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" : "bg-emerald-500/5 border-emerald-500/15 text-emerald-500/60",
      negative: theme === 'light' ? "bg-rose-500/10 border-rose-500/20 text-rose-600" : "bg-rose-500/5 border-rose-500/15 text-rose-500/60"
    },
    profitIcon: {
      positive: theme === 'light' ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600" : "bg-emerald-500/5 border-emerald-500/10 text-emerald-500",
      negative: theme === 'light' ? "bg-rose-500/10 border-rose-500/20 text-rose-600" : "bg-rose-500/5 border-rose-500/10 text-rose-500"
    }
  }), [theme]);

  const isPositive = stats.totalProfit >= 0;
  
  return {
    themeConfig,
    isPositive,
    profitColor: isPositive ? "text-emerald-500" : "text-rose-500",
    profitIconStyle: isPositive ? themeConfig.profitIcon.positive : themeConfig.profitIcon.negative,
    overallResultsStyle: isPositive ? themeConfig.overallResults.positive : themeConfig.overallResults.negative
  };
};
