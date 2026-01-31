import { useRef } from 'react';
import { haptic } from '../lib/utils';

/**
 * Responsibility 1: File Handling
 * Manages file input reference and initial trigger
 */
export function useMT5FileHandler() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    haptic('medium');
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    triggerFileInput
  };
}
