'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isDragging, setIsDragging] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastChangeTimeRef = useRef<number>(0);

  // Sync local value with prop value when it changes externally
  useEffect(() => {
    if (!isDragging) {
      setLocalValue(value);
    }
  }, [value, isDragging]);

  // Debounced onChange handler
  const handleColorChange = (newValue: string, immediate = false) => {
    setLocalValue(newValue);
    lastChangeTimeRef.current = Date.now();

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (immediate) {
      // Apply immediately if mouse is released
      onChange(newValue);
    } else {
      // Set timer to apply after 1 second if still dragging
      debounceTimerRef.current = setTimeout(() => {
        if (Date.now() - lastChangeTimeRef.current >= 1000) {
          onChange(newValue);
        }
      }, 1000);
    }
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    handleColorChange(newValue, false);
  };

  const handleColorInputMouseDown = () => {
    setIsDragging(true);
  };

  const handleColorInputMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setIsDragging(false);
    // Apply immediately when mouse is released
    handleColorChange(e.currentTarget.value, true);
  };

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    // Text input changes are immediate (user typing)
    onChange(newValue);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-3 w-full max-w-full overflow-x-hidden">
      <label className="block text-sm font-semibold text-white mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3 w-full">
        {/* Color Swatch - Modern Design */}
        <div className="relative group">
          <div
            className="h-14 w-20 rounded-xl border-2 border-white/30 shadow-lg transition-all duration-300 hover:border-purple-400 hover:shadow-purple-500/50 hover:scale-105 cursor-pointer overflow-hidden"
            style={{ backgroundColor: localValue }}
            onClick={() => {
              const input = document.getElementById(`color-input-${label}`);
              input?.click();
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Palette className="w-5 h-5 text-white drop-shadow-lg" />
            </div>
          </div>
          <input
            id={`color-input-${label}`}
            type="color"
            value={localValue}
            onChange={handleColorInputChange}
            onMouseDown={handleColorInputMouseDown}
            onMouseUp={handleColorInputMouseUp}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            style={{ appearance: 'none', WebkitAppearance: 'none' }}
          />
        </div>

        {/* Hex Input - Modern Design */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={localValue}
            onChange={handleTextInputChange}
            className="w-full rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 text-base font-mono text-white placeholder:text-white/40 transition-all duration-300 hover:bg-white/15 hover:border-white/30 focus:border-purple-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:shadow-lg focus:shadow-purple-500/20"
            placeholder="#000000"
            pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <div
              className="w-6 h-6 rounded-md border border-white/20 shadow-sm"
              style={{ backgroundColor: localValue }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
