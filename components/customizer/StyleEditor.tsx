'use client';

import React from 'react';
import { usePopupStore } from '@/lib/stores/popupStore';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { Slider } from '@/components/ui/Slider';

export function StyleEditor() {
  const config = usePopupStore((state) => state.config);
  const updateStyle = usePopupStore((state) => state.updateStyle);

  if (!config) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        Select a template to start customizing
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="space-y-3">
        <ColorPicker
          label="Background Color"
          value={config.style.backgroundColor}
          onChange={(value) => updateStyle({ backgroundColor: value })}
        />
      </div>

      <div className="space-y-3">
        <ColorPicker
          label="Text Color"
          value={config.style.textColor}
          onChange={(value) => updateStyle({ textColor: value })}
        />
      </div>

      <div className="space-y-3">
        <ColorPicker
          label="Button Color"
          value={config.style.buttonColor}
          onChange={(value) => updateStyle({ buttonColor: value })}
        />
      </div>

      <div className="space-y-3">
        <Slider
          label="Border Radius"
          value={config.style.borderRadius}
          onChange={(value) => updateStyle({ borderRadius: value })}
          min={0}
          max={32}
          unit="px"
        />
      </div>

      {config.type === 'modal' && (
        <div className="space-y-3">
          <Slider
            label="Overlay Opacity"
            value={config.style.overlayOpacity}
            onChange={(value) => updateStyle({ overlayOpacity: value })}
            min={0}
            max={1}
            step={0.1}
          />
        </div>
      )}
    </div>
  );
}
