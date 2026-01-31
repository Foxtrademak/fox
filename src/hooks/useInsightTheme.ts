import { useMemo } from 'react';
import type { SmartInsight } from '../lib/statistics';

export interface InsightThemeConfig {
  cardClass: string;
  iconContainerClass: string;
  titleClass: string;
  messageClass: string;
}

export function useInsightTheme(theme: 'light' | 'dark', type: SmartInsight['type']) {
  const themeConfig = useMemo(() => {
    const isSuccess = type === 'success';
    const isLight = theme === 'light';

    return {
      cardClass: isSuccess
        ? (isLight ? "bg-emerald-50/50 border-emerald-100" : "bg-emerald-500/5 border-emerald-500/10")
        : (isLight ? "bg-amber-50/50 border-amber-100" : "bg-amber-500/5 border-amber-500/10"),
      
      iconContainerClass: isSuccess
        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
        : "bg-amber-500/10 border-amber-500/20 text-amber-500",
      
      titleClass: isLight ? "text-slate-800" : "text-white/90",
      
      messageClass: isLight ? "text-slate-500" : "text-white/40"
    };
  }, [theme, type]);

  return themeConfig;
}
