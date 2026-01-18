'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePopupStore } from '@/lib/stores/popupStore';
import { PopupRenderer } from './PopupRenderer';
import type { PopupConfig } from '@/types';

// Global state to track if any popup is currently visible
let globalPopupVisible = false;

export function PopupLive() {
  const config = usePopupStore((state) => state.config);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggeredRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollHandlerRef = useRef<(() => void) | null>(null);
  const exitIntentHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const prevConfigIdRef = useRef<string | null>(null);

  // Reset state when config changes
  useEffect(() => {
    if (config && config.id !== prevConfigIdRef.current) {
      // Reset all state when switching to a different popup
      hasTriggeredRef.current = false;
      setIsVisible(false);
      globalPopupVisible = false;
      
      // Clean up previous handlers
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
        scrollHandlerRef.current = null;
      }
      if (exitIntentHandlerRef.current) {
        document.removeEventListener('mouseleave', exitIntentHandlerRef.current);
        exitIntentHandlerRef.current = null;
      }
      
      prevConfigIdRef.current = config.id;
    }
  }, [config]);

  // Main trigger logic
  useEffect(() => {
    if (!config) return;
    if (isVisible) return; // Don't set up triggers if popup is already visible
    if (globalPopupVisible) return; // Don't set up triggers if another popup is visible

    const storageKey = `popup_shown_${config.id}`;
    const frequency = config.settings.frequency;
    const frequencyCount = config.settings.frequencyCount || 1;

    // Check frequency before showing
    const checkFrequency = (): boolean => {
      if (frequency === 'always') return true;

      const storage = frequency === 'once-per-session' ? sessionStorage : localStorage;
      const storedValue = storage.getItem(storageKey);

      let count = 0;
      if (storedValue === 'true') {
        // Backward compatibility with old 'true' values
        count = 1;
      } else {
        count = parseInt(storedValue || '0');
        if (isNaN(count)) count = 0;
      }

      return count < frequencyCount;
    };

    if (!checkFrequency()) {
      // Frequency limit reached, don't show popup
      return;
    }

    const trigger = () => {
      // Prevent multiple triggers
      if (hasTriggeredRef.current) return;
      if (globalPopupVisible) return; // Another popup is already visible
      if (!checkFrequency()) return; // Double-check frequency

      hasTriggeredRef.current = true;
      globalPopupVisible = true;
      setIsVisible(true);

      // Update frequency count
      if (frequency !== 'always') {
        const storage = frequency === 'once-per-session' ? sessionStorage : localStorage;
        const storedValue = storage.getItem(storageKey);

        let currentCount = 0;
        if (storedValue === 'true') {
          currentCount = 1;
        } else {
          currentCount = parseInt(storedValue || '0');
          if (isNaN(currentCount)) currentCount = 0;
        }

        storage.setItem(storageKey, (currentCount + 1).toString());
      }

      // Clean up all triggers once popup is shown
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
        scrollHandlerRef.current = null;
      }
      if (exitIntentHandlerRef.current) {
        document.removeEventListener('mouseleave', exitIntentHandlerRef.current);
        exitIntentHandlerRef.current = null;
      }
    };

    const triggers = config.triggers;

    // Delay trigger
    if (triggers.delayEnabled) {
      if (triggers.delay > 0) {
        timeoutRef.current = setTimeout(trigger, triggers.delay * 1000);
      } else {
        // Delay is 0, trigger instantly
        trigger();
      }
    }

    // Scroll trigger
    if (triggers.scrollEnabled && triggers.scrollPercent > 0) {
      scrollHandlerRef.current = () => {
        if (hasTriggeredRef.current) return;
        if (globalPopupVisible) return;

        const scrollPercent =
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) *
          100;

        if (scrollPercent >= triggers.scrollPercent) {
          trigger();
        }
      };
      window.addEventListener('scroll', scrollHandlerRef.current);
    }

    // Exit intent trigger
    if (triggers.exitIntent) {
      exitIntentHandlerRef.current = (e: MouseEvent) => {
        if (hasTriggeredRef.current) return;
        if (globalPopupVisible) return;
        if (e.clientY <= 0) {
          trigger();
        }
      };
      document.addEventListener('mouseleave', exitIntentHandlerRef.current);
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
        scrollHandlerRef.current = null;
      }
      if (exitIntentHandlerRef.current) {
        document.removeEventListener('mouseleave', exitIntentHandlerRef.current);
        exitIntentHandlerRef.current = null;
      }
    };
  }, [config, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    globalPopupVisible = false;
    // Reset hasTriggeredRef to allow popup to show again if frequency allows
    // This enables multiple shows within the frequencyCount limit
    hasTriggeredRef.current = false;
  };

  const handleButtonClick = () => {
    // User interacted with the popup button
    handleClose();
  };

  if (!config || !isVisible) return null;

  return (
    <PopupRenderer
      config={config}
      isVisible={isVisible}
      onClose={handleClose}
      onButtonClick={handleButtonClick}
      previewMode={false}
    />
  );
}
