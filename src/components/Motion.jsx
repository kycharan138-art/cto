import React from 'react'
import { useReveal } from '../hooks/useReveal'

export function FadeSlideIn({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = '0.6s',
  easing = 'ease-out',
  className = '',
  triggerOnce = true,
  respectReducedMotion = true,
  ...props 
}) {
  const [ref, isRevealed] = useReveal({
    triggerOnce,
    duration,
    easing,
    respectReducedMotion
  })

  const getInitialStyles = () => {
    if (respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return {}
    }

    const baseStyles = {
      opacity: 0,
      transition: `opacity ${duration} ${easing}, transform ${duration} ${easing}`,
      transitionDelay: `${delay}s`
    }

    switch (direction) {
      case 'up':
        return { ...baseStyles, transform: 'translateY(30px)' }
      case 'down':
        return { ...baseStyles, transform: 'translateY(-30px)' }
      case 'left':
        return { ...baseStyles, transform: 'translateX(-30px)' }
      case 'right':
        return { ...baseStyles, transform: 'translateX(30px)' }
      default:
        return baseStyles
    }
  }

  const getRevealedStyles = () => {
    if (respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return { opacity: 1 }
    }
    return {
      opacity: 1,
      transform: 'translate(0, 0)'
    }
  }

  return (
    <div
      ref={ref}
      className={`fade-slide-in ${className}`}
      style={isRevealed ? getRevealedStyles() : getInitialStyles()}
      {...props}
    >
      {children}
    </div>
  )
}

export function ScaleIn({ 
  children, 
  delay = 0,
  duration = '0.4s',
  easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  initialScale = 0.8,
  className = '',
  triggerOnce = true,
  respectReducedMotion = true,
  ...props 
}) {
  const [ref, isRevealed] = useReveal({
    triggerOnce,
    duration,
    easing,
    respectReducedMotion
  })

  const shouldReduceMotion = respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const style = shouldReduceMotion 
    ? { opacity: 1 }
    : {
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'scale(1)' : `scale(${initialScale})`,
        transition: `opacity ${duration} ${easing}, transform ${duration} ${easing}`,
        transitionDelay: `${delay}s`
      }

  return (
    <div
      ref={ref}
      className={`scale-in ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

export function RotateIn({ 
  children, 
  delay = 0,
  duration = '0.6s',
  easing = 'ease-out',
  initialRotation = -15,
  className = '',
  triggerOnce = true,
  respectReducedMotion = true,
  ...props 
}) {
  const [ref, isRevealed] = useReveal({
    triggerOnce,
    duration,
    easing,
    respectReducedMotion
  })

  const shouldReduceMotion = respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const style = shouldReduceMotion
    ? { opacity: 1 }
    : {
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'rotate(0deg) scale(1)' : `rotate(${initialRotation}deg) scale(0.9)`,
        transition: `opacity ${duration} ${easing}, transform ${duration} ${easing}`,
        transitionDelay: `${delay}s`
      }

  return (
    <div
      ref={ref}
      className={`rotate-in ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}

export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1,
  className = '',
  triggerOnce = true,
  respectReducedMotion = true,
  ...props 
}) {
  return (
    <div 
      className={`stagger-container ${className}`}
      data-stagger-delay={staggerDelay}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <FadeSlideIn
              delay={index * staggerDelay}
              triggerOnce={triggerOnce}
              respectReducedMotion={respectReducedMotion}
              {...child.props}
            >
              {child}
            </FadeSlideIn>
          )
        }
        return child
      })}
    </div>
  )
}

export function RevealOnScroll({ 
  children, 
  animation = 'fade-up',
  delay = 0,
  duration = '0.6s',
  easing = 'ease-out',
  className = '',
  triggerOnce = true,
  respectReducedMotion = true,
  ...props 
}) {
  const [ref, isRevealed] = useReveal({
    triggerOnce,
    duration,
    easing,
    respectReducedMotion
  })

  const shouldReduceMotion = respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const getAnimationClass = () => {
    if (shouldReduceMotion) return ''
    return isRevealed ? `reveal-${animation} revealed` : `reveal-${animation}`
  }

  const style = shouldReduceMotion 
    ? { opacity: 1 }
    : {
        transitionDelay: `${delay}s`
      }

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
}