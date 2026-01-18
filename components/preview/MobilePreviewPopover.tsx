'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { usePopupStore } from '@/lib/stores/popupStore';
import { PopupRenderer } from './PopupRenderer';

export function MobilePreviewPopover() {
  const config = usePopupStore((state) => state.config);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userClosed, setUserClosed] = useState(false);
  const [scale, setScale] = useState(1);
  const prevConfigRef = useRef<typeof config>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If config changed (new template selected), reset userClosed and show popover
    if (config && prevConfigRef.current !== config) {
      setUserClosed(false);
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 10);
    } else if (!config) {
      // If config is cleared, hide popover
      setIsVisible(false);
      setTimeout(() => setIsOpen(false), 300);
      setUserClosed(false);
    }
    prevConfigRef.current = config;
  }, [config]);

  // Calculate scale for mobile if popup is too large
  useEffect(() => {
    if (!isVisible || !config || !popupRef.current || !containerRef.current) {
      setScale(1);
      return;
    }

    const checkScale = () => {
      const popup = popupRef.current;
      const container = containerRef.current;
      if (!popup || !container) return;

      const containerHeight = container.clientHeight;
      const popupHeight = popup.scrollHeight;
      const containerWidth = container.clientWidth;
      const popupWidth = popup.scrollWidth;

      // Calculate scale needed to fit both width and height
      const scaleX = containerWidth / popupWidth;
      const scaleY = containerHeight / popupHeight;
      const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down

      setScale(newScale < 0.5 ? 0.5 : newScale); // Minimum scale of 0.5
    };

    // Check scale after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkScale, 100);
    window.addEventListener('resize', checkScale);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkScale);
    };
  }, [isVisible, config]);

  // Don't show if user manually closed it or if no config
  if (!isOpen || userClosed || !config) return null;

  return (
    <>
      {/* Popover - No backdrop, allows interaction with page behind */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-gray-900/95 via-purple-900/90 to-gray-900/95 backdrop-blur-xl border-t border-white/20 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out pointer-events-auto ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '60vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">Preview</h3>
          <button
            onClick={() => {
              setIsVisible(false);
              setUserClosed(true);
              setTimeout(() => setIsOpen(false), 300);
            }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Content */}
        <div 
          ref={containerRef}
          className="overflow-hidden flex items-center justify-center" 
          style={{ maxHeight: 'calc(60vh - 60px)', height: 'calc(60vh - 60px)' }}
        >
          <div className="flex items-center justify-center p-4 w-full h-full">
            {config ? (
              <div 
                ref={popupRef}
                className="w-full max-w-sm flex items-center justify-center transform origin-center transition-transform duration-200"
                style={{
                  transform: `scale(${scale})`,
                  maxWidth: scale < 1 ? '100%' : '24rem',
                }}
              >
                <div className="w-full">
                  <PopupRenderer
                    config={config}
                    isVisible={true}
                    onClose={() => {}}
                    previewMode={true}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-white/70">Select a template to see preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
