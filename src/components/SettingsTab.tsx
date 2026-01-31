import React from 'react';
import { cn } from '../lib/utils';
import { AboutModal } from './settings/AboutModal';
import { SecurityModal } from './settings/SecurityModal';
import { TargetsModal } from './settings/TargetsModal';
import { SettingsHeader } from './settings/SettingsHeader';
import { SettingsProfile } from './settings/SettingsProfile';
import { SettingsGrid } from './settings/SettingsGrid';
import { DataManagement } from './settings/DataManagement';
import { useUI } from '../context/UIContext';

/**
 * Responsibility: High-level Orchestrator for the Settings Tab.
 * This component now only handles the structural layout and global UI states (scrolling, theme),
 * while sub-components manage their own data dependencies via Context.
 */
export const SettingsTab: React.FC = () => {
  const { isScrolled, logo, theme } = useUI();

  return (
    <div className="space-y-8 animate-fade-in pb-40 px-4">
      {/* Gradient Blur Effect - Unified implementation for all pages */}
      <div className={cn("gradient-blur-header", isScrolled && "is-scrolled")} style={{ zIndex: 90 }} />

      <SettingsHeader 
        isScrolled={isScrolled}
        logo={logo}
        theme={theme}
      />

      <div className="space-y-8 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
        <SettingsProfile />
        <SettingsGrid />
        <DataManagement />
      </div>

      {/* Modals */}
      <AboutModal />
      <SecurityModal />
      <TargetsModal />
    </div>
  );
};
