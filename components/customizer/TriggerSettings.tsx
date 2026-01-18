'use client';

import React from 'react';
import { usePopupStore } from '@/lib/stores/popupStore';
import { Slider } from '@/components/ui/Slider';
import { Toggle } from '@/components/ui/Toggle';

export function TriggerSettings() {
  const config = usePopupStore((state) => state.config);
  const updateTriggers = usePopupStore((state) => state.updateTriggers);

  if (!config) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        Select a template to start customizing
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="space-y-4">
        <Toggle
          label="Time Delay"
          checked={config.triggers.delayEnabled ?? true}
          onChange={(checked) => updateTriggers({ delayEnabled: checked })}
          description="Show popup after a specific amount of time"
        />
        {(config.triggers.delayEnabled ?? true) && (
          <div className="pl-4 border-l-2 border-white/10 animate-in slide-in-from-top-2 fade-in duration-300">
            <Slider
              label="Delay (seconds)"
              value={config.triggers.delay}
              onChange={(value) => updateTriggers({ delay: value })}
              min={0}
              max={30}
              step={1}
              unit="s"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Toggle
          label="Scroll Trigger"
          checked={config.triggers.scrollEnabled ?? true}
          onChange={(checked) => updateTriggers({ scrollEnabled: checked })}
          description="Show popup after user scrolls down a percentage"
        />
        {(config.triggers.scrollEnabled ?? true) && (
          <div className="pl-4 border-l-2 border-white/10 animate-in slide-in-from-top-2 fade-in duration-300">
            <Slider
              label="Scroll Percentage"
              value={config.triggers.scrollPercent}
              onChange={(value) => updateTriggers({ scrollPercent: value })}
              min={0}
              max={100}
              step={5}
              unit="%"
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <Toggle
          label="Exit Intent"
          checked={config.triggers.exitIntent}
          onChange={(checked) => updateTriggers({ exitIntent: checked })}
          description="Show popup when user tries to leave the page"
        />
      </div>
    </div>
  );
}
