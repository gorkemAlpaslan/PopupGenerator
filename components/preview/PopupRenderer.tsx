'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { PopupConfig } from '@/types';

interface PopupRendererProps {
  config: PopupConfig;
  isVisible: boolean;
  onClose: () => void;
  onButtonClick?: () => void; // Called when popup button is clicked
  previewMode?: boolean; // If true, render inline instead of portal
}

export function PopupRenderer({ config, isVisible, onClose, onButtonClick, previewMode = false }: PopupRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Set mounted immediately when visible
      setMounted(true);
    } else {
      // Small delay before unmounting for exit animation
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Define popup content first (used in both preview and normal mode)
  const popupContent = (
    <div className="relative">
      {config.content.imageUrl && (
        <img
          src={config.content.imageUrl}
          alt={config.content.title}
          className="mb-4 h-48 w-full rounded-t-lg object-cover"
        />
      )}
      <div className="p-6">
        <h2
          id="popup-title"
          className="mb-2 text-2xl font-bold"
          style={{ color: config.style.textColor }}
        >
          {config.content.title}
        </h2>
        {config.content.description && (
          <p
            className="mb-4 text-sm"
            style={{ color: config.style.textColor }}
          >
            {config.content.description}
          </p>
        )}
        {config.content.inputPlaceholder && (
          <input
            type="email"
            placeholder={config.content.inputPlaceholder}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        )}
        {config.content.buttonText && (
          <button
            type="button"
            onClick={() => {
              onButtonClick?.();
              onClose();
            }}
            className="w-full rounded-md px-4 py-2 font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: config.style.buttonColor }}
          >
            {config.content.buttonText}
          </button>
        )}
      </div>
      {!previewMode && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close popup"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );

  // Preview mode - render inline without portal
  if (previewMode && isVisible) {
    if (config.type === 'modal') {
      return (
        <div
          className="relative w-full max-w-md mx-auto overflow-hidden shadow-2xl"
          style={{
            backgroundColor: config.style.backgroundColor,
            borderRadius: `${config.style.borderRadius}px`,
            maxHeight: '100%',
          }}
        >
          {popupContent}
        </div>
      );
    }

    if (config.type === 'banner') {
      return (
        <div
          className="w-full max-w-full mx-auto shadow-lg"
          style={{
            backgroundColor: config.style.backgroundColor,
            borderRadius: `${config.style.borderRadius}px`,
            maxHeight: '100%',
          }}
        >
          <div className="px-4 py-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex-1 min-w-0">
                <h3
                  className="font-semibold break-words"
                  style={{ color: config.style.textColor }}
                >
                  {config.content.title}
                </h3>
                {config.content.description && (
                  <p
                    className="mt-1 text-sm break-words"
                    style={{ color: config.style.textColor }}
                  >
                    {config.content.description}
                  </p>
                )}
              </div>
              {config.content.buttonText && (
                <button
                  type="button"
                  onClick={() => {
                    onButtonClick?.();
                    onClose();
                  }}
                  className="ml-4 rounded-md px-4 py-2 text-sm font-medium text-white whitespace-nowrap"
                  style={{ backgroundColor: config.style.buttonColor }}
                >
                  {config.content.buttonText}
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (config.type === 'slide-in') {
      return (
        <div
          className="w-full max-w-sm mx-auto shadow-2xl"
          style={{
            backgroundColor: config.style.backgroundColor,
            borderRadius: `${config.style.borderRadius}px`,
            maxHeight: '100%',
          }}
        >
          <div className="flex flex-col">
            {popupContent}
          </div>
        </div>
      );
    }

    if (config.type === 'floating') {
      return (
        <div
          className="w-full max-w-xs md:w-80 mx-auto shadow-2xl"
          style={{
            backgroundColor: config.style.backgroundColor,
            borderRadius: `${config.style.borderRadius}px`,
            maxHeight: '100%',
          }}
        >
          {popupContent}
        </div>
      );
    }
  }

  // Only render if visible and mounted (non-preview mode)
  if (!isVisible || !mounted) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Only close if clicking directly on overlay, not on popup content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent popup from closing when clicking inside
  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Modal type (normal mode with portal)
  if (config.type === 'modal') {
    return createPortal(
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200"
        onClick={handleOverlayClick}
        style={{
          backgroundColor: `rgba(0, 0, 0, ${Math.max(config.style.overlayOpacity, 0.6)})`,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <div
          className="relative w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
          style={{
            backgroundColor: config.style.backgroundColor,
            borderRadius: `${config.style.borderRadius}px`,
          }}
          onClick={handlePopupClick}
        >
          {popupContent}
        </div>
      </div>,
      document.body
    );
  }

  // Banner type
  if (config.type === 'banner') {
    return createPortal(
      <div
        className="fixed top-0 left-0 right-0 z-[9999] shadow-lg"
        style={{
          backgroundColor: config.style.backgroundColor,
          borderRadius: `0 0 ${config.style.borderRadius}px ${config.style.borderRadius}px`,
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3
                className="font-semibold"
                style={{ color: config.style.textColor }}
              >
                {config.content.title}
              </h3>
              {config.content.description && (
                <p
                  className="mt-1 text-sm"
                  style={{ color: config.style.textColor }}
                >
                  {config.content.description}
                </p>
              )}
            </div>
            <div className="ml-4 flex items-center gap-2">
              {config.content.buttonText && (
                <button
                  type="button"
                  onClick={() => {
                    onButtonClick?.();
                    onClose();
                  }}
                  className="rounded-md px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: config.style.buttonColor }}
                >
                  {config.content.buttonText}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1 text-gray-600 hover:bg-gray-200"
                aria-label="Close"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // Slide-in type
  if (config.type === 'slide-in') {
    return createPortal(
      <div
        className="fixed right-4 bottom-4 z-[9999] w-full max-w-sm shadow-2xl overflow-hidden animate-in slide-in-from-right-10 duration-500 fade-in"
        style={{
          backgroundColor: config.style.backgroundColor,
          borderRadius: `${config.style.borderRadius}px`,
        }}
      >
        <div className="flex flex-col">
          {popupContent}
        </div>
      </div>,
      document.body
    );
  }

  // Floating type
  if (config.type === 'floating') {
    return createPortal(
      <div
        className="fixed bottom-4 right-4 z-[9999] w-80 shadow-2xl"
        style={{
          backgroundColor: config.style.backgroundColor,
          borderRadius: `${config.style.borderRadius}px`,
        }}
      >
        {popupContent}
      </div>,
      document.body
    );
  }

  return null;
}
