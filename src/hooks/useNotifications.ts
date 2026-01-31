import { useState, useEffect, useCallback } from 'react';
import { useUI } from '../context/UIContext';
import { haptic } from '../lib/utils';
import logo from '../assets/app-logo-new.webp';

export function useNotifications(currentTime: Date) {
  const { alert: customAlert } = useUI();
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return 'Notification' in window && Notification.permission === 'granted';
  });

  const sendNotification = useCallback((title: string, body: string) => {
    console.log(`Attempting to send notification: "${title}" - "${body}"`);
    
    if (!('Notification' in window)) {
      console.warn('Notifications not supported in this browser');
      return;
    }

    if (Notification.permission !== 'granted') {
      console.warn(`Notification permission not granted (current: ${Notification.permission})`);
      return;
    }

    if (!notificationsEnabled) {
      console.warn('Notifications are disabled in app settings');
      return;
    }

    try {
      new Notification(title, {
        body,
        icon: logo
      });
      haptic('medium');
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }, [notificationsEnabled]);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      customAlert({
        title: 'تنبيهات المتصفح',
        message: 'هذا المتصفح لا يدعم التنبيهات البرمجية.',
        type: 'error'
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      console.log(`Notification permission requested: ${permission}`);
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        sendNotification('Notifications Enabled', 'You will now receive alerts regarding trading sessions and synchronization.');
      } else {
        setNotificationsEnabled(false);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const prevMinute = currentTime.getMinutes();
      // Note: We assume currentTime is updated by the caller or we can manage it here.
      // But in the original code, it was passed in the dependency array.

      if (now.getMinutes() !== prevMinute && notificationsEnabled) {
        const hour = now.getHours();
        const minute = now.getMinutes();

        if (hour === 11 && minute === 0) sendNotification('London Session', 'London session has started! Time for liquidity.');
        if (hour === 16 && minute === 0) sendNotification('New York Session', 'New York session has started! Get ready for high volatility.');
        if (hour === 3 && minute === 0) sendNotification('Tokyo Session', 'Tokyo session has started.');
        if (hour === 1 && minute === 0) sendNotification('Sydney Session', 'Sydney session has started.');
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [currentTime, notificationsEnabled, sendNotification]);

  return {
    notificationsEnabled,
    setNotificationsEnabled,
    sendNotification,
    requestNotificationPermission
  };
}
