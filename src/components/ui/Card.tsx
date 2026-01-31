import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps<T extends React.ElementType = 'div'> {
  as?: T;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'mini' | 'glass';
}

export const Card = <T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  variant = 'default',
  ...props
}: CardProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Component = as || 'div';
  
  const variants = {
    default: "ios-card shadow-2xl",
    mini: "ios-card-mini shadow-lg",
    glass: "ios-card-mini bg-white/10 backdrop-blur-xl border-white/20"
  };

  return (
    <Component
      className={cn(
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
