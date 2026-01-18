---
name: Homepage Redesign with GSAP
overview: Redesign the Popup Generator with a modern single-page homepage where all sections (templates, customize, preview, export) flow vertically with GSAP scroll-triggered and interactive animations. Implement a sleek modern design with gradients, glassmorphism effects, and improved visual hierarchy.
todos: []
---

# Homepage Redesign with GSAP Animations

## Overview

Transform the current tab-based navigation into a single-page scroll experience with smooth GSAP animations. All sections will flow vertically with modern design elements including gradients, glassmorphism, and enhanced visual hierarchy.

## Design Improvements

### Visual Design

- **Modern gradients**: Subtle gradient backgrounds and accent colors
- **Glassmorphism**: Frosted glass effects on cards and panels
- **Better typography**: Improved font hierarchy and spacing
- **Enhanced spacing**: More breathing room between sections
- **Smooth transitions**: GSAP-powered animations throughout
- **Hero section**: Eye-catching introduction at the top

### Layout Structure

```
Hero Section (full width)
  ↓
Templates Section (full width, grid)
  ↓
Customize Section (split: left panel + right preview)
  ↓
Export Section (full width, code display)
```

## Implementation Details

### 1. Install GSAP (`package.json`)

- Add `gsap@^3.12.0` dependency
- Add `@types/gsap` for TypeScript support

### 2. Create Hero Section (`app/page.tsx`)

- Welcome message with animated title
- Brief description of the tool
- Smooth fade-in animation on load
- Gradient background

### 3. Redesign Templates Section

- Full-width section with animated grid
- Cards appear with stagger animation on scroll
- Glassmorphism effect on template cards
- Hover animations with GSAP

### 4. Redesign Customize Section

- Split layout: Customization panel (left) + Live Preview (right)
- Both sections animate in from opposite sides
- Sticky preview panel while scrolling through customization
- Smooth transitions between tabs

### 5. Redesign Preview Section

- Enhanced preview container with glassmorphism
- Animated popup appearances
- Better visual feedback

### 6. Redesign Export Section

- Full-width code display with gradient background
- Animated code reveal
- Enhanced copy/download buttons with hover effects

### 7. GSAP Animations (`lib/animations/`)

- `scrollAnimations.ts`: Scroll-triggered animations for sections
- `interactiveAnimations.ts`: Hover effects, button animations
- `pageTransitions.ts`: Page load and section transitions

### 8. Modern Styling (`app/globals.css`)

- Add gradient utilities
- Glassmorphism mixins
- Enhanced color palette
- Smooth scroll behavior

### 9. Component Updates

- Update all components with modern styling
- Add GSAP animation hooks
- Improve responsive design
- Add loading states with animations

## Technical Stack Additions

- **GSAP**: Animation library for scroll triggers and interactive animations
- **GSAP ScrollTrigger**: Plugin for scroll-based animations
- Enhanced Tailwind config for custom gradients and effects

## Animation Strategy

### Scroll-Triggered Animations

- Sections fade in as they enter viewport
- Cards stagger in with delay
- Text slides in from sides
- Scale animations for emphasis

### Interactive Animations

- Button hover effects (scale, glow)
- Card hover effects (lift, shadow)
- Smooth tab transitions
- Popup entrance animations

## File Changes

1. **package.json**: Add GSAP dependencies
2. **app/page.tsx**: Complete redesign with hero and section flow
3. **app/globals.css**: Modern styling, gradients, glassmorphism
4. **lib/animations/**: New GSAP animation utilities
5. **components/templates/**: Enhanced with animations
6. **components/customizer/**: Modern styling
7. **components/preview/**: Enhanced preview with animations
8. **components/export/**: Modern code display
9. **tailwind.config.ts**: Extended with custom gradients

## User Experience Flow

1. **Land on page** → Hero section fades in
2. **Scroll down** → Templates section animates in
3. **Select template** → Smooth transition to customize section
4. **Customize** → Preview updates in real-time with animations
5. **Scroll to export** → Code section reveals with animation
6. **Export code** → Smooth copy/download with visual feedback

## Responsive Considerations

- Mobile: Stack all sections vertically
- Tablet: Maintain split layout where appropriate
- Desktop: Full mixed layout with side-by-side sections