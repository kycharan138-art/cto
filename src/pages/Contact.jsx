import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader, AlertCircle } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const [heroRef, heroRevealed] = useReveal({ threshold: 0.1 })
  const [infoRef, infoRevealed] = useReveal({ threshold: 0.1 })
  const [formRef, formRevealed] = useReveal({ threshold: 0.1 })
  const [mapRef, mapRevealed] = useReveal({ threshold: 0.1 })
  const [faqRef, faqRevealed] = useReveal({ threshold: 0.1 })

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : ''
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Please enter a valid email' : ''
      case 'subject':
        return value.trim() === '' ? 'Subject is required' : ''
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : ''
      default:
        return ''
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))

    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    Object.keys(formData).forEach(key => {
      if (key !== 'phone') {
        const error = validateField(key, formData[key])
        if (error) newErrors[key] = error
      }
    })

    setErrors(newErrors)
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    })

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          })
          setErrors({})
          setTouched({})
        }, 5000)
      }, 1500)
    }
  }

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      details: '+1 (800) 123-4567',
      subtext: 'Available 24/7',
      gradient: 'var(--hero-gradient-primary)'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: 'support@homepro.com',
      subtext: 'Response within 24 hours',
      gradient: 'var(--hero-gradient-secondary)'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Address',
      details: '123 Main Street',
      subtext: 'Your City, State 12345',
      gradient: 'var(--hero-gradient-accent)'
    },
    {
      icon: <Clock size={24} />,
      title: 'Hours',
      details: 'Mon - Fri: 8AM - 6PM',
      subtext: 'Sat - Sun: 10AM - 4PM',
      gradient: 'var(--luxury-gradient)'
    }
  ]

  const faqs = [
    {
      question: 'How do I book a service?',
      answer: 'Visit our Booking page, select your service, choose your preferred date and time, and provide your contact information. You\'ll receive a confirmation email with all the details.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, PayPal, and online bank transfers. Payment is processed securely during checkout.'
    },
    {
      question: 'Can I reschedule or cancel my booking?',
      answer: 'Yes, you can reschedule or cancel up to 24 hours before your appointment. Contact us or manage your booking through your account.'
    },
    {
      question: 'Are your service providers insured?',
      answer: 'Yes, all our service providers are fully licensed and insured. We prioritize safety and quality in all our services.'
    },
    {
      question: 'What if I\'m not satisfied with the service?',
      answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy, contact our customer support team and we\'ll make it right.'
    },
    {
      question: 'How are service professionals vetted?',
      answer: 'All professionals undergo background checks, license verification, and customer rating reviews. We maintain high standards of quality and professionalism.'
    }
  ]

  const [expandedFaq, setExpandedFaq] = useState(null)

  const serviceAreas = [
    { city: 'Downtown', availability: '24/7' },
    { city: 'North District', availability: 'Mon-Sat' },
    { city: 'South Valley', availability: 'Mon-Sat' },
    { city: 'East Side', availability: '24/7' },
    { city: 'West End', availability: 'Mon-Sun' },
    { city: 'Central Park', availability: '24/7' }
  ]

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero" ref={heroRef}>
        <div className="contact-hero-background">
          <div className="hero-gradient-overlay"></div>
          <div className="hero-grid-pattern"></div>
          <div className="hero-gradient-orbs">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div>
          </div>
        </div>
        <div className={`container contact-hero-content ${heroRevealed ? 'revealed' : ''}`}>
          <div className="hero-badge">
            <Mail size={16} />
            <span>We're Here to Help</span>
          </div>
          <h1>Get in Touch</h1>
          <p>Have questions? We're here to help! Reach out to our team and we'll respond as soon as possible.</p>
        </div>
      </section>

      <div className="container contact-container">
        {/* Contact Information */}
        <section 
          className={`contact-info-section reveal-fade-up ${infoRevealed ? 'revealed' : ''}`}
          ref={infoRef}
        >
          <div className="section-header">
            <h2 className="section-title">Contact Information</h2>
            <p className="section-subtitle">Multiple ways to reach our team</p>
          </div>
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card lux-card">
                <div className="contact-icon" style={{ background: info.gradient }}>
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                <p className="contact-detail">{info.details}</p>
                <p className="contact-subtext">{info.subtext}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="contact-main-grid">
          {/* Contact Form */}
          <section 
            className={`contact-form-section reveal-fade-up ${formRevealed ? 'revealed' : ''}`}
            ref={formRef}
          >
            <div className="section-header">
              <h2 className="section-title">Send us a Message</h2>
              <p className="section-subtitle">Fill out the form and we'll get back to you</p>
            </div>
            
            {submitted ? (
              <div className="success-message lux-card" role="status" aria-live="polite">
                <CheckCircle size={64} />
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. Our team will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form lux-card" noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={touched.name && errors.name ? 'error' : touched.name ? 'valid' : ''}
                      required
                      aria-required="true"
                      aria-invalid={touched.name && errors.name ? 'true' : 'false'}
                      aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                    />
                    {touched.name && errors.name && (
                      <span className="error-message" id="name-error" role="alert">
                        <AlertCircle size={14} />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={touched.email && errors.email ? 'error' : touched.email ? 'valid' : ''}
                      required
                      aria-required="true"
                      aria-invalid={touched.email && errors.email ? 'true' : 'false'}
                      aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    />
                    {touched.email && errors.email && (
                      <span className="error-message" id="email-error" role="alert">
                        <AlertCircle size={14} />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      aria-describedby="phone-hint"
                    />
                    <span className="field-hint" id="phone-hint">Optional</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">
                      Subject *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={touched.subject && errors.subject ? 'error' : touched.subject ? 'valid' : ''}
                      required
                      aria-required="true"
                      aria-invalid={touched.subject && errors.subject ? 'true' : 'false'}
                      aria-describedby={touched.subject && errors.subject ? 'subject-error' : undefined}
                    />
                    {touched.subject && errors.subject && (
                      <span className="error-message" id="subject-error" role="alert">
                        <AlertCircle size={14} />
                        {errors.subject}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={touched.message && errors.message ? 'error' : touched.message ? 'valid' : ''}
                    required
                    minLength="10"
                    aria-required="true"
                    aria-invalid={touched.message && errors.message ? 'true' : 'false'}
                    aria-describedby={touched.message && errors.message ? 'message-error' : 'message-hint'}
                  />
                  {touched.message && errors.message ? (
                    <span className="error-message" id="message-error" role="alert">
                      <AlertCircle size={14} />
                      {errors.message}
                    </span>
                  ) : (
                    <span className="field-hint" id="message-hint">Minimum 10 characters</span>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-large btn-glow"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader size={18} className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </section>

          {/* Service Area Map Card */}
          <section 
            className={`service-area-section reveal-fade-up ${mapRevealed ? 'revealed' : ''}`}
            ref={mapRef}
          >
            <div className="service-area-card lux-card">
              <div className="service-area-header">
                <MapPin size={24} className="area-icon" />
                <div>
                  <h3>Service Areas</h3>
                  <p>We serve multiple locations across the region</p>
                </div>
              </div>
              
              <div className="service-area-list">
                {serviceAreas.map((area, index) => (
                  <div key={index} className="service-area-item">
                    <div className="area-info">
                      <MapPin size={16} />
                      <span className="area-name">{area.city}</span>
                    </div>
                    <span className="area-badge">{area.availability}</span>
                  </div>
                ))}
              </div>

              <div className="service-area-footer">
                <p>Don't see your area? <a href="/booking" className="area-link">Contact us</a> to check availability</p>
              </div>
            </div>

            <div className="quick-stats lux-card">
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Support</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">&lt;1hr</div>
                <div className="stat-label">Response Time</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-value">98%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </section>
        </div>

        {/* FAQ Section */}
        <section 
          className={`faq-section reveal-fade-up ${faqRevealed ? 'revealed' : ''}`}
          ref={faqRef}
        >
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Find quick answers to common questions</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item lux-card">
                <button
                  className="faq-question"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  aria-expanded={expandedFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon ${expandedFaq === index ? 'expanded' : ''}`}>+</span>
                </button>
                {expandedFaq === index && (
                  <div className="faq-answer" id={`faq-answer-${index}`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
