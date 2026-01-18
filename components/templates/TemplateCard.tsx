'use client';

import React, { useRef, useEffect } from 'react';
import type { PopupConfig } from '@/types';
import { usePopupStore } from '@/lib/stores/popupStore';
import { animateCardHover, animateCardLeave } from '@/lib/animations/interactiveAnimations';

interface TemplateCardProps {
  template: PopupConfig;
  isSelected: boolean;
}

export function TemplateCard({ template, isSelected }: TemplateCardProps) {
  const selectTemplate = usePopupStore((state) => state.selectTemplate);
  const cardRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const hoverAnimation = animateCardHover(card);
    const handleMouseEnter = () => hoverAnimation.play();
    const handleMouseLeave = () => {
      hoverAnimation.reverse();
      animateCardLeave(card);
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const typeColors = {
    modal: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
    'slide-in': 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
    banner: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
    floating: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white',
  };

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => {
        selectTemplate(template);
        
        // Wait for the section to be rendered in the DOM
        const scrollToSection = () => {
          const customizeSection = document.getElementById('customize-section');
          if (customizeSection) {
            customizeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return true;
          }
          return false;
        };

        // Try immediately
        if (!scrollToSection()) {
          // If not found, wait for next frame and try again
          requestAnimationFrame(() => {
            if (!scrollToSection()) {
              // If still not found, try after a short delay
              setTimeout(() => {
                scrollToSection();
              }, 100);
            }
          });
        }
      }}
      className={`card-stagger group relative overflow-hidden rounded-2xl p-6 text-left transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        isSelected
          ? 'glass border-2 border-purple-500 shadow-xl shadow-purple-500/20'
          : 'glass border border-white/20 shadow-lg'
      }`}
      aria-label={`Select ${template.name} template`}
      aria-pressed={isSelected}
    >
      <div className="mb-3 flex items-start justify-between">
        <h3 className="text-lg font-bold text-white">
          {template.name}
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold shadow-md ${typeColors[template.type]}`}
        >
          {template.type}
        </span>
      </div>
      <p className="text-sm text-white/90 font-medium mb-2">
        {template.content.title}
      </p>
      {template.content.description && (
        <p className="text-xs text-white/70 line-clamp-2">
          {template.content.description}
        </p>
      )}
      {isSelected && (
        <div className="absolute right-4 top-4">
          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center shadow-lg animate-pulse">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}
