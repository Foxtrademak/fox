import React from 'react';
import { cn } from '../../../lib/utils';
import type { User } from '../../../lib/firebase';

interface ProfileInfoProps {
  user: User | null;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Displaying user identification info (Name and Email).
 */
export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, theme }) => {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-1 h-1 rounded-full bg-indigo-500/40" />
        <p className={cn("text-[8px] font-black uppercase tracking-[0.2em]", theme === 'light' ? "text-slate-400" : "text-white/10")}>Identity</p>
      </div>
      <h3 className={cn("text-sm font-black uppercase tracking-wider truncate", theme === 'light' ? "text-slate-800" : "text-white")}>
        {user ? (
          <>
            {user.displayName?.split(' ')[0]} <span className="text-indigo-500/50">{user.displayName?.split(' ').slice(1).join(' ') || 'Profile'}</span>
          </>
        ) : (
          <>Cloud <span className="text-indigo-500/50">Identity</span></>
        )}
      </h3>
      <p className={cn("text-[10px] font-bold uppercase tracking-widest truncate", theme === 'light' ? "text-slate-400" : "text-white/30")}>
        {user ? user.email : 'Not Synchronized'}
      </p>
    </div>
  );
};
