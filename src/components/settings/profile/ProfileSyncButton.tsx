import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { Button } from '../../ui/Button';
import { cn } from '../../../lib/utils';

interface ProfileSyncButtonProps {
  handleManualSync: () => void;
  isSyncing: boolean;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Handling manual cloud synchronization.
 */
export const ProfileSyncButton: React.FC<ProfileSyncButtonProps> = ({
  handleManualSync,
  isSyncing,
  theme
}) => {
  return (
    <Button 
      variant="ios-mini"
      onClick={handleManualSync}
      hapticType="medium"
      className="w-full py-4 flex items-center justify-center gap-3 group"
    >
      <RefreshCcw className={cn("w-4 h-4 text-emerald-400", isSyncing && "animate-spin")} />
      <span className={cn(
        "text-[10px] font-black uppercase tracking-widest group-hover:text-emerald-400 transition-colors",
        theme === 'light' ? "text-slate-500" : "text-white/60"
      )}>
        {isSyncing ? 'Synchronizing Data...' : 'Manual Cloud Sync'}
      </span>
    </Button>
  );
};
