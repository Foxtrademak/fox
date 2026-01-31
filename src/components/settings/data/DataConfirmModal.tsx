import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { cn, haptic } from '../../../lib/utils';

export type ConfirmActionType = 'reload' | 'reset' | 'reset_reports' | 'reset_reports_date';

export interface ConfirmAction {
  type: ConfirmActionType;
  title: string;
  message: string;
}

interface DataConfirmModalProps {
  confirmAction: ConfirmAction | null;
  onClose: () => void;
  onConfirm: (type: ConfirmActionType) => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Shared Confirmation Modal for Critical Data Operations
 */
export const DataConfirmModal: React.FC<DataConfirmModalProps> = ({
  confirmAction,
  onClose,
  onConfirm,
  theme
}) => {
  return (
    <Modal
      isOpen={!!confirmAction}
      onClose={onClose}
      theme={theme}
      title={confirmAction?.title}
      subtitle="Critical Operation"
      icon={
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
      }
    >
      <p className={cn("text-sm font-medium mb-8 leading-relaxed text-center", theme === 'light' ? "text-slate-600" : "text-white/60")}>
        {confirmAction?.message}
      </p>

      <div className="flex gap-3">
        <Button 
          variant="secondary"
          onClick={onClose}
          className="flex-1 py-4"
        >
          Abort
        </Button>
        <Button 
          variant="danger"
          onClick={() => {
            if (confirmAction) {
              onConfirm(confirmAction.type);
              haptic('heavy');
            }
          }}
          className="flex-1 py-4"
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
