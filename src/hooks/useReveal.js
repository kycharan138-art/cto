import { useEffect, useRef, useState } from 'react'

export function useReveal(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasRevealed, setHasRevealed] = useState(false)
  const ref = useRef(null)

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: true,
    ...options
  }

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed) {
          setIsIntersecting(true)
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
  }, [defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce, hasRevealed])

  return [ref, isIntersecting]
}