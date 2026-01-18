'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { templates } from '@/lib/templates/templateDefinitions';
import { TemplateCard } from './TemplateCard';
import { usePopupStore } from '@/lib/stores/popupStore';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function TemplateGrid() {
  const selectedConfig = usePopupStore((state) => state.config);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4 tracking-tight">
          Choose a Template
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select from 16 pre-designed popup templates. Each template is fully customizable
          and ready to use.
        </p>
      </div>
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedConfig?.id === template.id}
          />
        ))}
      </motion.div>
    </div>
  );
}
