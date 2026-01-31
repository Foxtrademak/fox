import React from 'react';
import { StatsOverview } from './StatsOverview';

/**
 * Responsibility: Main Container for the Analytics Tab.
 * Simplified by converting StatsOverview into a smart component.
 */
export const AnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-32">
      <StatsOverview />
    </div>
  );
};
