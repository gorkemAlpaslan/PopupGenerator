'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  // Fade in sections - set initial state first
  const sections = document.querySelectorAll<HTMLElement>('.section-fade-in');
  sections.forEach((section) => {
    gsap.set(section, { opacity: 1, y: 0 }); // Ensure visible by default
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Stagger cards - set initial state first
  const cards = document.querySelectorAll<HTMLElement>('.card-stagger');
  cards.forEach((card) => {
    gsap.set(card, { opacity: 1, y: 0, scale: 1 }); // Ensure visible by default
  });
  
  // Use GSAP timeline for better control
  const cardContainer = cards[0]?.parentElement;
  if (cardContainer) {
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.02, // Very small stagger for smooth effect
      scrollTrigger: {
        trigger: cardContainer,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  // Slide in from sides - set initial state first
  const slideLeft = document.querySelectorAll<HTMLElement>('.slide-in-left');
  slideLeft.forEach((element) => {
    gsap.set(element, { opacity: 1, x: 0 }); // Ensure visible by default
    gsap.from(element, {
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  const slideRight = document.querySelectorAll<HTMLElement>('.slide-in-right');
  slideRight.forEach((element) => {
    gsap.set(element, { opacity: 1, x: 0 }); // Ensure visible by default
    gsap.from(element, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Scale in - set initial state first
  const scaleIn = document.querySelectorAll<HTMLElement>('.scale-in');
  scaleIn.forEach((element) => {
    gsap.set(element, { opacity: 1, scale: 1 }); // Ensure visible by default
    gsap.from(element, {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

export function cleanupScrollAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
