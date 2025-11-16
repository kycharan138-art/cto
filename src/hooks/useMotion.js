import { useState, useEffect, useRef, useCallback } from 'react'

// Luxury hover effect hook
export function useLuxuryHover(options = {}) {
  const [isHovered, setIsHovered] = useState(false)
  const elementRef = useRef(null)

  const defaultOptions = {
    scale: 1.05,
    lift: 8,
    glowColor: 'rgba(59, 130, 246, 0.3)',
    duration: 0.3,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    respectReducedMotion: true,
    ...options
  }

  const shouldReduceMotion = useCallback(() => {
    if (!defaultOptions.respectReducedMotion) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [defaultOptions.respectReducedMotion])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleMouseEnter = () => {
      setIsHovered(true)
      if (!shouldReduceMotion()) {
        element.style.transform = `translateY(-${defaultOptions.lift}px) scale(${defaultOptions.scale})`
        element.style.boxShadow = `0 20px 40px ${defaultOptions.glowColor}`
        element.style.transition = `transform ${defaultOptions.duration}s ${defaultOptions.easing}, box-shadow ${defaultOptions.duration}s ${defaultOptions.easing}`
      }
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      if (!shouldReduceMotion()) {
        element.style.transform = 'translateY(0) scale(1)'
        element.style.boxShadow = ''
      }
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [defaultOptions, shouldReduceMotion])

  return [elementRef, isHovered]
}

// Floating card animation hook
export function useFloatingCard(options = {}) {
  const elementRef = useRef(null)

  const defaultOptions = {
    amplitude: 10,
    frequency: 3,
    duration: '3s',
    respectReducedMotion: true,
    ...options
  }

  const shouldReduceMotion = useCallback(() => {
    if (!defaultOptions.respectReducedMotion) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [defaultOptions.respectReducedMotion])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (!shouldReduceMotion()) {
      element.style.animation = `floating ${defaultOptions.duration} ease-in-out infinite`
      
      // Create custom keyframes for this instance
      const styleId = `floating-${Date.now()}`
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        @keyframes floating-${styleId} {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${defaultOptions.amplitude}px); }
        }
      `
      document.head.appendChild(style)

      // Update animation to use unique keyframes
      element.style.animation = `floating-${styleId} ${defaultOptions.duration} ease-in-out infinite`

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [defaultOptions, shouldReduceMotion])

  return elementRef
}

// Parallax effect hook
export function useParallax(options = {}) {
  const elementRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const defaultOptions = {
    speed: 0.5,
    respectReducedMotion: true,
    ...options
  }

  const shouldReduceMotion = useCallback(() => {
    if (!defaultOptions.respectReducedMotion) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [defaultOptions.respectReducedMotion])

  useEffect(() => {
    const element = elementRef.current
    if (!element || shouldReduceMotion()) return

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const x = (e.clientX - centerX) * defaultOptions.speed
      const y = (e.clientY - centerY) * defaultOptions.speed
      
      setOffset({ x, y })
      element.style.transform = `translate(${x}px, ${y}px)`
    }

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 })
      element.style.transform = 'translate(0, 0)'
    }

    window.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [defaultOptions.speed, shouldReduceMotion])

  return [elementRef, offset]
}

// Magnetic effect hook
export function useMagnetic(options = {}) {
  const elementRef = useRef(null)
  const [isMagnetic, setIsMagnetic] = useState(false)

  const defaultOptions = {
    strength: 0.3,
    respectReducedMotion: true,
    ...options
  }

  const shouldReduceMotion = useCallback(() => {
    if (!defaultOptions.respectReducedMotion) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [defaultOptions.respectReducedMotion])

  useEffect(() => {
    const element = elementRef.current
    if (!element || shouldReduceMotion()) return

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      
      if (distance < 100) {
        setIsMagnetic(true)
        const moveX = distanceX * defaultOptions.strength
        const moveY = distanceY * defaultOptions.strength
        element.style.transform = `translate(${moveX}px, ${moveY}px)`
      } else {
        setIsMagnetic(false)
        element.style.transform = 'translate(0, 0)'
      }
    }

    const handleMouseLeave = () => {
      setIsMagnetic(false)
      element.style.transform = 'translate(0, 0)'
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [defaultOptions.strength, shouldReduceMotion])

  return [elementRef, isMagnetic]
}

// Typing animation hook
export function useTyping(text, options = {}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const defaultOptions = {
    speed: 50,
    delay: 0,
    respectReducedMotion: true,
    ...options
  }

  const shouldReduceMotion = useCallback(() => {
    if (!defaultOptions.respectReducedMotion) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [defaultOptions.respectReducedMotion])

  useEffect(() => {
    if (shouldReduceMotion()) {
      setDisplayedText(text)
      setIsComplete(true)
      return
    }

    const timer = setTimeout(() => {
      let currentIndex = 0
      setDisplayedText('')
      
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(prev => prev + text[currentIndex])
          currentIndex++
        } else {
          setIsComplete(true)
          clearInterval(interval)
        }
      }, defaultOptions.speed)

      return () => clearInterval(interval)
    }, defaultOptions.delay)

    return () => clearTimeout(timer)
  }, [text, defaultOptions.speed, defaultOptions.delay, shouldReduceMotion])

  return { displayedText, isComplete }
}

// Stagger children animation hook
export function useStaggerChildren(options = {}) {
  const containerRef = useRef(null)
  const [visibleChildren, setVisibleChildren] = useState(new Set())

  const defaultOptions = {
    staggerDelay: 100,
    threshold: 0.1,
    triggerOnce: true,
    respectReducedMotion: true,
    ...options
  }

  const shouldReduceMotion = useCallback(() => {
    if (!defaultOptions.respectReducedMotion) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [defaultOptions.respectReducedMotion])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = container.children
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              setVisibleChildren(prev => new Set(prev).add(index))
            }, shouldReduceMotion() ? 0 : index * defaultOptions.staggerDelay)
          })

          if (defaultOptions.triggerOnce) {
            observer.unobserve(container)
          }
        } else if (!defaultOptions.triggerOnce) {
          setVisibleChildren(new Set())
        }
      },
      { threshold: defaultOptions.threshold }
    )

    observer.observe(container)

    return () => {
      if (container) {
        observer.unobserve(container)
      }
    }
  }, [defaultOptions.threshold, defaultOptions.triggerOnce, defaultOptions.staggerDelay, shouldReduceMotion])

  return [containerRef, visibleChildren]
}