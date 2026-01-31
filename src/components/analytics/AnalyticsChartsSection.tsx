import React, { Suspense, lazy } from 'react';

const PortfolioGrowthChart = lazy(() => import('./PortfolioGrowthChart').then(m => ({ default: m.PortfolioGrowthChart })));
const WeeklyPerformanceChart = lazy(() => import('./WeeklyPerformanceChart').then(m => ({ default: m.WeeklyPerformanceChart })));
const DailyDistributionChart = lazy(() => import('./DailyDistributionChart').then(m => ({ default: m.DailyDistributionChart })));
const SessionAnalysisGrid = lazy(() => import('./SessionAnalysisGrid').then(m => ({ default: m.SessionAnalysisGrid })));

/**
 * Responsibility: Orchestrating the charts and analytics visualizations.
 * Smart Component: Pulls data directly from DataContext and UIContext.
 * Uses Suspense for lazy-loaded chart components.
 */
export const AnalyticsChartsSection: React.FC = () => {
  return (
    <div className="space-y-6 pt-4 relative z-10">
      <Suspense fallback={<div className="h-[400px] w-full animate-pulse bg-white/[0.02] rounded-[3rem]" />}>
        {/* Portfolio Growth Chart */}
        <PortfolioGrowthChart />

        {/* Performance Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeeklyPerformanceChart />
          <DailyDistributionChart />
        </div>

        {/* Session Profitability Analysis */}
        <SessionAnalysisGrid />
      </Suspense>
    </div>
  );
};
