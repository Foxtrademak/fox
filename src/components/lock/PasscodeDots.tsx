import React from 'react';
import { cn } from '../../lib/utils';

interface PasscodeDotsProps {
  length: number;
  error: boolean;
}

export const PasscodeDots = React.memo(function PasscodeDots({ length, error }: PasscodeDotsProps) {
  return (
    <div className="flex gap-6 mb-16">
      {[...Array(4)].map((_, i) => (
        <div 
          key={i}
          className={cn(
            "w-4 h-4 rounded-full border-2 transition-all duration-300",
            i < length 
              ? (error ? "bg-red-500 border-red-500 scale-125" : "bg-primary border-primary scale-125")
              : "border-white/10"
          )}
        />
      ))}
    </div>
  );
});
