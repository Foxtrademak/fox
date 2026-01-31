import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function haptic(intensity: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'light') {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    const duration = (intensity === 'light' || intensity === 'success') ? 10 : 
                   (intensity === 'medium' || intensity === 'warning') ? 20 : 30;
    navigator.vibrate(duration);
  }
}

export function getFormattedDate(dateStr: string) {
  if (!dateStr) return '';
  // Handle ISO format (2024-01-27T...) or MT5 format (2024.01.27 12:00:00)
  if (dateStr.includes('T')) {
    return dateStr.split('T')[0];
  }
  // MT5 format usually uses dots or spaces
  return dateStr.split(' ')[0].replace(/\./g, '-');
}

export function throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function(this: unknown, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
