import React from 'react';
import { TargetVisibilityField } from './TargetVisibilityField';
import { TargetInputFields } from './TargetInputFields';
import { TargetSubmitButton } from './TargetSubmitButton';

interface TargetsModalContentProps {
  showTargetsOnHome: boolean;
  setShowTargetsOnHome: (val: boolean) => void;
  weeklyTarget: number;
  setWeeklyTarget: (val: number) => void;
  monthlyTarget: number;
  setMonthlyTarget: (val: number) => void;
  handleUpdate: () => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Coordinating the internal layout and grouping of Target-related components.
 */
export const TargetsModalContent: React.FC<TargetsModalContentProps> = ({
  showTargetsOnHome,
  setShowTargetsOnHome,
  weeklyTarget,
  setWeeklyTarget,
  monthlyTarget,
  setMonthlyTarget,
  handleUpdate,
  theme
}) => {
  return (
    <div className="relative z-10 space-y-6">
      <TargetVisibilityField 
        showTargetsOnHome={showTargetsOnHome}
        setShowTargetsOnHome={setShowTargetsOnHome}
        theme={theme}
      />

      <TargetInputFields 
        weeklyTarget={weeklyTarget}
        setWeeklyTarget={setWeeklyTarget}
        monthlyTarget={monthlyTarget}
        setMonthlyTarget={setMonthlyTarget}
        theme={theme}
      />

      <TargetSubmitButton onClick={handleUpdate} />
    </div>
  );
};
