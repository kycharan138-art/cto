import { useState } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle,
  Shield,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import './Booking.css'

const initialBookingData = {
  service: '',
  date: '',
  time: '',
  address: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  notes: ''
}

const services = [
  'House Cleaning',
  'Plumbing Repair',
  'Electrical Work',
  'Lawn Care',
  'HVAC Service',
  'Handyman Service',
  'Other'
]

const timeSlots = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM'
]

const stepDetails = [
  {
    id: 1,
    title: 'Service Preferences',
    caption: 'Curate the appointment details so our specialists can prepare in advance.'
  },
  {
    id: 2,
    title: 'Your Contact Details',
    caption: 'Share the best ways to reach you for confirmations and updates.'
  }
]

const luxuryHighlights = [
  {
    icon: Sparkles,
    title: 'Tailored Scheduling',
    description: 'Choose exact arrival windows and concierge notes for a bespoke experience.'
  },
  {
    icon: Shield,
    title: 'White-Glove Assurance',
    description: 'Meticulous, fully insured professionals with 98% client satisfaction.'
  },
  {
    icon: Phone,
    title: 'Concierge Support',
    description: 'Adjust or refine your booking anytime with our dedicated team.'
  }
]

const formatDate = (value) => {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function Booking() {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState(initialBookingData)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({
    type: 'info',
    message: 'Step 1 of 2: Choose your service preferences.'
  })

  const progressPercentage = submitted ? 100 : (step / stepDetails.length) * 100

  const getDescribedBy = (field, hasHelper = false) => {
    const ids = []
    if (hasHelper) ids.push(`${field}-helper`)
    if (errors[field]) ids.push(`${field}-error`)
    return ids.length ? ids.join(' ') : undefined
  }

  const clearErrors = (fields) => {
    setErrors((prev) => {
      const updated = { ...prev }
      fields.forEach((field) => {
        delete updated[field]
      })
      return updated
    })
  }

  const validateStepOne = () => {
    const requiredFields = ['service', 'date', 'time', 'address']
    const nextErrors = {}

    if (!bookingData.service) {
      nextErrors.service = 'Select the service you wish to transform.'
    }

    if (!bookingData.date) {
      nextErrors.date = 'Choose a preferred date to continue.'
    }

    if (!bookingData.time) {
      nextErrors.time = 'Select the ideal arrival window.'
    }

    if (!bookingData.address.trim()) {
      nextErrors.address = 'Share the service address so our team can prepare.'
    }

    if (Object.keys(nextErrors).length) {
      setErrors((prev) => ({ ...prev, ...nextErrors }))
      setStatus({
        type: 'error',
        message: 'Please complete the highlighted details to continue.'
      })
      return false
    }

    clearErrors(requiredFields)
    return true
  }

  const validateStepTwo = () => {
    const requiredFields = ['firstName', 'lastName', 'phone', 'email']
    const nextErrors = {}

    if (!bookingData.firstName.trim()) {
      nextErrors.firstName = 'Enter the first name we should greet you by.'
    }

    if (!bookingData.lastName.trim()) {
      nextErrors.lastName = 'Add your family name for reservation records.'
    }

    if (!bookingData.phone.trim()) {
      nextErrors.phone = 'Provide a phone number for concierge updates.'
    }

    if (!bookingData.email.trim()) {
      nextErrors.email = 'We need an email to send your confirmation.'
    }

    if (Object.keys(nextErrors).length) {
      setErrors((prev) => ({ ...prev, ...nextErrors }))
      setStatus({
        type: 'error',
        message: 'Please complete your contact details before submitting.'
      })
      return false
    }

    clearErrors(requiredFields)
    return true
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setBookingData((prev) => ({
      ...prev,
      [name]: value
    }))

    setErrors((prev) => {
      if (!prev[name]) return prev
      const updated = { ...prev }
      delete updated[name]
      return updated
    })
  }

  const handleNext = () => {
    if (validateStepOne()) {
      setStep(2)
      setStatus({
        type: 'info',
        message: 'Step 2 of 2: Share how our concierge team can reach you.'
      })
    }
  }

  const handleBack = () => {
    setStep(1)
    setStatus({
      type: 'info',
      message: 'Step 1 of 2: Update your service preferences.'
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateStepTwo()) {
      return
    }

    setIsSubmitting(true)
    setStatus({
      type: 'loading',
      message: 'Processing your reservation with our concierge team...'
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setStatus({
        type: 'success',
        message: 'Booking confirmed! Our concierge team will reach out shortly.'
      })
    }, 1600)
  }

  const handleReset = () => {
    setSubmitted(false)
    setStep(1)
    setBookingData(initialBookingData)
    setErrors({})
    setStatus({
      type: 'info',
      message: 'Step 1 of 2: Choose your service preferences.'
    })
  }

  const getMinDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  }

  const summaryDetails = [
    {
      label: 'Service',
      value: bookingData.service || 'Select a premium service to begin.'
    },
    {
      label: 'Preferred Date',
      value: formatDate(bookingData.date) || 'Choose a date that suits you.'
    },
    {
      label: 'Preferred Time',
      value: bookingData.time || 'Select the ideal arrival window.'
    },
    {
      label: 'Service Address',
      value: bookingData.address || 'We will confirm the service location here.'
    }
  ]

  return (
    <div className="booking-page">
      <section className="booking-hero">
        <div className="container booking-hero-inner">
          <span className="booking-badge">Elevated Home Services</span>
          <h1>Reserve Your Signature Booking Experience</h1>
          <p>
            Our concierge team orchestrates every detail to transform your space with precision,
            care, and a touch of luxury.
          </p>
        </div>
      </section>

      <div className="booking-content">
        <div className="container">
          <div className="booking-layout">
            <aside className="booking-overview glass-panel fade-up">
              <div className="progress-header">
                <h2 className="progress-title">Your Booking Journey</h2>
                <p className="progress-subtitle">Two refined steps to secure your appointment.</p>
              </div>

              <div className="progress-track" aria-hidden="true">
                <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
              </div>

              <ol className="progress-steps" role="list">
                {stepDetails.map((detail) => {
                  const isActive = step === detail.id && !submitted
                  const isCompleted = submitted || step > detail.id

                  return (
                    <li
                      key={detail.id}
                      className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`.trim()}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <div className="step-indicator" aria-hidden="true">
                        {detail.id}
                        <span className="step-indicator-glow" />
                      </div>
                      <div className="step-copy">
                        <p className="step-title">{detail.title}</p>
                        <p className="step-caption">{detail.caption}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>

              <div className="booking-summary-card glass-subpanel subtle-float">
                <h3>Reservation Snapshot</h3>
                <dl className="summary-grid">
                  {summaryDetails.map((item) => (
                    <div className="summary-row" key={item.label}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                  <div className="summary-row">
                    <dt>Concierge Notes</dt>
                    <dd>{bookingData.notes || 'Add any special instructions or requests.'}</dd>
                  </div>
                </dl>
              </div>

              <div className="booking-highlights">
                {luxuryHighlights.map(({ icon: Icon, title, description }) => (
                  <div className="highlight-card" key={title}>
                    <div className="highlight-icon" aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="highlight-title">{title}</p>
                      <p className="highlight-description">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="support-banner glass-subpanel">
                <p className="support-title">Need assistance?</p>
                <p className="support-description">
                  Our concierge desk is ready to refine your booking:{' '}
                  <a href="tel:+18881234567">+1 (888) 123-4567</a>
                </p>
              </div>
            </aside>

            <div className="booking-form-panel glass-panel fade-up">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="booking-form" noValidate aria-busy={isSubmitting}>
                  <div className={`form-status ${status.type}`} role="status" aria-live="polite">
                    <span className="status-indicator" aria-hidden="true" />
                    <p>{status.message}</p>
                  </div>

                  <div key={step} className="form-step-wrapper fade-up">
                    {step === 1 ? (
                      <fieldset className="form-section" aria-describedby="step-one-description">
                        <legend id="step-one-title">Service Preferences</legend>
                        <p id="step-one-description" className="section-intro">
                          Curate every detail so our specialists can prepare in advance.
                        </p>

                        <div className={`field-control ${errors.service ? 'has-error' : ''}`}>
                          <label htmlFor="service">
                            <Sparkles size={18} aria-hidden="true" />
                            Primary Service <span className="label-required" aria-hidden="true">*</span>
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={bookingData.service}
                            onChange={handleInputChange}
                            required
                            aria-invalid={errors.service ? 'true' : undefined}
                            aria-describedby={getDescribedBy('service', true)}
                          >
                            <option value="" disabled>
                              Select a signature service
                            </option>
                            {services.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                          <p id="service-helper" className="field-helper">
                            Each selection is matched with a dedicated specialist.
                          </p>
                          {errors.service && (
                            <p id="service-error" className="field-error">
                              {errors.service}
                            </p>
                          )}
                        </div>

                        <div className="form-grid">
                          <div className={`field-control ${errors.date ? 'has-error' : ''}`}>
                            <label htmlFor="date">
                              <Calendar size={18} aria-hidden="true" />
                              Preferred Date <span className="label-required" aria-hidden="true">*</span>
                            </label>
                            <input
                              id="date"
                              type="date"
                              name="date"
                              value={bookingData.date}
                              onChange={handleInputChange}
                              min={getMinDate()}
                              required
                              aria-invalid={errors.date ? 'true' : undefined}
                              aria-describedby={getDescribedBy('date', true)}
                            />
                            <p id="date-helper" className="field-helper">
                              We recommend selecting at least 24 hours in advance.
                            </p>
                            {errors.date && (
                              <p id="date-error" className="field-error">
                                {errors.date}
                              </p>
                            )}
                          </div>

                          <div className={`field-control ${errors.time ? 'has-error' : ''}`}>
                            <label htmlFor="time">
                              <Clock size={18} aria-hidden="true" />
                              Preferred Time <span className="label-required" aria-hidden="true">*</span>
                            </label>
                            <select
                              id="time"
                              name="time"
                              value={bookingData.time}
                              onChange={handleInputChange}
                              required
                              aria-invalid={errors.time ? 'true' : undefined}
                              aria-describedby={getDescribedBy('time', true)}
                            >
                              <option value="" disabled>
                                Select a bespoke arrival window
                              </option>
                              {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                  {slot}
                                </option>
                              ))}
                            </select>
                            <p id="time-helper" className="field-helper">
                              Our team will confirm a precise arrival within this window.
                            </p>
                            {errors.time && (
                              <p id="time-error" className="field-error">
                                {errors.time}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className={`field-control ${errors.address ? 'has-error' : ''}`}>
                          <label htmlFor="address">
                            <MapPin size={18} aria-hidden="true" />
                            Service Address <span className="label-required" aria-hidden="true">*</span>
                          </label>
                          <input
                            id="address"
                            type="text"
                            name="address"
                            placeholder="123 Main Street, City, State"
                            value={bookingData.address}
                            onChange={handleInputChange}
                            required
                            aria-invalid={errors.address ? 'true' : undefined}
                            aria-describedby={getDescribedBy('address', true)}
                          />
                          <p id="address-helper" className="field-helper">
                            Provide entry instructions or gate codes in the notes below if needed.
                          </p>
                          {errors.address && (
                            <p id="address-error" className="field-error">
                              {errors.address}
                            </p>
                          )}
                        </div>

                        <div className="field-control">
                          <label htmlFor="notes">Concierge Notes</label>
                          <textarea
                            id="notes"
                            name="notes"
                            placeholder="Share preferences, access notes, or special requests."
                            value={bookingData.notes}
                            onChange={handleInputChange}
                            aria-describedby="notes-helper"
                          />
                          <p id="notes-helper" className="field-helper">
                            Optional: help us tailor the experience to your home.
                          </p>
                        </div>

                        <div className="form-actions">
                          <button
                            type="button"
                            className="btn btn-primary btn-large btn-glow"
                            onClick={handleNext}
                            disabled={isSubmitting}
                          >
                            Continue to Contact Details
                            <ArrowRight size={18} aria-hidden="true" />
                          </button>
                        </div>
                      </fieldset>
                    ) : (
                      <fieldset className="form-section" aria-describedby="step-two-description">
                        <legend id="step-two-title">Contact Information</legend>
                        <p id="step-two-description" className="section-intro">
                          Share the best ways to reach you for confirmations and updates.
                        </p>

                        <div className="form-grid">
                          <div className={`field-control ${errors.firstName ? 'has-error' : ''}`}>
                            <label htmlFor="firstName">
                              <User size={18} aria-hidden="true" />
                              First Name <span className="label-required" aria-hidden="true">*</span>
                            </label>
                            <input
                              id="firstName"
                              type="text"
                              name="firstName"
                              placeholder="Alex"
                              value={bookingData.firstName}
                              onChange={handleInputChange}
                              required
                              aria-invalid={errors.firstName ? 'true' : undefined}
                              aria-describedby={getDescribedBy('firstName', true)}
                            />
                            <p id="firstName-helper" className="field-helper">
                              We will greet you by this name upon arrival.
                            </p>
                            {errors.firstName && (
                              <p id="firstName-error" className="field-error">
                                {errors.firstName}
                              </p>
                            )}
                          </div>

                          <div className={`field-control ${errors.lastName ? 'has-error' : ''}`}>
                            <label htmlFor="lastName">
                              <User size={18} aria-hidden="true" />
                              Last Name <span className="label-required" aria-hidden="true">*</span>
                            </label>
                            <input
                              id="lastName"
                              type="text"
                              name="lastName"
                              placeholder="Morgan"
                              value={bookingData.lastName}
                              onChange={handleInputChange}
                              required
                              aria-invalid={errors.lastName ? 'true' : undefined}
                              aria-describedby={getDescribedBy('lastName', true)}
                            />
                            <p id="lastName-helper" className="field-helper">
                              Helps us verify your reservation details.
                            </p>
                            {errors.lastName && (
                              <p id="lastName-error" className="field-error">
                                {errors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="form-grid">
                          <div className={`field-control ${errors.phone ? 'has-error' : ''}`}>
                            <label htmlFor="phone">
                              <Phone size={18} aria-hidden="true" />
                              Phone Number <span className="label-required" aria-hidden="true">*</span>
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              name="phone"
                              placeholder="+1 (555) 123-4567"
                              value={bookingData.phone}
                              onChange={handleInputChange}
                              required
                              aria-invalid={errors.phone ? 'true' : undefined}
                              aria-describedby={getDescribedBy('phone', true)}
                            />
                            <p id="phone-helper" className="field-helper">
                              We will text updates and arrival confirmations to this number.
                            </p>
                            {errors.phone && (
                              <p id="phone-error" className="field-error">
                                {errors.phone}
                              </p>
                            )}
                          </div>

                          <div className={`field-control ${errors.email ? 'has-error' : ''}`}>
                            <label htmlFor="email">
                              <Mail size={18} aria-hidden="true" />
                              Email <span className="label-required" aria-hidden="true">*</span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              name="email"
                              placeholder="alex@example.com"
                              value={bookingData.email}
                              onChange={handleInputChange}
                              required
                              aria-invalid={errors.email ? 'true' : undefined}
                              aria-describedby={getDescribedBy('email', true)}
                            />
                            <p id="email-helper" className="field-helper">
                              Your confirmation itinerary will arrive in this inbox.
                            </p>
                            {errors.email && (
                              <p id="email-error" className="field-error">
                                {errors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="form-actions dual">
                          <button
                            type="button"
                            className="btn btn-outline btn-large"
                            onClick={handleBack}
                            disabled={isSubmitting}
                          >
                            Back to Service Details
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary btn-large btn-glow"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="button-spinner" aria-hidden="true" />
                                Finalizing...
                              </>
                            ) : (
                              <>
                                Confirm Luxury Booking
                                <ArrowRight size={18} aria-hidden="true" />
                              </>
                            )}
                          </button>
                        </div>
                      </fieldset>
                    )}
                  </div>
                </form>
              ) : (
                <div className="success-panel" role="status" aria-live="polite">
                  <div className="success-icon" aria-hidden="true">
                    <CheckCircle size={64} />
                  </div>
                  <p className="success-badge">Luxury booking confirmed</p>
                  <h2>Your reservation is complete</h2>
                  <p className="success-copy">
                    Thank you, {bookingData.firstName || 'valued guest'}. Our concierge team will reach out shortly to
                    finalize the finer details of your visit.
                  </p>
                  <div className="success-details">
                    <div className="detail-row">
                      <span>Service</span>
                      <strong>{bookingData.service}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Date</span>
                      <strong>{formatDate(bookingData.date)}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Time</span>
                      <strong>{bookingData.time}</strong>
                    </div>
                    <div className="detail-row">
                      <span>Address</span>
                      <strong>{bookingData.address}</strong>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary btn-large btn-glow" onClick={handleReset}>
                    Book Another Service
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
