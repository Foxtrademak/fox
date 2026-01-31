import React from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Card } from '../../ui/Card';
import { cn, haptic } from '../../../lib/utils';

interface NotificationsSettingCardProps {
  onClick: () => void;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
}

/**
 * Responsibility: Notifications & System Status Setting Card
 */
export const NotificationsSettingCard: React.FC<NotificationsSettingCardProps> = ({ 
  onClick, 
  notificationsEnabled, 
  theme 
}) => {
  return (
    <Card 
      as="button"
      onClick={() => { onClick(); haptic('medium'); }}
      className="group flex flex-col items-start gap-4 active:scale-95 text-left p-8 cursor-pointer"
    >
      <div className={cn(
        "w-12 h-12 ios-card-mini p-0 overflow-visible flex items-center justify-center border group-hover:scale-110 transition-transform",
        notificationsEnabled ? "bg-green-500/10 border-green-500/20" : "bg-primary/10 border-primary/20"
      )}>
        {notificationsEnabled ? (
          <Bell className="w-6 h-6 text-green-500" />
        ) : (
          <BellOff className="w-6 h-6 text-primary" />
        )}
      </div>
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <div className={cn(
            "w-1 h-1 rounded-full",
            notificationsEnabled ? "bg-green-500/40" : "bg-primary/40"
          )} />
          <p className={cn("text-[8px] font-black uppercase tracking-[0.2em]", theme === 'light' ? "text-slate-400" : "text-white/10")}>Alerts</p>
        </div>
        <h4 className={cn("text-xs font-black uppercase tracking-widest", theme === 'light' ? "text-slate-800" : "text-white")}>
          System <span className={cn(notificationsEnabled ? "text-green-500/50" : "text-primary/50")}>Status</span>
        </h4>
      </div>
    </Card>
  );
};
