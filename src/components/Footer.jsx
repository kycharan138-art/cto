import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', href: '#facebook' },
  { icon: Twitter, label: 'Twitter', href: '#twitter' },
  { icon: Instagram, label: 'Instagram', href: '#instagram' },
  { icon: Linkedin, label: 'LinkedIn', href: '#linkedin' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-ambient" aria-hidden="true" />

      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-section footer-section--brand">
            <div className="footer-logo">
              <span className="footer-logo-mark" aria-hidden="true">HP</span>
              <div className="footer-logo-text">
                <span className="footer-logo-wordmark">HomePro Atelier</span>
                <p className="footer-logo-description">
                  Curating white-glove home maintenance and bespoke services for discerning residents who value precision and poise.
                </p>
              </div>
            </div>

            <div className="footer-metrics" aria-label="Service highlights">
              <div className="footer-metric">
                <span className="footer-metric-value">10K+</span>
                <span className="footer-metric-label">Homes Transformed</span>
              </div>
              <div className="footer-metric">
                <span className="footer-metric-value">98%</span>
                <span className="footer-metric-label">Client Satisfaction</span>
              </div>
              <div className="footer-metric">
                <span className="footer-metric-value">24/7</span>
                <span className="footer-metric-label">Concierge Support</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="footer-links">
                <li><Link to="/services" aria-label="View our premium services">Services</Link></li>
                <li><Link to="/booking" aria-label="Book your appointment">Book Now</Link></li>
                <li><Link to="/reviews" aria-label="Read customer reviews">Reviews</Link></li>
                <li><Link to="/contact" aria-label="Contact our team">Contact</Link></li>
              </ul>
            </nav>
          </div>

          <div className="footer-section">
            <h3>Signature Services</h3>
            <nav aria-label="Service categories">
              <ul className="footer-links">
                <li><a href="#cleaning" aria-label="Learn about luxury cleaning services">Luxury Cleaning</a></li>
                <li><a href="#plumbing" aria-label="Explore precision plumbing services">Precision Plumbing</a></li>
                <li><a href="#electrical" aria-label="Discover expert electrical services">Expert Electrical</a></li>
                <li><a href="#landscaping" aria-label="View estate landscaping services">Estate Landscaping</a></li>
              </ul>
            </nav>
          </div>

          <div className="footer-section footer-section--contact">
            <h3>Concierge Desk</h3>
            <ul className="contact-info">
              <li>
                <span className="contact-icon" aria-hidden="true">
                  <Phone size={18} />
                </span>
                <span className="contact-text">
                  <a href="tel:+18001234567" aria-label="Call us at +1 (800) 123-4567">+1 (800) 123-4567</a>
                </span>
              </li>
              <li>
                <span className="contact-icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <span className="contact-text">
                  <a href="mailto:info@homepro.com" aria-label="Send email to info@homepro.com">info@homepro.com</a>
                </span>
              </li>
              <li>
                <span className="contact-icon" aria-hidden="true">
                  <MapPin size={18} />
                </span>
                <span className="contact-text">123 Main St, Your City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-copy">
            <p>
              &copy; {currentYear} HomePro Atelier. All rights reserved.
            </p>
            <span className="footer-subtext">Refined solutions for impeccable living.</span>
          </div>

          <div className="footer-social">
            <span className="footer-social-label">Follow our journey</span>
            <nav aria-label="Social media links">
              <div className="social-links">
                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                  <a 
                    key={label} 
                    href={href} 
                    aria-label={`Follow us on ${label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
