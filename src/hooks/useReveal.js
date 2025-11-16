import { useEffect, useRef, useState, useCallback } from 'react'

export function useReveal(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [staggerIndex, setStaggerIndex] = useState(null)
  const ref = useRef(null)
  const groupRef = useRef(null)

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    duration: '0.6s',
    easing: 'ease-out',
    staggerDelay: 0.1,
    group: null,
    respectReducedMotion: true,
    ...options
  }

  // Check for reduced motion preference
  const shouldReduceMotion = useCallback(() => {
    if (!defaultOptions.respectReducedMotion) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [defaultOptions.respectReducedMotion])

  // Handle grouped stagger sequencing
  const handleGroupReveal = useCallback((element) => {
    if (!defaultOptions.group) return

    const groupElements = document.querySelectorAll(`[data-reveal-group="${defaultOptions.group}"]`)
    const elementIndex = Array.from(groupElements).indexOf(element)
    setStaggerIndex(elementIndex)

    // Apply staggered delay
    const delay = elementIndex * defaultOptions.staggerDelay
    element.style.transitionDelay = shouldReduceMotion() ? '0s' : `${delay}s`
  }, [defaultOptions.group, defaultOptions.staggerDelay, shouldReduceMotion])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set group attribute if specified
    if (defaultOptions.group) {
      element.setAttribute('data-reveal-group', defaultOptions.group)
    }

    // Apply custom duration and easing
    if (!shouldReduceMotion()) {
      element.style.setProperty('--reveal-duration', defaultOptions.duration)
      element.style.setProperty('--reveal-easing', defaultOptions.easing)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed) {
          setIsIntersecting(true)
          handleGroupReveal(entry.target)
          if (defaultOptions.triggerOnce) {
            setHasRevealed(true)
          }
        } else if (!entry.isIntersecting && !defaultOptions.triggerOnce) {
          setIsIntersecting(false)
        }
      },
      defaultOptions
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [
    defaultOptions.threshold, 
    defaultOptions.rootMargin, 
    defaultOptions.triggerOnce, 
    hasRevealed,
    defaultOptions.group,
    defaultOptions.duration,
    defaultOptions.easing,
    handleGroupReveal,
    shouldReduceMotion
  ])

  return [ref, isIntersecting, staggerIndex]
}

// Hook for grouped reveals
export function useGroupReveal(groupName, options = {}) {
  const [elements, setElements] = useState([])
  const groupRef = useRef(null)

  useEffect(() => {
    const groupElements = document.querySelectorAll(`[data-reveal-group="${groupName}"]`)
    setElements(Array.from(groupElements))
  }, [groupName])

  return { elements, groupRef }
}

// Hook for staggered children reveals
export function useStaggerReveal(options = {}) {
  const containerRef = useRef(null)
  const [visibleChildren, setVisibleChildren] = useState(new Set())

  const defaultOptions = {
    staggerDelay: 0.1,
    threshold: 0.1,
    triggerOnce: true,
    ...options
  }

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
            }, index * defaultOptions.staggerDelay * 1000)
          })

          if (defaultOptions.triggerOnce) {
            observer.unobserve(container)
          }
        } else if (!defaultOptions.triggerOnce) {
          setVisibleChildren(new Set())
        }
      },
      defaultOptions
    )

    observer.observe(container)

    return () => {
      if (container) {
        observer.unobserve(container)
      }
    }
  }, [defaultOptions.threshold, defaultOptions.triggerOnce, defaultOptions.staggerDelay])

  return [containerRef, visibleChildren]
}