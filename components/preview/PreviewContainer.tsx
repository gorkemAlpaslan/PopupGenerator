'use client';

import React from 'react';
import { usePopupStore } from '@/lib/stores/popupStore';
import { PopupRenderer } from './PopupRenderer';

export function PreviewContainer() {
  const config = usePopupStore((state) => state.config);

  if (!config) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl glass border-2 border-dashed border-white/20">
        <div className="text-center">
          <p className="text-white/70 text-lg">
            Select a template to see preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full rounded-2xl glass overflow-hidden bg-gradient-to-br from-gray-900/40 via-purple-900/20 to-gray-900/40 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        {/* Preview area - just the popup itself, centered */}
        <div className="w-full max-w-md flex items-center justify-center">
          <div className="w-full max-w-full">
            <PopupRenderer
              config={config}
              isVisible={true}
              onClose={() => {}}
              previewMode={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
