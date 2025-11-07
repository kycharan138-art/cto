import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>About HomePro</h3>
              <p>
                Your trusted partner for all home services. We connect you with qualified professionals for cleaning, repairs, maintenance, and more.
              </p>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/booking">Book Now</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Services</h3>
              <ul>
                <li><a href="#cleaning">Cleaning</a></li>
                <li><a href="#plumbing">Plumbing</a></li>
                <li><a href="#electrical">Electrical</a></li>
                <li><a href="#landscaping">Landscaping</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact Info</h3>
              <ul className="contact-info">
                <li>
                  <Phone size={18} />
                  <span>+1 (800) 123-4567</span>
                </li>
                <li>
                  <Mail size={18} />
                  <span>info@homepro.com</span>
                </li>
                <li>
                  <MapPin size={18} />
                  <span>123 Main St, Your City</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="social-links">
              <a href="#facebook" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#twitter" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#linkedin" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>

            <p className="copyright">
              &copy; {currentYear} HomePro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
