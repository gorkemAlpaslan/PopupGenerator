import type { PopupConfig } from '@/types';

export function generateReactComponent(config: PopupConfig): string {
  const componentName = config.name.replace(/[^a-zA-Z0-9]/g, '') || 'Popup';
  const storageKey = `popup_shown_${config.id}`;

  const triggerLogic = `
  // Use refs to track state without triggering re-renders
  const hasTriggered = React.useRef(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const scrollHandlerRef = React.useRef<(() => void) | null>(null);
  const exitIntentHandlerRef = React.useRef<((e: MouseEvent) => void) | null>(null);
  
  // Memoize triggers to prevent unnecessary re-renders
  const triggers = React.useMemo(() => ({
    delay: ${config.triggers.delay},
    delayEnabled: ${config.triggers.delayEnabled ?? true},
    scrollPercent: ${config.triggers.scrollPercent},
    scrollEnabled: ${config.triggers.scrollEnabled ?? true},
    exitIntent: ${config.triggers.exitIntent},
  }), []);
  
  useEffect(() => {
    if (!isOpen) return;
    if (hasTriggered.current) return; // Already triggered, don't set up again

    // Check frequency settings
    const frequency = '${config.settings.frequency}';
    const frequencyCount = ${config.settings.frequencyCount || 1};
    const storageKey = '${storageKey}';
    
    const checkFrequency = () => {
      if (frequency === 'always') return true;
      
      const storage = frequency === 'once-per-session' ? sessionStorage : localStorage;
      const storedValue = storage.getItem(storageKey);
      
      let count = 0;
      if (storedValue === 'true') {
        count = 1;
      } else {
        count = parseInt(storedValue || '0');
        if (isNaN(count)) count = 0;
      }
      
      return count < frequencyCount;
    };

    if (!checkFrequency()) return;

    const trigger = () => {
      if (hasTriggered.current) return;
      
      hasTriggered.current = true;
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
        if (hasTriggered.current) return;
        
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
        if (hasTriggered.current) return;
        if (e.clientY <= 0) {
          trigger();
        }
      };
      document.addEventListener('mouseleave', exitIntentHandlerRef.current);
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);`;

  // Content JSX (unstyled structure)
  const contentCore = `
        ${config.content.imageUrl ? `
        <img
          src="${config.content.imageUrl}"
          alt="${config.content.title}"
          className="mb-4 h-48 w-full rounded-t-lg object-cover"
        />` : ''}
        <div className="p-6">
          <h2 className="mb-2 text-2xl font-bold">
            ${config.content.title}
          </h2>
          ${config.content.description ? `
          <p className="mb-4 text-sm">
            ${config.content.description}
          </p>` : ''}
          ${config.content.inputPlaceholder ? `
          <input
            type="email"
            placeholder="${config.content.inputPlaceholder}"
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm"
          />` : ''}
          ${config.content.buttonText ? `
          <button
            onClick={handleClose}
            className="w-full rounded-md px-4 py-2 font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: '${config.style.buttonColor}' }}
          >
            ${config.content.buttonText}
          </button>` : ''}
        </div>
        <button
          onClick={handleClose}
          className="absolute right-2 top-2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>`;

  // Card wrapper (for Modal and Floating)
  const popupCardJSX = `
      <div
        className="relative"
        style={{
          backgroundColor: '${config.style.backgroundColor}',
          color: '${config.style.textColor}',
          borderRadius: '${config.style.borderRadius}px',
        }}
      >
        ${contentCore}
      </div>`;

  const renderLogic = config.type === 'modal' ? `
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
        style={{
          backgroundColor: \`rgba(0, 0, 0, ${config.style.overlayOpacity})\`,
        }}
      >
        <div className="relative w-full max-w-md overflow-hidden shadow-2xl">
          ${popupCardJSX}
        </div>
      </div>,
      document.body
    );` : config.type === 'banner' ? `
    return createPortal(
      <div
        className="fixed top-0 left-0 right-0 z-50 shadow-lg"
        style={{
          backgroundColor: '${config.style.backgroundColor}',
          color: '${config.style.textColor}',
          borderRadius: \`0 0 ${config.style.borderRadius}px ${config.style.borderRadius}px\`,
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold">${config.content.title}</h3>
              ${config.content.description ? `<p className="mt-1 text-sm">${config.content.description}</p>` : ''}
            </div>
            <div className="ml-4 flex items-center gap-2">
              ${config.content.buttonText ? `
              <button
                onClick={handleClose}
                className="rounded-md px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: '${config.style.buttonColor}' }}
              >
                ${config.content.buttonText}
              </button>` : ''}
              <button
                onClick={handleClose}
                className="rounded-full p-1 text-gray-600 hover:bg-gray-200"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );` : config.type === 'slide-in' ? `
    return createPortal(
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm shadow-2xl"
        style={{
          backgroundColor: '${config.style.backgroundColor}',
          color: '${config.style.textColor}',
          borderRadius: \`${config.style.borderRadius}px 0 0 ${config.style.borderRadius}px\`,
        }}
      >
        <div className="flex h-full flex-col relative">
          ${contentCore}
        </div>
      </div>,
      document.body
    );` : `
    return createPortal(
      <div
        className="fixed bottom-4 right-4 z-50 w-80 shadow-2xl"
      >
        ${popupCardJSX}
      </div>,
      document.body
    );`;

  return `'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ${componentName}Props {
  isOpen?: boolean;
  onClose?: () => void;
}

export function ${componentName}({ isOpen = true, onClose }: ${componentName}Props) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  ${triggerLogic}

  if (!isVisible || !isOpen) return null;

  ${renderLogic}
}`;
}
