import React from 'react';
import { cn } from '../../../lib/utils';
import { Input } from '../../ui/Input';

interface TargetInputFieldsProps {
  weeklyTarget: number;
  setWeeklyTarget: (val: number) => void;
  monthlyTarget: number;
  setMonthlyTarget: (val: number) => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Handling numerical inputs for weekly and monthly profit goals.
 */
export const TargetInputFields: React.FC<TargetInputFieldsProps> = ({
  weeklyTarget,
  setWeeklyTarget,
  monthlyTarget,
  setMonthlyTarget,
  theme
}) => {
  return (
    <div className="space-y-4">
      <Input
        label="Weekly Goal ($)"
        type="number"
        value={weeklyTarget}
        onChange={(e) => setWeeklyTarget(Number(e.target.value))}
        theme={theme}
        className={cn(theme === 'light' ? "focus:border-amber-500/50" : "focus:border-amber-500/30")}
      />
      <Input
        label="Monthly Goal ($)"
        type="number"
        value={monthlyTarget}
        onChange={(e) => setMonthlyTarget(Number(e.target.value))}
        theme={theme}
        className={cn(theme === 'light' ? "focus:border-amber-500/50" : "focus:border-amber-500/30")}
      />
    </div>
  );
};
