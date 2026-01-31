import { cn } from '../../../lib/utils';
import type { ThemeConfig } from '../../../hooks/useNetPerformanceTheme';

export const HeaderBackground = ({ isScrolled, themeConfig }: { isScrolled: boolean; themeConfig: ThemeConfig }) => (
  <>
    {/* Transparent Mask */}
    <div className={cn(
        "fixed inset-x-0 top-0 h-[120px] -z-10 transition-opacity duration-150 gpu-accelerated will-change-[opacity,backdrop-filter] hidden sm:block",
        isScrolled ? "opacity-100" : "opacity-0"
      )} style={{ 
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
      }} />

    {/* Bottom Stack Layers */}
    <div className={cn(
      "absolute -bottom-2 inset-x-6 h-12 rounded-[2.5rem] -z-10 transition-all duration-500 border",
      themeConfig.stackLayer1,
      isScrolled ? "sm:opacity-100 sm:translate-y-1 sm:scale-[0.94] opacity-0" : "opacity-0 translate-y-0 scale-100"
    )} />
    <div className={cn(
      "absolute -bottom-4 inset-x-10 h-12 rounded-[2.5rem] -z-20 transition-all duration-500 border",
      themeConfig.stackLayer2,
      isScrolled ? "sm:opacity-60 sm:translate-y-2 sm:scale-[0.88] opacity-0" : "opacity-0 translate-y-0 scale-100"
    )} />
  </>
);
