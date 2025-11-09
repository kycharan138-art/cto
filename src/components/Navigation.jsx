import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import './Navigation.css'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo hover-scale" onClick={closeMenu}>
          <span className="logo-icon">🏠</span>
          <span className="logo-text">HomePro</span>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu} className="hover-scale">Home</Link>
          </li>
          <li>
            <Link to="/services" onClick={closeMenu} className="hover-scale">Services</Link>
          </li>
          <li>
            <Link to="/booking" onClick={closeMenu} className="hover-scale">Booking</Link>
          </li>
          <li>
            <Link to="/reviews" onClick={closeMenu} className="hover-scale">Reviews</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu} className="hover-scale">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
