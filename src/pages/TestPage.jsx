import React from 'react'
import { FadeSlideIn, ScaleIn, StaggerContainer } from '../components/Motion'
import { useLuxuryHover, useFloatingCard } from '../hooks/useMotion'
import './TestPage.css'

export default function TestPage() {
  const [cardRef, isHovered] = useLuxuryHover({ scale: 1.08, lift: 12 })
  const [floatRef] = useFloatingCard({ amplitude: 15, frequency: 2.5 })

  return (
    <div className="test-page">
      <section className="test-hero">
        <FadeSlideIn direction="down" delay={0.2}>
          <h1>Motion System Test</h1>
        </FadeSlideIn>
        <FadeSlideIn direction="up" delay={0.4}>
          <p>Testing all motion components and hooks</p>
        </FadeSlideIn>
      </section>

      <section className="test-grid">
        <StaggerContainer staggerDelay={0.1}>
          <ScaleIn delay={0.1}>
            <div className="test-card">
              <h3>Scale In</h3>
              <p>This card scales in when visible</p>
            </div>
          </ScaleIn>
          <FadeSlideIn direction="left" delay={0.2}>
            <div className="test-card">
              <h3>Slide Left</h3>
              <p>This card slides in from the left</p>
            </div>
          </FadeSlideIn>
          <FadeSlideIn direction="right" delay={0.3}>
            <div className="test-card">
              <h3>Slide Right</h3>
              <p>This card slides in from the right</p>
            </div>
          </FadeSlideIn>
        </StaggerContainer>
      </section>

      <section className="interactive-test">
        <h2>Interactive Effects</h2>
        <div className="interactive-grid">
          <div 
            ref={cardRef} 
            className={`interactive-test-card ${isHovered ? 'hovered' : ''}`}
          >
            <h3>Luxury Hover</h3>
            <p>Hover over me!</p>
            {isHovered && <span className="indicator">✨</span>}
          </div>
          <div ref={floatRef} className="interactive-test-card floating">
            <h3>Floating Card</h3>
            <p>I'm floating gently</p>
          </div>
        </div>
      </section>
    </div>
  )
}