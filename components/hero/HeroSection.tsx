'use client';

import React, { useEffect, useRef } from 'react';
import { animateHeroSection } from '@/lib/animations/pageTransitions';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      animateHeroSection();
    }
  }, []);

  const scrollToTemplates = () => {
    const templatesSection = document.getElementById('templates-section');
    if (templatesSection) {
      templatesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
          <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20"
          >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6">
          Popup Generator
        </h1>
        <p className="hero-description text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          Create stunning, customizable popups in minutes. Choose from 16 pre-designed
          templates, customize everything, and export ready-to-use code.
        </p>
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToTemplates}
            className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
          <button
            onClick={scrollToTemplates}
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
          >
            View Templates
          </button>
        </div>
        <div className="mt-12 animate-bounce">
          <button
            onClick={scrollToTemplates}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Scroll to templates"
          >
            <ArrowDown className="w-8 h-8 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
}
