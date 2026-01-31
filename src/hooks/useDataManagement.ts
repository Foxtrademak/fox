import { haptic } from '../lib/utils';
import type { ConfirmActionType, ConfirmAction } from '../components/settings/data/DataConfirmModal';

interface UseDataManagementProps {
  reportDeleteDate: string;
  setReportDeleteDate: (val: string) => void;
  setConfirmAction: (val: ConfirmAction | null) => void;
  handleResetAllData: () => void;
  handleDeleteMT5Reports: () => void;
  handleDeleteMT5ReportsByDate: (date: string) => void;
}

/**
 * Responsibility: Handling the logic for data operations and confirmation workflows.
 */
export const useDataManagement = ({
  reportDeleteDate,
  setReportDeleteDate,
  setConfirmAction,
  handleResetAllData,
  handleDeleteMT5Reports,
  handleDeleteMT5ReportsByDate
}: UseDataManagementProps) => {

  const handleConfirm = (type: ConfirmActionType) => {
    if (type === 'reload') window.location.reload();
    else if (type === 'reset') handleResetAllData();
    else if (type === 'reset_reports') handleDeleteMT5Reports();
    else if (type === 'reset_reports_date') {
      handleDeleteMT5ReportsByDate(reportDeleteDate);
      setReportDeleteDate('');
    }
    setConfirmAction(null);
  };

  const closeConfirm = () => setConfirmAction(null);

  const initiateSelectiveDelete = () => {
    setConfirmAction({
      type: 'reset_reports_date',
      title: 'Partial Reset',
      message: `Eliminate all data for ${reportDeleteDate}?`
    });
    haptic('heavy');
  };

  const initiateWipeTrades = () => {
    setConfirmAction({
      type: 'reset_reports',
      title: 'Data Reset',
      message: 'Clear all MT5 trade records?'
    });
  };

  const initiateFactoryReset = () => {
    setConfirmAction({
      type: 'reset',
      title: 'Total Reset',
      message: 'Wipe all records and settings?'
    });
  };

  return {
    handleConfirm,
    closeConfirm,
    initiateSelectiveDelete,
    initiateWipeTrades,
    initiateFactoryReset
  };
};
