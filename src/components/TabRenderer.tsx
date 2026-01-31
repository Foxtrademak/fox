import { Suspense, lazy } from 'react';
import { useUI } from '../context/UIContext';

const HomeTab = lazy(() => import('./HomeTab').then(m => ({ default: m.HomeTab })));
const AnalyticsTab = lazy(() => import('./AnalyticsTab').then(m => ({ default: m.AnalyticsTab })));
const ReportsTab = lazy(() => import('./ReportsTab').then(m => ({ default: m.ReportsTab })));
const SettingsTab = lazy(() => import('./SettingsTab').then(m => ({ default: m.SettingsTab })));

export function TabRenderer() {
  const { activeTab } = useUI();

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.05]" />
          <div className="h-2 w-24 bg-white/[0.05] rounded-full" />
        </div>
      </div>
    }>
      {(() => {
        switch (activeTab) {
          case 'home':
            return <HomeTab />;
          case 'analytics':
            return <AnalyticsTab />;
          case 'reports':
            return <ReportsTab />;
          case 'settings':
            return <SettingsTab />;
          default:
            return null;
        }
      })()}
    </Suspense>
  );
}
