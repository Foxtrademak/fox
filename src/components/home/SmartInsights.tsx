import React from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { InsightItem } from './insights/InsightItem';
import { useUI } from '../../context/UIContext';
import { useData } from '../../context/DataContext';

export const SmartInsights = React.memo(function SmartInsights() {
  const { theme } = useUI();
  const { insights } = useData();
  if (insights.length === 0) return null;

  return (
    <div className="space-y-4 px-2 sm:px-0">
      <SectionLabel label="AI Smart Insights" theme={theme} dotColor="bg-primary/40" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {insights.map((insight, idx) => (
          <InsightItem key={idx} insight={insight} theme={theme} />
        ))}
      </div>
    </div>
  );
});
