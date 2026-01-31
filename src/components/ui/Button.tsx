import React from 'react';
import { cn, haptic } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'ios-mini';
  hapticType?: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  hapticType = 'light',
  isLoading,
  onClick,
  disabled,
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-black shadow-[0_10px_30px_rgba(255,184,0,0.15)] hover:opacity-90",
    secondary: "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10",
    danger: "bg-red-500 text-white shadow-[0_10px_30px_rgba(239,68,68,0.2)] hover:bg-red-600",
    ghost: "bg-transparent hover:bg-black/5 dark:hover:bg-white/5",
    'ios-mini': "ios-card-mini overflow-visible bg-white/40 border-white/60 dark:bg-white/[0.06] dark:border-white/10"
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hapticType) haptic(hapticType);
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        "relative flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100",
        variants[variant],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  );
};
