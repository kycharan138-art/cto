import { Link } from 'react-router-dom'
import { Star, Users, Clock, CheckCircle, Award, Sparkles, Crown, Shield, Phone, Calendar, TrendingUp, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import './Home.css'

function ServiceCardSkeleton() {
  return (
    <div className="lux-service-card skeleton lux-card">
      <div className="skeleton-tier"></div>
      <div className="skeleton-header">
        <div className="skeleton-title"></div>
      </div>
      <div className="skeleton-description"></div>
      <div className="skeleton-pricing">
        <div className="skeleton-current-price"></div>
        <div className="skeleton-original-price"></div>
      </div>
      <div className="skeleton-features">
        <div className="skeleton-feature"></div>
        <div className="skeleton-feature"></div>
        <div className="skeleton-feature"></div>
      </div>
      <div className="skeleton-rating"></div>
      <div className="skeleton-button"></div>
    </div>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  // Reveal hooks for sections
  const [heroRef, heroRevealed] = useReveal({ threshold: 0.1 })
  const [featuresRef, featuresRevealed] = useReveal({ threshold: 0.1 })
  const [servicesRef, servicesRevealed] = useReveal({ threshold: 0.1 })
  const [ctaRef, ctaRevealed] = useReveal({ threshold: 0.1 })

  // Simulate loading services
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 second loading simulation
    return () => clearTimeout(timer)
  }, [])

  const handleBookService = () => {
    setIsButtonLoading(true)
    setTimeout(() => {
      setIsButtonLoading(false)
    }, 1500)
  }

  const luxuryFeatures = [
    {
      icon: <Crown size={32} />,
      title: 'Premium Concierge',
      description: 'Dedicated service coordinators who manage your entire home service portfolio with white-glove care.',
      badge: 'Exclusive'
    },
    {
      icon: <Shield size={32} />,
      title: 'Insured & Certified',
      description: 'All professionals are thoroughly vetted, background-checked, and fully insured for your peace of mind.',
      badge: 'Guaranteed'
    },
    {
      icon: <Award size={32} />,
      title: 'Award-Winning Service',
      description: 'Recognized as the industry leader in luxury home services with 98% client satisfaction.',
      badge: 'Top Rated'
    },
    {
      icon: <Sparkles size={32} />,
      title: 'Eco-Luxury Options',
      description: 'Sustainable premium services using eco-friendly products without compromising on excellence.',
      badge: 'Green'
    }
  ]

  const tieredServices = [
    {
      name: 'Essential Cleaning',
      description: 'Professional cleaning for everyday maintenance',
      price: '$99',
      originalPrice: '$149',
      rating: 4.8,
      reviews: 256,
      tier: 'Essential',
      features: ['2-hour service', 'Basic supplies included', 'Weekly scheduling'],
      popular: true
    },
    {
      name: 'Premium Plumbing',
      description: 'Expert plumbing with priority response',
      price: '$189',
      originalPrice: '$239',
      rating: 4.9,
      reviews: 189,
      tier: 'Premium',
      features: ['24/7 emergency support', 'Senior technicians', 'Warranty included'],
      popular: false
    },
    {
      name: 'Elite Electrical',
      description: 'Master electrician services with luxury upgrades',
      price: '$275',
      originalPrice: '$350',
      rating: 4.9,
      reviews: 142,
      tier: 'Elite',
      features: ['Smart home integration', 'Energy audit included', 'Lifetime warranty'],
      popular: false
    },
    {
      name: 'Signature Landscaping',
      description: 'Complete outdoor transformation with design',
      price: '$425',
      originalPrice: '$550',
      rating: 5.0,
      reviews: 203,
      tier: 'Signature',
      features: ['Custom design plans', 'Seasonal rotations', 'Premium materials'],
      popular: true
    }
  ]

  const testimonials = [
    {
      name: 'Alexandra Chen',
      location: 'Beverly Hills',
      text: 'The concierge service transformed how I manage my properties. Absolutely worth every penny.',
      rating: 5,
      service: 'Premium Concierge'
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section ref={heroRef} className={`hero ${heroRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`} aria-label="Luxury Home Services Hero">
        <div className="hero-background">
          <div className="hero-gradient-overlay"></div>
          <div className="hero-grid-pattern"></div>
          <div className="hero-gradient-orbs">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div>
          </div>
        </div>
        
        <div className="container">
          <div className="hero-layout">
            {/* Left Column - Content */}
            <div className="hero-content-column">
              <div className="hero-content">
                <div className={`hero-badge ${heroRevealed ? 'hero-entrance-up hero-delay-1' : ''}`}>
                  <Sparkles size={16} />
                  <span>Luxury Home Services</span>
                </div>
                <h1 className={`hero-title ${heroRevealed ? 'hero-entrance-up hero-delay-2' : ''}`}>
                  Transform Your Home Into a Sanctuary of Excellence
                </h1>
                <p className={`hero-subtitle ${heroRevealed ? 'hero-entrance-up hero-delay-3' : ''}`}>
                  Experience white-glove home services where every detail is meticulously crafted. 
                  From routine maintenance to complete luxury transformations, we elevate your living experience beyond expectations.
                </p>
                
                {/* Confidence Stats */}
                <div className={`hero-stats ${heroRevealed ? 'hero-entrance-up hero-delay-4' : ''}`}>
                  <div className="stat-item">
                    <div className="stat-number">98%</div>
                    <div className="stat-label">Client Satisfaction</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Premium Support</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">10K+</div>
                    <div className="stat-label">Homes Transformed</div>
                  </div>
                </div>
                
                <div className={`hero-buttons ${heroRevealed ? 'hero-entrance-up hero-delay-5' : ''}`}>
                  <Link to="/booking" className="btn btn-primary btn-large hero-cta-primary gradient-border btn-glow">
                    <Crown size={18} />
                    Start Your Journey
                  </Link>
                  <Link to="/services" className="btn btn-outline btn-large hero-cta-secondary lux-card">
                    <Calendar size={18} />
                    Schedule Consultation
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual Elements */}
            <div className="hero-visual-column">
              <div className="hero-visual-elements">
                {/* Floating Cards */}
                <div className={`floating-card floating-card-1 lux-card ${heroRevealed ? 'hero-entrance-right hero-delay-6' : ''} parallax-medium`} role="status" aria-label="5-Star Service Rating">
                  <div className="floating-card-icon" aria-hidden="true">
                    <Star size={20} />
                  </div>
                  <div className="floating-card-content">
                    <div className="floating-card-title">5-Star Service</div>
                    <div className="floating-card-value">4.9/5 Rating</div>
                  </div>
                </div>
                
                <div className={`floating-card floating-card-2 lux-card ${heroRevealed ? 'hero-entrance-left hero-delay-7' : ''} parallax-medium`} role="status" aria-label="Insurance and Guarantee">
                  <div className="floating-card-icon" aria-hidden="true">
                    <Shield size={20} />
                  </div>
                  <div className="floating-card-content">
                    <div className="floating-card-title">Fully Insured</div>
                    <div className="floating-card-value">100% Guaranteed</div>
                  </div>
                </div>
                
                <div className={`floating-card floating-card-3 lux-card ${heroRevealed ? 'hero-entrance-right hero-delay-8' : ''} parallax-medium`} role="status" aria-label="Service Punctuality">
                  <div className="floating-card-icon" aria-hidden="true">
                    <Clock size={20} />
                  </div>
                  <div className="floating-card-content">
                    <div className="floating-card-title">On-Time Service</div>
                    <div className="floating-card-value">Always Punctual</div>
                  </div>
                </div>
                
                {/* Schedule Callout */}
                <div className={`schedule-callout lux-card ${heroRevealed ? 'hero-entrance-up hero-delay-8' : ''} parallax-slow`} role="complementary" aria-label="Priority Scheduling Callout">
                  <div className="callout-header">
                    <Phone size={16} aria-hidden="true" />
                    <span>Priority Scheduling</span>
                  </div>
                  <div className="callout-content">
                    <div className="callout-title">Book Today</div>
                    <div className="callout-subtitle">Same-day availability</div>
                  </div>
                  <div className="callout-action">
                    <Link to="/booking" className="callout-btn btn-glow">
                      Reserve Now
                    </Link>
                  </div>
                </div>
                
                {/* Location Badge */}
                <div className={`location-badge lux-card ${heroRevealed ? 'hero-entrance-up hero-delay-6' : ''} parallax-fast`} role="status" aria-label="Service Location">
                  <MapPin size={16} aria-hidden="true" />
                  <span>Serving Beverly Hills & Beyond</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Features Section */}
      <section ref={featuresRef} className={`features section ${featuresRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Luxury Services?</h2>
            <p className="section-subtitle">
              Experience the pinnacle of home service excellence with our premium offerings
            </p>
          </div>
          <div className="features-grid grid-4">
            {luxuryFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`lux-feature-card lux-card hover-lift ${
                  featuresRevealed ? `fade-up delay-${(index + 1) * 100}` : ''
                }`}
              >
                <div className="lux-feature-badge">{feature.badge}</div>
                <div className="lux-feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Snippet */}
      <section className="testimonial-snippet">
        <div className="container">
          <div className="testimonial-card lux-card">
            <div className="testimonial-content">
              <div className="testimonial-rating">
                {'⭐'.repeat(testimonials[0].rating)}
              </div>
              <blockquote>"{testimonials[0].text}"</blockquote>
              <div className="testimonial-author">
                <strong>{testimonials[0].name}</strong>
                <span>{testimonials[0].location} • {testimonials[0].service}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiered Services Section */}
      <section ref={servicesRef} className={`tiered-services section ${servicesRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Service Tiers</h2>
            <p className="section-subtitle">
              Choose your level of luxury - from essential maintenance to signature transformations
            </p>
          </div>
          <div className="services-grid grid-4">
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: 4 }).map((_, index) => (
                <ServiceCardSkeleton key={`skeleton-${index}`} />
              ))
            ) : (
              tieredServices.map((service, index) => (
                <div 
                  key={index} 
                  className={`lux-service-card lux-card hover-lift gradient-border ${
                    servicesRevealed ? `fade-up delay-${(index + 1) * 100}` : ''
                  } ${service.popular ? 'popular' : ''}`}
                >
                  {service.popular && (
                    <div className="service-badge">
                      <Star size={14} />
                      <span>Most Popular</span>
                    </div>
                  )}
                  <div className="service-tier">{service.tier}</div>
                  <div className="service-header">
                    <h3>{service.name}</h3>
                  </div>
                  <p className="service-description">{service.description}</p>
                  <div className="service-pricing">
                    <span className="current-price">{service.price}</span>
                    <span className="original-price">{service.originalPrice}</span>
                  </div>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <CheckCircle size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="service-rating">
                    <span className="stars">
                      {'⭐'.repeat(Math.floor(service.rating))}
                    </span>
                    <span className="rating-value">{service.rating}</span>
                    <span className="reviews-count">({service.reviews})</span>
                  </div>
                  <button 
                    className="btn btn-primary" 
                    onClick={handleBookService}
                    disabled={isButtonLoading}
                  >
                    {isButtonLoading ? (
                      <span className="btn-loading">
                        <span className="btn-spinner"></span>
                        Loading...
                      </span>
                    ) : (
                      'Book Now'
                    )}
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="section-footer">
            <Link to="/services" className="btn btn-outline btn-large hover-lift lux-card">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Concierge CTA Section */}
      <section ref={ctaRef} className={`concierge-cta section ${ctaRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`}>
        <div className="container">
          <div className="cta-content lux-card">
            <div className="cta-icon">
              <Crown size={48} />
            </div>
            <h2>Ready for Luxury Living?</h2>
            <p>Join our exclusive concierge program and experience white-glove home service management</p>
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle size={16} />
                <span>Personal service coordinator</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={16} />
                <span>Priority scheduling</span>
              </div>
              <div className="cta-feature">
                <CheckCircle size={16} />
                <span>Exclusive rates</span>
              </div>
            </div>
            <div className="cta-buttons">
              <Link to="/booking" className="btn btn-primary btn-large hover-lift gradient-border">
                Start Concierge Service
              </Link>
              <Link to="/contact" className="btn btn-outline btn-large hover-lift lux-card">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
