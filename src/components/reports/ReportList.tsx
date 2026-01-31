import React, { useRef } from 'react';
import { useReportData } from '../../hooks/useReportData';
import { useReportListVirtualization } from '../../hooks/useReportListVirtualization';
import { useUI } from '../../context/UIContext';
import { useData } from '../../context/DataContext';
import { useSettings } from '../../context/SettingsContext';
import { useImport } from '../../context/ImportContext';

// Responsibility-specific components
import { ReportEmptyState } from './list/ReportEmptyState';
import { ReportDateHeader } from './list/ReportDateHeader';
import { ReportGridRow } from './list/ReportGridRow';
import { ReportVirtualRow } from './list/ReportVirtualRow';

/**
 * Responsibility: Main Coordinator for the Report List.
 * Now a "Smart Component" pulling data directly from Contexts.
 */
export const ReportList: React.FC = () => {
  const { theme } = useUI();
  const {
    reportTrades,
    records,
  } = useData();
  const {
    reportSearchQuery,
    reportStatusFilter,
  } = useSettings();
  const {
    reportDateFilter,
    reportSortOrder,
  } = useImport();

  const reportData = useReportData({
    reportTrades,
    reportDateFilter,
    reportSearchQuery,
    reportStatusFilter,
    records,
    reportSortOrder
  });

  const { combinedItems } = reportData;
  const parentRef = useRef<HTMLDivElement>(null);

  // Responsibilities 1, 2, 3: Managed by the virtualization hook
  const { 
    virtualItems, 
    getTotalSize, 
    getVirtualItems 
  } = useReportListVirtualization(reportData, parentRef);

  // Responsibility 4: Empty State
  if (combinedItems.length === 0) {
    return <ReportEmptyState theme={theme} />;
  }

  return (
    <div 
      ref={parentRef}
      className="relative w-full"
      style={{ height: `${getTotalSize()}px` }}
    >
      {getVirtualItems().map((virtualRow) => {
        const item = virtualItems[virtualRow.index];
        
        // Responsibility 7: Absolute Positioning Wrapper
        return (
          <ReportVirtualRow 
            key={virtualRow.key}
            size={virtualRow.size}
            start={virtualRow.start}
          >
            {item.type === 'header' ? (
              // Responsibility 5: Header Rendering
              <ReportDateHeader 
                formattedDate={item.formattedDate}
                dailyPL={item.dailyPL}
                theme={theme}
              />
            ) : (
              // Responsibility 6: Grid Orchestration
              <ReportGridRow 
                items={item.items} 
                theme={theme} 
              />
            )}
          </ReportVirtualRow>
        );
      })}
    </div>
  );
};
