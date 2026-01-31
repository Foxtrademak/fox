/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { throttle, haptic, cn } from '../lib/utils';
import { useMarketSessions, type MarketSession } from '../hooks/useMarketSessions';
import { Modal } from '../components/ui/Modal';
import { AlertCircle, CheckCircle2, Info, HelpCircle } from 'lucide-react';

import logo from '../assets/app-logo-new.webp';

type Tab = 'home' | 'analytics' | 'reports' | 'settings';

interface UIContextType {
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
  isLocked: boolean;
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
  isScrolled: boolean;
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
  theme: 'light' | 'dark';
  currentTime: Date;
  profileImgError: boolean;
  setProfileImgError: React.Dispatch<React.SetStateAction<boolean>>;
  sessions: MarketSession[];
  logo: string;
  haptic: typeof haptic;
  alert: (config: { title: string; message: string; type?: 'info' | 'error' | 'success' } | null) => void;
  confirm: (config: { title: string; message: string; onConfirm: () => void; type?: 'info' | 'error' | 'success' | 'warning' } | null) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isLocked, setIsLocked] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme] = useState<'light' | 'dark'>('dark');
  const [profileImgError, setProfileImgError] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alertConfig, setAlertConfig] = useState<{ title: string; message: string; type?: 'info' | 'error' | 'success' } | null>(null);
  const [confirmConfig, setConfirmConfig] = useState<{ title: string; message: string; onConfirm: () => void; type?: 'info' | 'error' | 'success' | 'warning' } | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove('light');
    localStorage.setItem('app_theme', 'dark');
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 2);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const main = document.querySelector('main');
    if (main) main.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const sessions = useMarketSessions(currentTime);

  const value = React.useMemo(() => ({
    activeTab, setActiveTab,
    isLocked, setIsLocked,
    isScrolled, setIsScrolled,
    theme,
    currentTime,
    profileImgError, setProfileImgError,
    sessions,
    logo,
    haptic,
    alert: setAlertConfig,
    confirm: setConfirmConfig
  }), [activeTab, isLocked, isScrolled, theme, currentTime, profileImgError, sessions]);

  return (
    <UIContext.Provider value={value}>
      {children}
      <Modal 
        isOpen={!!alertConfig} 
        onClose={() => setAlertConfig(null)}
        title={alertConfig?.title}
        icon={
          alertConfig?.type === 'error' ? <AlertCircle className="w-8 h-8 text-red-500" /> :
          alertConfig?.type === 'success' ? <CheckCircle2 className="w-8 h-8 text-green-500" /> :
          <Info className="w-8 h-8 text-blue-500" />
        }
      >
        <div className="text-center">
          <p className="text-white/60 text-sm leading-relaxed">
            {alertConfig?.message}
          </p>
          <button
            onClick={() => setAlertConfig(null)}
            className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all active:scale-95"
          >
            حسناً
          </button>
        </div>
      </Modal>

      <Modal 
        isOpen={!!confirmConfig} 
        onClose={() => setConfirmConfig(null)}
        title={confirmConfig?.title}
        icon={
          confirmConfig?.type === 'error' ? <AlertCircle className="w-8 h-8 text-red-500" /> :
          confirmConfig?.type === 'success' ? <CheckCircle2 className="w-8 h-8 text-green-500" /> :
          confirmConfig?.type === 'warning' ? <AlertCircle className="w-8 h-8 text-amber-500" /> :
          <HelpCircle className="w-8 h-8 text-blue-500" />
        }
      >
        <div className="text-center">
          <p className="text-white/60 text-sm leading-relaxed">
            {confirmConfig?.message}
          </p>
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setConfirmConfig(null)}
              className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white/60 font-bold rounded-2xl transition-all active:scale-95"
            >
              إلغاء
            </button>
            <button
              onClick={() => {
                confirmConfig?.onConfirm();
                setConfirmConfig(null);
              }}
              className={cn(
                "flex-1 py-4 font-bold rounded-2xl transition-all active:scale-95 text-white",
                confirmConfig?.type === 'error' ? "bg-red-500/80 hover:bg-red-500" : "bg-white/10 hover:bg-white/20"
              )}
            >
              تأكيد
            </button>
          </div>
        </div>
      </Modal>
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
