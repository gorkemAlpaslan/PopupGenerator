'use client';

import React from 'react';
import { ContentEditor } from './ContentEditor';
import { StyleEditor } from './StyleEditor';
import { TriggerSettings } from './TriggerSettings';
import { BehaviorSettings } from './BehaviorSettings';
import { FileText, Palette, Zap, Settings2 } from 'lucide-react';

import { usePopupStore } from '@/lib/stores/popupStore';

export function CustomizationPanel() {
  const config = usePopupStore((state) => state.config);

  if (!config) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl glass border-2 border-dashed border-white/20">
        <div className="text-center">
          <p className="text-white/70 text-lg">
            Select a template to start customizing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col glass rounded-2xl overflow-hidden">
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 space-y-8 md:space-y-12">
        {/* Content Section */}
        <section className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white">Content</h3>
              <p className="text-xs md:text-sm text-white/60">Customize your popup content</p>
            </div>
          </div>
          <div className="pl-0 md:pl-12">
            <ContentEditor />
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Style Section */}
        <section className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white">Style</h3>
              <p className="text-xs md:text-sm text-white/60">Adjust colors and appearance</p>
            </div>
          </div>
          <div className="pl-0 md:pl-12">
            <StyleEditor />
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Triggers Section */}
        <section className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white">Triggers</h3>
              <p className="text-xs md:text-sm text-white/60">Configure when popup appears</p>
            </div>
          </div>
          <div className="pl-0 md:pl-12">
            <TriggerSettings />
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Behavior Section */}
        <section className="space-y-4 md:space-y-6 pb-4">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Settings2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white">Behavior</h3>
              <p className="text-xs md:text-sm text-white/60">Choose how often to show the popup</p>
            </div>
          </div>
          <div className="pl-0 md:pl-12">
            <BehaviorSettings />
          </div>
        </section>
      </div>
    </div>
  );
}
