import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const TransitionContext = createContext()

export function useTransition() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider')
  }
  return context
}

export function TransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionClass, setTransitionClass] = useState('')
  const location = useLocation()

  const startTransition = (direction = 'forward') => {
    setIsTransitioning(true)
    setTransitionClass(`transition-${direction}-out`)
    
    setTimeout(() => {
      setTransitionClass(`transition-${direction}-in`)
      setTimeout(() => {
        setIsTransitioning(false)
        setTransitionClass('')
      }, 300)
    }, 150)
  }

  const value = {
    isTransitioning,
    transitionClass,
    startTransition
  }

  return (
    <TransitionContext.Provider value={value}>
      <div className={`transition-container ${transitionClass}`}>
        {children}
      </div>
    </TransitionContext.Provider>
  )
}

export function LuxuryTransition({ children }) {
  const { isTransitioning, transitionClass } = useTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shouldReduceMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    return (
      <div className="luxury-transition-static" role="status" aria-live="polite">
        {children}
      </div>
    )
  }

  return (
    <div 
      className={`luxury-transition ${transitionClass}`}
      role="status"
      aria-live="polite"
      aria-busy={isTransitioning}
    >
      {isTransitioning && (
        <div className="transition-overlay" aria-hidden="true">
          <div className="transition-spinner" />
        </div>
      )}
      <div className={`transition-content ${mounted ? 'mounted' : ''}`}>
        {children}
      </div>
    </div>
  )
}

export function PageTransition({ children, path }) {
  const [isVisible, setIsVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [path])

  const shouldReduceMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    return (
      <div className="page-transition-static" role="region" aria-label={`${path} content`}>
        {children}
      </div>
    )
  }

  return (
    <div 
      className={`page-transition ${isVisible ? 'visible' : 'hidden'}`}
      role="region"
      aria-label={`${path} content`}
    >
      {children}
    </div>
  )
}