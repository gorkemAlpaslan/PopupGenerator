'use client';

import React, { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { CustomizationPanel } from '@/components/customizer/CustomizationPanel';
import { PreviewContainer } from '@/components/preview/PreviewContainer';
import { MobilePreviewPopover } from '@/components/preview/MobilePreviewPopover';
import { ExportPanel } from '@/components/export/ExportPanel';
import { usePopupStore } from '@/lib/stores/popupStore';
import { initScrollAnimations, cleanupScrollAnimations } from '@/lib/animations/scrollAnimations';
import { animatePageLoad } from '@/lib/animations/pageTransitions';

export default function Home() {
  const config = usePopupStore((state) => state.config);
  const prevConfigRef = React.useRef<typeof config>(null);

  useEffect(() => {
    animatePageLoad();
    initScrollAnimations();

    return () => {
      cleanupScrollAnimations();
    };
  }, []);

  // Scroll to customize section when a template is first selected
  useEffect(() => {
    // Only scroll if config changed from null/undefined to a value (first selection)
    if (config && !prevConfigRef.current) {
      // Wait for the section to be rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const customizeSection = document.getElementById('customize-section');
          if (customizeSection) {
            customizeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
    prevConfigRef.current = config;
  }, [config]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Templates Section */}
      <section
        id="templates-section"
        className="section-padding section-fade-in bg-gradient-to-b from-transparent to-gray-900/50"
      >
        <div className="container mx-auto px-4">
          <TemplateGrid />
        </div>
      </section>

      {/* Customize & Preview Section */}
      {config && (
        <section
          id="customize-section"
          className="section-padding section-fade-in bg-gradient-to-b from-gray-900/50 to-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Customize Your Popup
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Adjust content, styles, and triggers to match your brand perfectly.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              <div className="slide-in-left">
                <div className="min-h-[1000px]">
                  <CustomizationPanel />
                </div>
              </div>
              {/* Desktop Preview - Hidden on mobile */}
              <div className="hidden lg:block slide-in-right">
                <div className="sticky top-24 h-[700px]">
                  <PreviewContainer />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Export Section */}
      {config && (
        <section
          id="export-section"
          className="section-padding section-fade-in bg-gradient-to-b from-gray-900 to-gray-900"
        >
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
                Export Your Code
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Get your popup code in React or HTML format. Copy or download and use it
                anywhere.
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="h-[700px] scale-in">
                <ExportPanel />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />

      {/* Mobile Preview Popover - Only visible on mobile */}
      <div className="lg:hidden">
        <MobilePreviewPopover />
      </div>
    </div>
  );
}
