import React from 'react';
import { X } from 'lucide-react';
import { cn, haptic } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  theme?: 'light' | 'dark';
  className?: string;
  icon?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  theme = 'dark',
  className,
  icon
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    haptic('light');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div 
        className="fixed inset-0 bg-black/60" 
        onClick={handleClose} 
      />
      <div className={cn(
        "relative w-full max-w-sm border-none rounded-[2.5rem] p-8 animate-in zoom-in duration-300 shadow-2xl overflow-hidden backdrop-blur-xl",
        theme === 'light' ? "bg-white/95" : "bg-white/[0.05]",
        className
      )}>
        {/* Glass Edge Border Overlay */}
        <div className={cn(
          "absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-all duration-500",
          theme === 'light' ? "border-[0.5px] border-black/5" : "border-[0.5px] border-white/20",
          "shadow-[inset_0_0_1px_rgba(255,255,255,0.1)]"
        )} />

        <button 
          onClick={handleClose}
          className={cn(
            "absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all z-40 active:scale-90",
            theme === 'light' ? "bg-black/5 text-slate-400 hover:text-slate-600" : "bg-white/5 text-white/40 hover:text-white/60"
          )}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10">
          {(icon || title || subtitle) && (
            <div className="text-center mb-8">
              {icon && (
                <div className={cn(
                  "w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 border",
                  theme === 'light' ? "bg-slate-50 border-slate-100" : "bg-white/[0.05] border border-white/[0.05]"
                )}>
                  {icon}
                </div>
              )}
              {title && (
                <h3 className={cn(
                  "text-2xl font-black mb-2 tracking-tighter",
                  theme === 'light' ? "text-slate-800" : "text-white"
                )}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={cn(
                  "text-[10px] font-black uppercase tracking-[0.3em] opacity-40",
                  theme === 'light' ? "text-slate-900" : "text-white"
                )}>
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
