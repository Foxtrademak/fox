import React from 'react';
import { cn } from '../lib/utils';
import { ReportsStickyHeader } from './reports/ReportsStickyHeader';
import { ReportFilters } from './reports/ReportFilters';
import { ReportList } from './reports/ReportList';
import { useUI } from '../context/UIContext';

/**
 * Responsibility: Main Orchestrator for the Reports Tab.
 * Simplified by extracting sticky header and converting sub-components to smart components.
 */
export const ReportsTab: React.FC = () => {
  const { isScrolled } = useUI();

  return (
    <div className="space-y-10 animate-fade-in pb-32">
      <ReportsStickyHeader />
      
      <div className={cn(
        "sticky top-0 z-[100] transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]",
        isScrolled ? "pt-2 pb-0" : "pt-0 pb-2"
      )}>
        <ReportFilters />
      </div>

      <div className="space-y-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <ReportList />
      </div>
    </div>
  );
};
