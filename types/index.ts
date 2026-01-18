export type PopupType = 'modal' | 'slide-in' | 'banner' | 'floating';

export interface PopupContent {
  title: string;
  description?: string;
  buttonText?: string;
  imageUrl?: string;
  inputPlaceholder?: string;
}

export interface PopupStyle {
  backgroundColor: string; // Hex
  textColor: string; // Hex
  buttonColor: string; // Hex
  borderRadius: number; // px
  overlayOpacity: number; // 0-1
}

export interface PopupTriggers {
  delay: number; // seconds
  delayEnabled?: boolean;
  scrollPercent: number; // 0-100
  scrollEnabled?: boolean;
  exitIntent: boolean;
}

export type PopupFrequency = 'always' | 'once-per-session' | 'once-per-visitor';

export interface PopupSettings {
  frequency: PopupFrequency;
  frequencyCount?: number; // How many times to show (default: 1)
}

export interface PopupConfig {
  id: string;
  name: string;
  type: PopupType;
  content: PopupContent;
  style: PopupStyle;
  triggers: PopupTriggers;
  settings: PopupSettings;
}
