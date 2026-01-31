import React, { useRef } from 'react';
import { DataConfirmModal } from './data/DataConfirmModal';
import { DataManagementLayout } from './data/DataManagementLayout';
import { useDataManagement } from '../../hooks/useDataManagement';
import { useUI } from '../../context/UIContext';
import { useImport } from '../../context/ImportContext';
import { useSettings } from '../../context/SettingsContext';

/**
 * Responsibility: Final Pure Orchestrator for Data Management.
 * Note: Now acts as a "Smart Component" pulling data directly from Contexts.
 * Acts as a Clean Bridge between:
 * 1. DataManagementLayout: Visual structure and component grouping.
 * 2. useDataManagement: Business logic, confirmations, and action handling.
 * 3. DataConfirmModal: Critical operation confirmation.
 */
export const DataManagement: React.FC = () => {
  const { theme } = useUI();
  const {
    reportDeleteDate,
    setReportDeleteDate,
    handleDeleteMT5Reports,
    handleDeleteMT5ReportsByDate
  } = useImport();
  const {
    handleExportJSON,
    handleImportJSON,
    setShowAbout,
    confirmAction,
    setConfirmAction,
    handleResetAllData
  } = useSettings();

  // Responsibility: Local Ref ownership (SRP: SettingsTab doesn't need to know about this)
  const reportDeleteInputRef = useRef<HTMLInputElement>(null);

  // Responsibility: Logic Extraction via Custom Hook
  const { 
    handleConfirm, 
    closeConfirm,
    initiateSelectiveDelete, 
    initiateWipeTrades, 
    initiateFactoryReset 
  } = useDataManagement({
    reportDeleteDate,
    setReportDeleteDate,
    setConfirmAction,
    handleResetAllData,
    handleDeleteMT5Reports,
    handleDeleteMT5ReportsByDate
  });

  return (
    <>
      {/* Responsibility: Structural Layout & Component Grouping */}
      <DataManagementLayout 
        handleExportJSON={handleExportJSON}
        handleImportJSON={handleImportJSON}
        setShowAbout={setShowAbout}
        reportDeleteInputRef={reportDeleteInputRef}
        reportDeleteDate={reportDeleteDate}
        setReportDeleteDate={setReportDeleteDate}
        onInitiateSelectiveDelete={initiateSelectiveDelete}
        onWipeTrades={initiateWipeTrades}
        onFactoryReset={initiateFactoryReset}
        theme={theme}
      />

      {/* Responsibility: Shared Confirmation Logic UI */}
      <DataConfirmModal 
        confirmAction={confirmAction}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        theme={theme}
      />
    </>
  );
};
