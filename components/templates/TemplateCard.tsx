'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { PopupConfig } from '@/types';
import { usePopupStore } from '@/lib/stores/popupStore';
import { getTemplateIcon } from './TemplateIcons';
import { TemplatePreview } from './TemplatePreview';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  template: PopupConfig;
  isSelected: boolean;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2
    }
  }
};

export function TemplateCard({ template, isSelected }: TemplateCardProps) {
  const selectTemplate = usePopupStore((state) => state.selectTemplate);
  
  const handleSelect = () => {
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
  };

  const typeColors = {
    modal: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'slide-in': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    banner: 'bg-green-500/10 text-green-500 border-green-500/20',
    floating: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  };

  return (
    <motion.button
      variants={cardVariants}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={handleSelect}
      className={`group relative flex flex-col overflow-hidden rounded-2xl p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full h-full ${
        isSelected
          ? 'glass border-2 border-primary shadow-xl shadow-primary/20'
          : 'glass border border-white/10 hover:border-white/20 hover:bg-white/5 shadow-lg'
      }`}
      aria-label={`Select ${template.name} template`}
      aria-pressed={isSelected}
    >
      {/* Visual Preview */}
      <div className="w-full mb-4">
        <TemplatePreview type={template.type} />
      </div>

      {/* Header with Icon & Type */}
      <div className="flex items-center justify-between mb-3 w-full">
        <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground group-hover:text-foreground group-hover:bg-white/10'} transition-colors`}>
          {getTemplateIcon(template.id)}
        </div>
        <span
          className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full border ${typeColors[template.type]}`}
        >
          {template.type}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
        {template.name}
      </h3>
      
      <p className="text-sm text-muted-foreground line-clamp-2">
        {template.content.description || template.content.title}
      </p>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
            <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={3} />
          </div>
        </div>
      )}
    </motion.button>
  );
}
