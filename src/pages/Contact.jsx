import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.subject && formData.message) {
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
      }, 3000)
    } else {
      alert('Please fill in all required fields')
    }
  }

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: 'Phone',
      details: '+1 (800) 123-4567',
      subtext: 'Available 24/7'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email',
      details: 'support@homepro.com',
      subtext: 'Response within 24 hours'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Address',
      details: '123 Main Street',
      subtext: 'Your City, State 12345'
    },
    {
      icon: <Clock size={24} />,
      title: 'Hours',
      details: 'Mon - Fri: 8AM - 6PM',
      subtext: 'Sat - Sun: 10AM - 4PM'
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

  return (
    <div className="contact-page">
      <section className="contact-header">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Have questions? We're here to help!</p>
        </div>
      </section>

      <div className="container contact-container">
        {/* Contact Information */}
        <section className="contact-info-section">
          <h2 className="section-title">Contact Information</h2>
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card card">
                <div className="contact-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p className="contact-detail">{info.details}</p>
                <p className="contact-subtext">{info.subtext}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="contact-main">
          {/* Contact Form */}
          <section className="contact-form-section">
            <h2 className="section-title">Send us a Message</h2>
            {submitted ? (
              <div className="success-message">
                <CheckCircle size={64} />
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. Our team will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form card">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    minLength="10"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-large">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </section>

          {/* FAQ Section */}
          <section className="faq-section">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item card">
                  <button
                    className="faq-question"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span className={`faq-icon ${expandedFaq === index ? 'expanded' : ''}`}>+</span>
                  </button>
                  {expandedFaq === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
