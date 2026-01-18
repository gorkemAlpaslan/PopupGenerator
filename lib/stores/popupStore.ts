import { create } from 'zustand';
import type { PopupConfig, PopupContent, PopupStyle, PopupTriggers, PopupSettings } from '@/types';

interface PopupStore {
  config: PopupConfig | null;
  selectTemplate: (config: PopupConfig) => void;
  updateContent: (content: Partial<PopupContent>) => void;
  updateStyle: (style: Partial<PopupStyle>) => void;
  updateTriggers: (triggers: Partial<PopupTriggers>) => void;
  updateSettings: (settings: Partial<PopupSettings>) => void;
  resetConfig: () => void;
}

export const usePopupStore = create<PopupStore>((set) => ({
  config: null,
  selectTemplate: (config) => set({ config }),
  updateContent: (content) =>
    set((state) => ({
      config: state.config
        ? { ...state.config, content: { ...state.config.content, ...content } }
        : null,
    })),
  updateStyle: (style) =>
    set((state) => ({
      config: state.config
        ? { ...state.config, style: { ...state.config.style, ...style } }
        : null,
    })),
  updateTriggers: (triggers) =>
    set((state) => ({
      config: state.config
        ? { ...state.config, triggers: { ...state.config.triggers, ...triggers } }
        : null,
    })),
  updateSettings: (settings) =>
    set((state) => ({
      config: state.config
        ? { ...state.config, settings: { ...state.config.settings, ...settings } }
        : null,
    })),
  resetConfig: () => set({ config: null }),
}));
