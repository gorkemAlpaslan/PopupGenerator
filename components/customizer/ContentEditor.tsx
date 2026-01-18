'use client';

import React from 'react';
import { usePopupStore } from '@/lib/stores/popupStore';

export function ContentEditor() {
  const config = usePopupStore((state) => state.config);
  const updateContent = usePopupStore((state) => state.updateContent);

  if (!config) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        Select a template to start customizing
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-full overflow-x-hidden">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Title
        </label>
        <input
          type="text"
          value={config.content.title}
          onChange={(e) => updateContent({ title: e.target.value })}
          className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 text-base text-white placeholder:text-white/40 transition-all duration-200 hover:bg-white/15 focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          placeholder="Popup title"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Description
        </label>
        <textarea
          value={config.content.description || ''}
          onChange={(e) => updateContent({ description: e.target.value })}
          rows={4}
          className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 text-base text-white placeholder:text-white/40 transition-all duration-200 hover:bg-white/15 focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none"
          placeholder="Popup description"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Button Text
        </label>
        <input
          type="text"
          value={config.content.buttonText || ''}
          onChange={(e) => updateContent({ buttonText: e.target.value })}
          className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 text-base text-white placeholder:text-white/40 transition-all duration-200 hover:bg-white/15 focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          placeholder="Button text"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Image URL <span className="text-white/50 font-normal">(optional)</span>
        </label>
        <input
          type="url"
          value={config.content.imageUrl || ''}
          onChange={(e) => updateContent({ imageUrl: e.target.value })}
          className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 text-base text-white placeholder:text-white/40 transition-all duration-200 hover:bg-white/15 focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-white">
          Input Placeholder <span className="text-white/50 font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={config.content.inputPlaceholder || ''}
          onChange={(e) => updateContent({ inputPlaceholder: e.target.value })}
          className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 text-base text-white placeholder:text-white/40 transition-all duration-200 hover:bg-white/15 focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
          placeholder="Enter your email"
        />
      </div>
    </div>
  );
}
