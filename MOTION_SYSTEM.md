# Motion System Documentation

## Overview

The Motion System is a comprehensive animation and transition library built for React applications. It provides accessible, performant, and customizable motion utilities that respect user preferences and maintain excellent performance.

## Features

- ✅ **Accessibility First**: Respects `prefers-reduced-motion` and provides graceful fallbacks
- ✅ **Performance Optimized**: Uses transform/opacity for 60fps animations with GPU acceleration
- ✅ **Customizable**: Extensive configuration options for duration, easing, and behavior
- ✅ **Group Animations**: Staggered reveals and coordinated animations
- ✅ **Route Transitions**: Smooth page transitions with loading states
- ✅ **Interactive Effects**: Hover, parallax, magnetic, and floating effects
- ✅ **Type Safe**: Built with TypeScript support (when applicable)

## Core Hooks

### useReveal

Enhanced Intersection Observer hook for scroll-triggered animations.

```javascript
import { useReveal } from '../hooks/useReveal'

const [ref, isRevealed, staggerIndex] = useReveal({
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  triggerOnce: true,
  duration: '0.6s',
  easing: 'ease-out',
  staggerDelay: 0.1,
  group: 'hero-section',
  respectReducedMotion: true
})
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `threshold` | number | 0.1 | Intersection threshold (0-1) |
| `rootMargin` | string | '0px 0px -50px 0px' | Margin around root |
| `triggerOnce` | boolean | true | Trigger only once or repeat |
| `duration` | string | '0.6s' | Animation duration |
| `easing` | string | 'ease-out' | CSS easing function |
| `staggerDelay` | number | 0.1 | Delay between grouped elements |
| `group` | string | null | Group name for coordinated reveals |
| `respectReducedMotion` | boolean | true | Honor reduced motion preference |

#### Returns

- `ref` - React ref to attach to element
- `isRevealed` - Boolean indicating if element is visible
- `staggerIndex` - Index within group (if applicable)

### useGroupReveal

Hook for managing coordinated group reveals.

```javascript
import { useGroupReveal } from '../hooks/useReveal'

const { elements, groupRef } = useGroupReveal('hero-section')
```

### useStaggerReveal

Hook for revealing children with staggered timing.

```javascript
import { useStaggerReveal } from '../hooks/useReveal'

const [containerRef, visibleChildren] = useStaggerReveal({
  staggerDelay: 0.1,
  threshold: 0.1,
  triggerOnce: true
})
```

## Motion Utilities

### useLuxuryHover

Enhanced hover effects with scaling, lifting, and glow.

```javascript
import { useLuxuryHover } from '../hooks/useMotion'

const [ref, isHovered] = useLuxuryHover({
  scale: 1.05,
  lift: 8,
  glowColor: 'rgba(59, 130, 246, 0.3)',
  duration: 0.3,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  respectReducedMotion: true
})
```

### useFloatingCard

Continuous floating animation effect.

```javascript
import { useFloatingCard } from '../hooks/useMotion'

const ref = useFloatingCard({
  amplitude: 10,
  frequency: 3,
  duration: '3s',
  respectReducedMotion: true
})
```

### useParallax

Mouse-responsive parallax effect.

```javascript
import { useParallax } from '../hooks/useMotion'

const [ref, offset] = useParallax({
  speed: 0.5,
  respectReducedMotion: true
})
```

### useMagnetic

Magnetic attraction effect based on cursor proximity.

```javascript
import { useMagnetic } from '../hooks/useMotion'

const [ref, isMagnetic] = useMagnetic({
  strength: 0.3,
  respectReducedMotion: true
})
```

### useTyping

Typing animation for text reveal.

```javascript
import { useTyping } from '../hooks/useMotion'

const { displayedText, isComplete } = useTyping(
  'Hello World',
  {
    speed: 50,
    delay: 0,
    respectReducedMotion: true
  }
)
```

## Motion Components

### FadeSlideIn

Versatile fade and slide animation component.

```javascript
import { FadeSlideIn } from '../components/Motion'

<FadeSlideIn 
  direction="up"
  delay={0.2}
  duration="0.6s"
  easing="ease-out"
  triggerOnce={true}
  respectReducedMotion={true}
>
  <div>Your content</div>
</FadeSlideIn>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | 'up' 'down' 'left' 'right' | 'up' | Slide direction |
| `delay` | number | 0 | Delay in seconds |
| `duration` | string | '0.6s' | Animation duration |
| `easing` | string | 'ease-out' | CSS easing function |
| `triggerOnce` | boolean | true | Trigger once or repeat |
| `respectReducedMotion` | boolean | true | Honor reduced motion |

### ScaleIn

Scale animation component.

```javascript
import { ScaleIn } from '../components/Motion'

<ScaleIn 
  delay={0.1}
  duration="0.4s"
  easing="cubic-bezier(0.34, 1.56, 0.64, 1)"
  initialScale={0.8}
>
  <div>Your content</div>
</ScaleIn>
```

### RotateIn

Rotation animation component.

