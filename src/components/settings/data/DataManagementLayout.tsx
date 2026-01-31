import React from 'react';
import { BackupRestore } from './BackupRestore';
import { AboutTrigger } from './AboutTrigger';
import { SelectiveDeletion } from './SelectiveDeletion';
import { GlobalReset } from './GlobalReset';

interface DataManagementLayoutProps {
  handleExportJSON: () => void;
  handleImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowAbout: (val: boolean) => void;
  reportDeleteInputRef: React.RefObject<HTMLInputElement | null>;
  reportDeleteDate: string;
  setReportDeleteDate: (val: string) => void;
  onInitiateSelectiveDelete: () => void;
  onWipeTrades: () => void;
  onFactoryReset: () => void;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Organizing the visual structure and layout of data management components.
 */
export const DataManagementLayout: React.FC<DataManagementLayoutProps> = ({
  handleExportJSON,
  handleImportJSON,
  setShowAbout,
  reportDeleteInputRef,
  reportDeleteDate,
  setReportDeleteDate,
  onInitiateSelectiveDelete,
  onWipeTrades,
  onFactoryReset,
  theme
}) => {
  return (
    <div className="space-y-6">
      <BackupRestore 
        handleExportJSON={handleExportJSON}
        handleImportJSON={handleImportJSON}
        theme={theme}
      />

      <div className="space-y-3">
        <AboutTrigger 
          setShowAbout={setShowAbout}
          theme={theme}
        />

        <SelectiveDeletion 
          reportDeleteInputRef={reportDeleteInputRef}
          reportDeleteDate={reportDeleteDate}
          setReportDeleteDate={setReportDeleteDate}
          onInitiateDelete={onInitiateSelectiveDelete}
          theme={theme}
        />

        <GlobalReset 
          onWipeTrades={onWipeTrades}
          onFactoryReset={onFactoryReset}
          theme={theme}
        />
      </div>
    </div>
  );
};
