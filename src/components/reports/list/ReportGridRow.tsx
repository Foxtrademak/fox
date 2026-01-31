import React from 'react';
import { ReportItem } from '../ReportItem';
import type { CombinedItem } from '../../../hooks/useReportData';

interface ReportGridRowProps {
  items: CombinedItem[];
  theme: 'light' | 'dark';
}

/**
 * Responsibility 6: Responsive Grid Orchestration
 * Manages the layout grid for report items (Trades/Withdrawals)
 */
export const ReportGridRow: React.FC<ReportGridRowProps> = ({ items, theme }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 pb-6 w-full">
      {items.map((reportItem) => (
        <ReportItem 
          key={reportItem.type === 'trade' ? reportItem.data.positionId : reportItem.data.id} 
          item={reportItem} 
          theme={theme} 
        />
      ))}
    </div>
  );
};
