'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { CustomizationPanel } from '@/components/customizer/CustomizationPanel';
import { PreviewContainer } from '@/components/preview/PreviewContainer';
import { MobilePreviewFab } from '@/components/preview/MobilePreviewFab';
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
    <div className="relative flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Templates Section */}
        <section
          id="templates-section"
          className="section-padding bg-background/50 border-t border-white/5"
        >
          <div className="container mx-auto px-4">
            <TemplateGrid />
          </div>
        </section>

        {/* Customize & Preview Section */}
        <AnimatePresence>
          {config && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="customize-section"
              className="section-padding bg-muted/30 border-t border-white/5"
            >
              <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                    Customize Your Popup
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Adjust content, styles, and triggers to match your brand perfectly.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                  <div className="slide-in-left">
                    <div className="min-h-[600px] lg:min-h-[900px]">
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
            </motion.section>
          )}
        </AnimatePresence>

        {/* Export Section */}
        <AnimatePresence>
          {config && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="export-section"
              className="section-padding bg-background border-t border-white/5"
            >
              <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                    Export Your Code
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Get your popup code in React or HTML format. Copy or download and use it
                    anywhere.
                  </p>
                </div>
                <div className="max-w-6xl mx-auto">
                  <div className="min-h-[500px] h-auto lg:h-[700px]">
                    <ExportPanel />
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Preview FAB - Only visible on mobile */}
      <MobilePreviewFab />
    </div>
  );
}
