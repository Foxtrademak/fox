/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { UIProvider } from './UIContext';
import { DataProvider } from './DataContext';
import { TradeProvider } from './TradeContext';
import { SettingsProvider } from './SettingsContext';
import { SyncProvider } from './SyncContext';
import { ImportProvider } from './ImportContext';

/**
 * Responsibility: Master Provider that composes all sub-contexts.
 * This structure avoids the "Context Bloat" anti-pattern by keeping
 * state separated into specialized providers.
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <DataProvider>
        <SyncProvider>
          <ImportProvider>
            <TradeProvider>
              <SettingsProvider>
                {children}
              </SettingsProvider>
            </TradeProvider>
          </ImportProvider>
        </SyncProvider>
      </DataProvider>
    </UIProvider>
  );
}
