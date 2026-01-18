'use client';

import React from 'react';
import { templates } from '@/lib/templates/templateDefinitions';
import { TemplateCard } from './TemplateCard';
import { usePopupStore } from '@/lib/stores/popupStore';

export function TemplateGrid() {
  const selectedConfig = usePopupStore((state) => state.config);

  return (
    <div className="section-fade-in space-y-8">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          Choose a Template
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Select from 16 pre-designed popup templates. Each template is fully customizable
          and ready to use.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedConfig?.id === template.id}
          />
        ))}
      </div>
    </div>
  );
}
