import { useState, useEffect, useCallback, useRef } from 'react';
import { useUI } from '../context/UIContext';
import { 
  auth, 
  db, 
  googleProvider,
  type User 
} from '../lib/firebase';
import { 
  signInWithPopup, 
  signInWithRedirect,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { haptic } from '../lib/utils';
import { type DailyRecord, type MT5Trade } from '../types';

export function useSync(
  records: DailyRecord[],
  setRecords: (r: DailyRecord[]) => void,
  reportTrades: MT5Trade[],
  setReportTrades: (t: MT5Trade[]) => void,
  initialCapital: number,
  setInitialCapital: (c: number) => void,
  weeklyTarget: number,
  setWeeklyTarget: (t: number) => void,
  monthlyTarget: number,
  setMonthlyTarget: (t: number) => void,
  showTargetsOnHome: boolean,
  setShowTargetsOnHome: (s: boolean) => void,
  sendNotification: (title: string, body: string) => void
) {
  const { alert: customAlert, confirm: customConfirm } = useUI();
  const [user, setUser] = useState<User | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<number>(() => {
    const saved = localStorage.getItem('last_sync_timestamp');
    return saved ? parseInt(saved) : 0;
  });
  const [isInitialSyncDone, setIsInitialSyncDone] = useState(false);
  const isSyncingFromCloudRef = useRef(false);

  useEffect(() => {
    if (lastSyncTimestamp) {
      localStorage.setItem('last_sync_timestamp', lastSyncTimestamp.toString());
    }
  }, [lastSyncTimestamp]);

  const handleGoogleSignIn = async () => {
    try {
      haptic('medium');
      setIsSyncing(true);
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (popupError: unknown) {
        if (popupError && typeof popupError === 'object' && 'code' in popupError) {
          const err = popupError as { code: string };
          if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
            await signInWithRedirect(auth, googleProvider);
          } else {
            throw popupError;
          }
        } else {
          throw popupError;
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      customAlert({
        title: 'فشل تسجيل الدخول',
        message: `تعذر الاتصال بحساب Google: ${message}`,
        type: 'error'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSignOut = async () => {
    customConfirm({
      title: 'تسجيل الخروج',
      message: 'هل أنت متأكد أنك تريد تسجيل الخروج؟ سيتم إعادة تحميل التطبيق.',
      type: 'warning',
      onConfirm: async () => {
        haptic('medium');
        await signOut(auth);
        setUser(null);
        window.location.reload();
      }
    });
  };

  const handleManualSync = useCallback(async (silentOrEvent: boolean | Event | unknown = false) => {
    const silent = typeof silentOrEvent === 'boolean' ? silentOrEvent : false;
    if (!user) {
      if (!silent) {
        customAlert({
          title: 'مزامنة السحابة',
          message: 'يرجى تسجيل الدخول أولاً للمزامنة مع السحابة.',
          type: 'info'
        });
      }
      return false;
    }

    try {
      if (!silent) haptic('medium');
      setIsSyncing(true);
      const docRef = doc(db, 'users', user.uid);
      const snapshot = await getDoc(docRef);
      
      if (snapshot.exists()) {
        const cloudData = snapshot.data();
        isSyncingFromCloudRef.current = true;

        if (cloudData.records) {
          const cloudRecords = cloudData.records as DailyRecord[];
          const merged = new Map<string, DailyRecord>();
          records.forEach(r => merged.set(r.id, r));
          cloudRecords.forEach(r => {
            const existing = merged.get(r.id);
            if (!existing || (r.updatedAt || 0) > (existing.updatedAt || 0)) merged.set(r.id, r);
          });
          const finalRecords = Array.from(merged.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setRecords(finalRecords);
          localStorage.setItem('trade_records', JSON.stringify(finalRecords));
        }

        if (cloudData.initialCapital) {
          setInitialCapital(cloudData.initialCapital);
          localStorage.setItem('initial_capital', cloudData.initialCapital.toString());
        }

        if (cloudData.reportTrades) {
          const cloudTrades = cloudData.reportTrades as MT5Trade[];
          const merged = new Map<string, MT5Trade>();
          reportTrades.forEach(t => merged.set(t.positionId, t));
          cloudTrades.forEach(t => {
            const existing = merged.get(t.positionId);
            if (!existing || (t.updatedAt || 0) > (existing.updatedAt || 0)) merged.set(t.positionId, t);
          });
          const finalTrades = Array.from(merged.values()).sort((a, b) => new Date(b.closeTime).getTime() - new Date(a.closeTime).getTime());
          setReportTrades(finalTrades);
          localStorage.setItem('report_trades', JSON.stringify(finalTrades));
        }

        if (cloudData.weeklyTarget) {
          setWeeklyTarget(cloudData.weeklyTarget);
          localStorage.setItem('weekly_target', cloudData.weeklyTarget.toString());
        }
        if (cloudData.monthlyTarget) {
          setMonthlyTarget(cloudData.monthlyTarget);
          localStorage.setItem('monthly_target', cloudData.monthlyTarget.toString());
        }
        if (cloudData.showTargetsOnHome !== undefined) {
          setShowTargetsOnHome(cloudData.showTargetsOnHome);
          localStorage.setItem('show_targets_on_home', cloudData.showTargetsOnHome.toString());
        }
        
        const cloudLastSynced = cloudData.lastSynced ? new Date(cloudData.lastSynced).getTime() : Date.now();
        setLastSyncTimestamp(cloudLastSynced);
        
        setTimeout(() => { isSyncingFromCloudRef.current = false; }, 5000);
        if (!silent) sendNotification('Sync Successful', 'Your data is now up to date with the cloud.');
      } else {
        const now = new Date().toISOString();
        await setDoc(docRef, { records, initialCapital, reportTrades, weeklyTarget, monthlyTarget, showTargetsOnHome, lastSynced: now });
        setLastSyncTimestamp(new Date(now).getTime());
        if (!silent) sendNotification('Cloud Initialized', 'Your local data has been backed up to the cloud.');
      }
      return true;
    } catch (error) {
      console.error('Manual sync error:', error);
      return false;
    } finally {
      setIsSyncing(false);
    }
  }, [user, records, reportTrades, initialCapital, weeklyTarget, monthlyTarget, showTargetsOnHome, sendNotification, setRecords, setReportTrades, setInitialCapital, setWeeklyTarget, setMonthlyTarget, setShowTargetsOnHome, customAlert]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsInitialSyncDone(false);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (user && !isInitialSyncDone) {
      handleManualSync(true).then((success) => {
        if (success) setIsInitialSyncDone(true);
      });
    }
  }, [user, isInitialSyncDone, handleManualSync]);

  useEffect(() => {
    if (user && !isSyncing && !isSyncingFromCloudRef.current && isInitialSyncDone) {
      const syncData = async () => {
        try {
          setIsPushing(true);
          const docRef = doc(db, 'users', user.uid);
          const now = new Date().toISOString();
          await setDoc(docRef, { records, initialCapital, reportTrades, weeklyTarget, monthlyTarget, showTargetsOnHome, lastSynced: now }, { merge: true });
          setLastSyncTimestamp(new Date(now).getTime());
        } catch (error) {
          console.error('Sync to cloud error:', error);
        } finally {
          setIsPushing(false);
        }
      };
      const timeoutId = setTimeout(syncData, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [records, initialCapital, reportTrades, weeklyTarget, monthlyTarget, showTargetsOnHome, user, isSyncing, isInitialSyncDone]);

  const syncImmediately = useCallback(async (data: Partial<{
    records: DailyRecord[],
    reportTrades: MT5Trade[],
    initialCapital: number,
    weeklyTarget: number,
    monthlyTarget: number,
    showTargetsOnHome: boolean
  }>) => {
    if (!user) return;
    try {
      setIsPushing(true);
      const docRef = doc(db, 'users', user.uid);
      const now = new Date().toISOString();
      await setDoc(docRef, {
        ...data,
        lastSynced: now
      }, { merge: true });
      setLastSyncTimestamp(new Date(now).getTime());
    } catch (error) {
      console.error('Immediate sync error:', error);
    } finally {
      setIsPushing(false);
    }
  }, [user]);

  return {
    user,
    isSyncing,
    isPushing,
    lastSyncTimestamp,
    isInitialSyncDone,
    handleGoogleSignIn,
    handleSignOut,
    handleManualSync,
    syncImmediately
  };
}
