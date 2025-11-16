import React from 'react'
import { FadeSlideIn, ScaleIn, RotateIn, StaggerContainer } from '../components/Motion'
import { useLuxuryHover, useFloatingCard, useParallax, useMagnetic, useTyping } from '../hooks/useMotion'
import './MotionDemo.css'

export default function MotionDemo() {
  const [cardRef, isHovered] = useLuxuryHover({ scale: 1.08, lift: 12 })
  const [floatRef] = useFloatingCard({ amplitude: 15, frequency: 2.5 })
  const [parallaxRef, offset] = useParallax({ speed: 0.3 })
  const [magneticRef, isMagnetic] = useMagnetic({ strength: 0.4 })
  const { displayedText, isComplete } = useTyping('Welcome to the Motion System Demo', { speed: 50, delay: 500 })

  const demoItems = [
    { title: 'Luxury Hover', description: 'Elegant hover effects with customizable scaling and lift' },
    { title: 'Floating Cards', description: 'Smooth floating animations with adjustable parameters' },
    { title: 'Parallax Effects', description: 'Interactive parallax that responds to mouse movement' },
    { title: 'Magnetic Elements', description: 'Elements that attract to cursor proximity' },
    { title: 'Typing Animation', description: 'Smooth text reveal with typing effect' },
    { title: 'Staggered Reveals', description: 'Sequential animations for multiple elements' }
  ]

  return (
    <div className="motion-demo">
      <section className="demo-hero">
        <div className="demo-content">
          <FadeSlideIn direction="down" delay={0.2}>
            <h1 className="demo-title">
              {displayedText}
              {!isComplete && <span className="typing-cursor">|</span>}
            </h1>
          </FadeSlideIn>
          
          <FadeSlideIn direction="up" delay={0.8}>
            <p className="demo-subtitle">
              Experience our premium motion system with accessibility-first design
            </p>
          </FadeSlideIn>
        </div>
      </section>

      <section className="demo-grid">
        <StaggerContainer staggerDelay={0.1}>
          {demoItems.map((item, index) => (
            <div key={index} className="demo-card">
              <ScaleIn delay={index * 0.1}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </ScaleIn>
            </div>
          ))}
        </StaggerContainer>
      </section>

      <section className="interactive-demo">
        <h2 className="section-title">
          <FadeSlideIn>Interactive Motion Examples</FadeSlideIn>
        </h2>
        
        <div className="interactive-grid">
          <div 
            ref={cardRef} 
            className={`interactive-card luxury-hover ${isHovered ? 'hovered' : ''}`}
          >
            <h3>Luxury Hover Card</h3>
            <p>Hover over me to see the luxury effect</p>
            {isHovered && <span className="hover-indicator">✨ Hovering</span>}
          </div>

          <div ref={floatRef} className="interactive-card floating-card">
            <h3>Floating Card</h3>
            <p>I'm floating gently</p>
          </div>

          <div ref={parallaxRef} className="interactive-card parallax-card">
            <h3>Parallax Card</h3>
            <p>Move your mouse to see parallax</p>
            <small>Offset: X:{offset.x.toFixed(0)}, Y:{offset.y.toFixed(0)}</small>
          </div>

          <div ref={magneticRef} className={`interactive-card magnetic-card ${isMagnetic ? 'magnetic' : ''}`}>
            <h3>Magnetic Card</h3>
            <p>Get close to feel the magnetism</p>
            {isMagnetic && <span className="magnetic-indicator">🧲 Magnetic</span>}
          </div>
        </div>
      </section>

      <section className="reveal-demo">
        <h2 className="section-title">
          <FadeSlideIn>Reveal Animations</FadeSlideIn>
        </h2>
        
        <div className="reveal-grid">
          <RotateIn delay={0.1}>
            <div className="reveal-card rotate">
              <h3>Rotate In</h3>
              <p>I rotate as I appear</p>
            </div>
          </RotateIn>

          <FadeSlideIn direction="left" delay={0.2}>
            <div className="reveal-card slide-left">
              <h3>Slide From Left</h3>
              <p>I slide in from the left</p>
            </div>
          </FadeSlideIn>

          <FadeSlideIn direction="right" delay={0.3}>
            <div className="reveal-card slide-right">
              <h3>Slide From Right</h3>
              <p>I slide in from the right</p>
            </div>
          </FadeSlideIn>

          <FadeSlideIn direction="up" delay={0.4}>
            <div className="reveal-card slide-up">
              <h3>Slide From Bottom</h3>
              <p>I slide up from below</p>
            </div>
          </FadeSlideIn>
        </div>
      </section>

      <section className="performance-info">
        <FadeSlideIn delay={0.5}>
          <div className="info-card">
            <h3>Performance & Accessibility</h3>
            <ul>
              <li>✅ All animations use transform/opacity for 60fps performance</li>
              <li>✅ Respects prefers-reduced-motion for accessibility</li>
              <li>✅ GPU-accelerated with will-change optimization</li>
              <li>✅ Graceful fallbacks for reduced motion users</li>
              <li>✅ ARIA labels and screen reader support</li>
            </ul>
          </div>
        </FadeSlideIn>
      </section>
    </div>
  )
}