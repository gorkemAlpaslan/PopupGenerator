'use client';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export function animateHeroSection() {
  if (typeof window === 'undefined') return;
  
  // Set initial states first
  gsap.set('.hero-title', { opacity: 0, y: 30 });
  gsap.set('.hero-description', { opacity: 0, y: 20 });
  gsap.set('.hero-cta', { opacity: 0, scale: 0.9 });
  
  const tl = gsap.timeline();
  tl.to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  })
    .to(
      '.hero-description',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.5'
    )
    .to(
      '.hero-cta',
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      },
      '-=0.3'
    );
  return tl;
}

export function animatePageLoad() {
  if (typeof window === 'undefined') return;
  
  // Set initial opacity to 1 to ensure body is visible
  gsap.set('body', { opacity: 1 });
  
  // Optional: Fade in animation if needed
  // gsap.from('body', {
  //   opacity: 0,
  //   duration: 0.5,
  //   ease: 'power2.out',
  // });
}

export function scrollToSection(sectionId: string) {
  if (typeof window === 'undefined') return;
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
