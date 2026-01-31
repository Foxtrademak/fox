import React from 'react';
import { Button } from '../../ui/Button';

interface TargetSubmitButtonProps {
  onClick: () => void;
}

/**
 * Responsibility: Specialized UI for the target update action button.
 */
export const TargetSubmitButton: React.FC<TargetSubmitButtonProps> = ({ onClick }) => {
  return (
    <Button 
      variant="primary"
      onClick={onClick}
      className="w-full py-5 rounded-[1.2rem] bg-amber-500 shadow-[0_10px_30px_rgba(245,158,11,0.2)] mt-4"
    >
      Update Ambitions
    </Button>
  );
};
