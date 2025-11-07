import { Link } from 'react-router-dom'
import { Star, Users, Clock, CheckCircle } from 'lucide-react'
import './Home.css'

export default function Home() {
  const features = [
    {
      icon: <Star size={32} />,
      title: 'Top-Rated Services',
      description: 'All our service providers are carefully vetted and highly rated by customers.'
    },
    {
      icon: <Users size={32} />,
      title: 'Expert Professionals',
      description: 'Work with trained and certified professionals in your area.'
    },
    {
      icon: <Clock size={32} />,
      title: 'Easy Scheduling',
      description: 'Book services at your convenience with flexible scheduling options.'
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Guaranteed Quality',
      description: 'We guarantee satisfaction or your money back.'
    }
  ]

  const popularServices = [
    {
      name: 'House Cleaning',
      description: 'Professional house cleaning service',
      price: '$99',
      rating: 4.8,
      reviews: 256
    },
    {
      name: 'Plumbing Repair',
      description: 'Expert plumbing repair and maintenance',
      price: '$120',
      rating: 4.9,
      reviews: 189
    },
    {
      name: 'Electrical Work',
      description: 'Licensed electrician services',
      price: '$150',
      rating: 4.7,
      reviews: 142
    },
    {
      name: 'Lawn Care',
      description: 'Professional landscaping and lawn maintenance',
      price: '$85',
      rating: 4.6,
      reviews: 203
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Your Trusted Home Service Partner</h1>
            <p className="hero-subtitle">
              Book professional home services in minutes. From cleaning to repairs, we've got you covered.
            </p>
            <div className="hero-buttons">
              <Link to="/booking" className="btn btn-primary btn-large">
                Book a Service
              </Link>
              <Link to="/services" className="btn btn-outline btn-large">
                Browse Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Why Choose HomePro?</h2>
          <p className="section-subtitle">
            We provide reliable, professional home services you can trust
          </p>
          <div className="features-grid grid-4">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="popular-services section">
        <div className="container">
          <h2 className="section-title">Popular Services</h2>
          <p className="section-subtitle">
            Check out our most requested services
          </p>
          <div className="services-grid grid-4">
            {popularServices.map((service, index) => (
              <div key={index} className="service-card card">
                <div className="service-header">
                  <h3>{service.name}</h3>
                  <span className="service-price">{service.price}</span>
                </div>
                <p className="service-description">{service.description}</p>
                <div className="service-rating">
                  <span className="stars">
                    {'⭐'.repeat(Math.floor(service.rating))}
                  </span>
                  <span className="rating-value">{service.rating}</span>
                  <span className="reviews-count">({service.reviews} reviews)</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                  View Details
                </button>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/services" className="btn btn-outline btn-large">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Book your first service today and experience the HomePro difference</p>
            <Link to="/booking" className="btn btn-secondary btn-large">
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