```javascript
import { RotateIn } from '../components/Motion'

<RotateIn 
  delay={0.1}
  duration="0.6s"
  initialRotation={-15}
>
  <div>Your content</div>
</RotateIn>
```

### StaggerContainer

Container for coordinating staggered animations.

```javascript
import { StaggerContainer } from '../components/Motion'

<StaggerContainer staggerDelay={0.1}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerContainer>
```

## Route Transitions

### TransitionProvider

Context provider for managing route transitions.

```javascript
import { TransitionProvider } from '../components/LuxuryTransition'

<TransitionProvider>
  <App />
</TransitionProvider>
```

### LuxuryTransition

High-level transition component with loading overlay.

```javascript
import { LuxuryTransition } from '../components/LuxuryTransition'

<LuxuryTransition>
  <Routes>
    {/* Your routes */}
  </Routes>
</LuxuryTransition>
```

### PageTransition

Individual page transition wrapper.

```javascript
import { PageTransition } from '../components/LuxuryTransition'

<PageTransition path="/about">
  <AboutPage />
</PageTransition>
```

## CSS Classes

### Motion Utilities

- `.motion-lift` - Hover lift effect
- `.motion-scale` - Hover scale effect
- `.motion-glow` - Hover glow effect
- `.floating-custom` - Customizable floating animation
- `.magnetic-element` - Magnetic effect base class
- `.parallax-element` - Parallax effect base class

### Reveal Animations

- `.reveal-fade-up` - Fade up animation
- `.reveal-fade-down` - Fade down animation
- `.reveal-scale` - Scale animation
- `.reveal-rotate` - Rotate animation

### Transition Classes

- `.transition-forward-out` - Forward navigation exit
- `.transition-forward-in` - Forward navigation entrance
- `.transition-backward-out` - Back navigation exit
- `.transition-backward-in` - Back navigation entrance

## Performance Considerations

### GPU Acceleration

All animations use `transform` and `opacity` properties for GPU acceleration:

```css
.animated-element {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}
```

### Reduced Motion Support

The system automatically detects and respects reduced motion preferences:

```javascript
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

When reduced motion is detected:
- Animations are disabled or simplified
- Static content is shown immediately
- Interactive effects are replaced with static states

### Memory Management

- IntersectionObserver instances are properly cleaned up
- Event listeners are removed on unmount
- CSS custom properties are cleaned up dynamically

## Accessibility

### ARIA Support

- `aria-live` regions for transition announcements
- `aria-busy` states during transitions
- Semantic markup for screen readers

### Keyboard Navigation

All interactive elements maintain keyboard accessibility:
- Focus management during transitions
- Skip links for navigation
- Proper focus indicators

## Best Practices

### Usage Guidelines

1. **Use sparingly** - Not every element needs animation
2. **Keep it brief** - Short animations (0.2-0.6s) work best
3. **Be consistent** - Use similar timing and easing throughout
4. **Test reduced motion** - Always test with reduced motion enabled
5. **Performance first** - Monitor frame rates and memory usage

### Common Patterns

#### Hero Section Animation

```javascript
const HeroSection = () => {
  return (
    <section className="hero">
      <FadeSlideIn direction="down" delay={0.1}>
        <h1>Hero Title</h1>
      </FadeSlideIn>
      <FadeSlideIn direction="up" delay={0.3}>
        <p>Hero description</p>
      </FadeSlideIn>
      <StaggerContainer staggerDelay={0.1}>
        <button>CTA 1</button>
        <button>CTA 2</button>
      </StaggerContainer>
    </section>
  )
}
```

#### Service Cards with Hover

```javascript
const ServiceCard = ({ service }) => {
  const [ref, isHovered] = useLuxuryHover({ scale: 1.05, lift: 8 })
  
  return (
    <FadeSlideIn>
      <div ref={ref} className={`service-card ${isHovered ? 'hovered' : ''}`}>
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
    </FadeSlideIn>
  )
}
```

## Troubleshooting

### Common Issues

**Animations not triggering:**
- Check if the element is in the viewport
- Verify the IntersectionObserver threshold
- Ensure the ref is properly attached

**Performance issues:**
- Reduce the number of animated elements
- Use `will-change` sparingly
- Monitor memory usage with dev tools

**Reduced motion not working:**
- Test with actual reduced motion settings
- Verify `respectReducedMotion` is enabled
- Check CSS media queries

### Debug Tools

Use browser dev tools to:
- Monitor animation performance
- Test reduced motion preferences
- Inspect IntersectionObserver callbacks
- Check memory usage

## Migration Guide

### From CSS Animations

Replace CSS classes with React components:

```javascript
// Before
<div className="fade-up">Content</div>

// After
<FadeSlideIn>Content</FadeSlideIn>
```

### From Other Libraries

The motion system is designed to be a drop-in replacement for most animation libraries while providing better accessibility and performance.

## Future Enhancements

- Spring physics animations
- Gesture-based animations
- Advanced timeline controls
- Performance monitoring dashboard
- Animation builder tool