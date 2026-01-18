'use client';

import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4 w-full max-w-full overflow-x-hidden">
      <div className="flex items-center justify-between w-full">
        <label className="block text-sm font-semibold text-white">
          {label}
        </label>
        <span className="text-base font-bold text-purple-300 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/30 px-4 py-1.5 rounded-lg shadow-lg shadow-purple-500/20">
          {value}
          {unit}
        </span>
      </div>
      <div className="relative py-2">
        {/* Track Background */}
        <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 bg-white/10 rounded-full backdrop-blur-sm"></div>
        
        {/* Filled Track with Gradient */}
        <div
          className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400 shadow-lg shadow-purple-500/30 transition-all duration-200"
          style={{ width: `${percentage}%` }}
        ></div>

        {/* Slider Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-2 cursor-pointer appearance-none bg-transparent z-10 slider-input"
          style={{
            background: 'transparent',
          }}
        />

        {/* Custom Thumb Indicator - Centered on track */}
        <div
          className="absolute top-1/2 w-5 h-5 rounded-full bg-white shadow-xl border-2 border-purple-400 transition-all duration-200 hover:scale-125 hover:shadow-purple-500/50 pointer-events-none z-20"
          style={{
            left: `calc(${percentage}% - 10px)`,
            transform: 'translateY(-50%)',
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-purple-100"></div>
          <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-sm"></div>
        </div>
      </div>
    </div>
  );
}
