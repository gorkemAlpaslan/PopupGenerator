'use client';

import React from 'react';
import { usePopupStore } from '@/lib/stores/popupStore';
import type { PopupFrequency } from '@/types';

const frequencies: { value: PopupFrequency; label: string; description: string }[] = [
  {
    value: 'always',
    label: 'Always Show',
    description: 'Popup will appear every time the trigger conditions are met.',
  },
  {
    value: 'once-per-session',
    label: 'Once per Session',
    description: 'Popup will appear only once per browser session.',
  },
  {
    value: 'once-per-visitor',
    label: 'Once per Visitor',
    description: 'Popup will appear once and won\'t show again for this visitor.',
  },
];

export function BehaviorSettings() {
  const config = usePopupStore((state) => state.config);
  const updateSettings = usePopupStore((state) => state.updateSettings);

  if (!config) return null;

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-white mb-2">
          Show Frequency
        </label>
        <div className="grid grid-cols-1 gap-3">
          {frequencies.map((freq) => (
            <div key={freq.value} className="space-y-3">
              <button
                onClick={() => updateSettings({ frequency: freq.value })}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${
                  config.settings.frequency === freq.value
                    ? 'bg-white/10 border-purple-500/50 ring-1 ring-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-semibold ${
                    config.settings.frequency === freq.value ? 'text-white' : 'text-white/80'
                  }`}>
                    {freq.label}
                  </span>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    config.settings.frequency === freq.value
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-white/30'
                  }`}>
                    {config.settings.frequency === freq.value && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                  {freq.description}
                </p>
              </button>

              {config.settings.frequency === freq.value && freq.value !== 'always' && (
                <div className="ml-4 pl-4 border-l-2 border-white/10 animate-in slide-in-from-top-2 fade-in duration-300">
                  <label className="block text-xs font-medium text-white/70 mb-2">
                    Show how many times?
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={config.settings.frequencyCount || 1}
                      onChange={(e) => updateSettings({ 
                        frequencyCount: Math.max(1, parseInt(e.target.value) || 1) 
                      })}
                      className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    />
                    <span className="text-xs text-white/40">times</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
