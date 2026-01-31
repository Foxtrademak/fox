import React from 'react';

interface ReportVirtualRowProps {
  size: number;
  start: number;
  children: React.ReactNode;
}

/**
 * Responsibility 7: Absolute Positioning Logic
 * Handles the absolute positioning and sizing for virtualized rows
 */
export const ReportVirtualRow: React.FC<ReportVirtualRowProps> = ({ 
  size, 
  start, 
  children 
}) => {
  return (
    <div
      className="absolute top-0 left-0 w-full"
      style={{
        height: `${size}px`,
        transform: `translateY(${start}px)`,
      }}
    >
      {children}
    </div>
  );
};
