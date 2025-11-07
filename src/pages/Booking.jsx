import { useState } from 'react'
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle } from 'lucide-react'
import './Booking.css'

export default function Booking() {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    address: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)

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
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    if (step === 1 && bookingData.service && bookingData.date && bookingData.time) {
      setStep(2)
    } else if (step === 1) {
      alert('Please select a service, date, and time')
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (bookingData.firstName && bookingData.lastName && bookingData.phone && bookingData.email && bookingData.address) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setStep(1)
        setBookingData({
          service: '',
          date: '',
          time: '',
          address: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          notes: ''
        })
      }, 3000)
    } else {
      alert('Please fill in all required fields')
    }
  }

  const getMinDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  }

  return (
    <div className="booking-page">
      <section className="booking-header">
        <div className="container">
          <h1>Book a Service</h1>
          <p>Quick and easy scheduling for your home service needs</p>
        </div>
      </section>

      <div className="container booking-container">
        {submitted ? (
          <div className="success-message">
            <CheckCircle size={64} />
            <h2>Booking Confirmed!</h2>
            <p>Thank you for your booking. We'll contact you shortly to confirm the appointment.</p>
            <p className="confirmation-details">
              Service: {bookingData.service}<br />
              Date: {new Date(bookingData.date).toLocaleDateString()}<br />
              Time: {bookingData.time}
            </p>
          </div>
        ) : (
          <div className="booking-form-wrapper">
            <div className="steps-indicator">
              <div className={`step ${step === 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <span>1</span>
                <label>Service Details</label>
              </div>
              <div className="step-line"></div>
              <div className={`step ${step === 2 ? 'active' : ''}`}>
                <span>2</span>
                <label>Your Information</label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              {step === 1 && (
                <div className="form-step">
                  <h2>Service Details</h2>

                  <div className="form-group">
                    <label htmlFor="service">Select a Service *</label>
                    <select
                      id="service"
                      name="service"
                      value={bookingData.service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose a service...</option>
                      {services.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">
                        <Calendar size={18} /> Preferred Date *
                      </label>
                      <input
                        id="date"
                        type="date"
                        name="date"
                        value={bookingData.date}
                        onChange={handleInputChange}
                        min={getMinDate()}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="time">
                        <Clock size={18} /> Preferred Time *
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={bookingData.time}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select time...</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">
                      <MapPin size={18} /> Service Address *
                    </label>
                    <input
                      id="address"
                      type="text"
                      name="address"
                      placeholder="123 Main Street, City, State 12345"
                      value={bookingData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes">Additional Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      placeholder="Tell us more about your service request (optional)"
                      value={bookingData.notes}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="button" onClick={handleNext} className="btn btn-primary btn-large">
                    Continue to Your Information
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <h2>Your Information</h2>

                  <div className="booking-summary">
                    <div className="summary-item">
                      <span className="summary-label">Service:</span>
                      <span className="summary-value">{bookingData.service}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Date:</span>
                      <span className="summary-value">{new Date(bookingData.date).toLocaleDateString()}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Time:</span>
                      <span className="summary-value">{bookingData.time}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Address:</span>
                      <span className="summary-value">{bookingData.address}</span>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">
                        <User size={18} /> First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="John"
                        value={bookingData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        value={bookingData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">
                        <Phone size={18} /> Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={bookingData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        <Mail size={18} /> Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={bookingData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={handleBack} className="btn btn-outline btn-large">
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary btn-large">
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
