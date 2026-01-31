import React from 'react';
import { cn } from '../../lib/utils';

interface AppBackgroundProps {
  theme: 'light' | 'dark';
  isBlurred?: boolean;
}

export const AppBackground = React.memo(function AppBackground({ theme, isBlurred }: AppBackgroundProps) {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#0a0a0c]"
      style={{ contain: 'strict' }}
    >
      {/* Blurred Background Layer */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-500",
          isBlurred ? "opacity-100" : "opacity-0"
        )}
      >
        <img 
          src="/background.webp" 
          alt="" 
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover blur-[20px] scale-105 brightness-[0.5]"
        />
      </div>

      {/* Clear Background Layer */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-500",
          isBlurred ? "opacity-0" : "opacity-100"
        )}
      >
        <img 
          src="/background.webp" 
          alt="" 
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover blur-0 scale-100"
        />
      </div>
      
      {/* Theme Overlay for Readability */}
      <div className={cn(
        "absolute inset-0 transition-all duration-500 transform-gpu",
        theme === 'light' ? "bg-white/10" : "bg-black/92"
      )} />
      
      {/* Grain/Noise Texture for Premium Feel */}
      <div className={cn(
        "absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transform-gpu",
        theme === 'light' && "invert"
      )} />
    </div>
  );
});
