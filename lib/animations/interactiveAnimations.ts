'use client';

import { gsap } from 'gsap';

export function animateButtonHover(element: HTMLElement) {
  const tl = gsap.timeline({ paused: true });
  tl.to(element, {
    scale: 1.05,
    duration: 0.2,
    ease: 'power2.out',
  });
  return tl;
}

export function animateButtonClick(element: HTMLElement) {
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut',
  });
}

export function animateCardHover(element: HTMLElement) {
  const tl = gsap.timeline({ paused: true });
  tl.to(element, {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    duration: 0.3,
    ease: 'power2.out',
  });
  return tl;
}

export function animateCardLeave(element: HTMLElement) {
  gsap.to(element, {
    y: 0,
    scale: 1,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    duration: 0.3,
    ease: 'power2.out',
  });
}

export function animateGlow(element: HTMLElement) {
  const tl = gsap.timeline({ repeat: -1, yoyo: true });
  tl.to(element, {
    boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
    duration: 2,
    ease: 'power1.inOut',
  });
  return tl;
}

export function animateTabSwitch(
  oldTab: HTMLElement,
  newTab: HTMLElement,
  content: HTMLElement
) {
  const tl = gsap.timeline();
  tl.to(oldTab, {
    opacity: 0,
    x: -20,
    duration: 0.2,
    ease: 'power2.in',
  })
    .to(content, {
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: 'power2.in',
    })
    .set(newTab, { opacity: 0, x: 20 })
    .to(newTab, {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
    .to(content, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  return tl;
}

export function animatePopupEntrance(element: HTMLElement) {
  const tl = gsap.timeline();
  tl.set(element, { scale: 0.8, opacity: 0 })
    .to(element, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
    });
  return tl;
}

export function animatePopupExit(element: HTMLElement) {
  return gsap.to(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
  });
}
