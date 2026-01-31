import { memo } from 'react';
import { useUI } from '../context/UIContext';
import { cn } from '../lib/utils';
import { NetPerformanceHeader } from './analytics/NetPerformanceHeader';
import { StatsSummaryGrid } from './analytics/StatsSummaryGrid';
import { AnalyticsChartsSection } from './analytics/AnalyticsChartsSection';

/**
 * Responsibility: Main Orchestrator for the Analytics Tab.
 * Simplified by extracting sticky header, summary grid, and charts section into smart components.
 */
export const StatsOverview = memo(function StatsOverview() {
  const { isScrolled } = useUI();

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 px-0 sm:px-4 relative">
      
      {/* iOS Top Fade Effect */}
      <div className={cn(
        "fixed top-0 inset-x-0 h-40 z-[90] pointer-events-none transition-opacity duration-500 opacity-0"
      )} />

      {/* Gradient Blur Effect */}
      <div className={cn("gradient-blur-header", isScrolled && "is-scrolled")} style={{ zIndex: 90 }} />

      {/* Sticky Header Section */}
      <NetPerformanceHeader />

      {/* Stat Cards Grid */}
      <StatsSummaryGrid />

      {/* Main Content Area */}
      <AnalyticsChartsSection />
    </div>
  );
});
