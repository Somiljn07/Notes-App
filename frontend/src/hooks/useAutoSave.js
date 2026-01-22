import { useEffect, useRef, useCallback } from 'react';
import { UI_CONFIG } from '../constants';

export const useAutoSave = (data, saveFunction, enabled = true) => {
  const timeoutRef = useRef(null);
  const lastSavedRef = useRef(null);
  const isInitialRender = useRef(true);

  const triggerAutoSave = useCallback(async () => {
    if (!enabled || !saveFunction) return;

    // Don't auto-save on initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      lastSavedRef.current = JSON.stringify(data);
      return;
    }

    const currentData = JSON.stringify(data);
    
    // Only save if data has actually changed
    if (currentData === lastSavedRef.current) return;

    try {
      await saveFunction(data);
      lastSavedRef.current = currentData;
      return { success: true };
    } catch (error) {
      console.error('Auto-save failed:', error);
      return { success: false, error };
    }
  }, [data, saveFunction, enabled]);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(triggerAutoSave, UI_CONFIG.AUTO_SAVE_DELAY);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [triggerAutoSave]);

  // Manual save function
  const manualSave = useCallback(async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    return await triggerAutoSave();
  }, [triggerAutoSave]);

  return { manualSave };
};