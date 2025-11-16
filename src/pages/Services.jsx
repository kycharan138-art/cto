import { useState } from 'react'
import { Search, Filter, Crown, CheckCircle, Star, Clock, Shield, X } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import './Services.css'

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [headerRef, headerInView] = useReveal({ threshold: 0.1 })

  const categories = ['all', 'Cleaning', 'Plumbing', 'Electrical', 'Landscaping', 'Handyman', 'HVAC']

  const allServices = [
    {
      id: 1,
      name: 'House Cleaning',
      category: 'Cleaning',
      description: 'Thorough house cleaning including bathrooms, kitchen, and bedrooms',
      price: 99,
      priceRange: '50-100',
      rating: 4.8,
      reviews: 256,
      image: '🧹',
      details: 'Deep cleaning service with eco-friendly products',
      tier: 'premium',
      benefits: ['Eco-friendly products', 'Detailed deep clean', 'Kitchen & bathrooms', 'Satisfaction guaranteed']
    },
    {
      id: 2,
      name: 'Window Cleaning',
      category: 'Cleaning',
      description: 'Professional window and glass cleaning service',
      price: 45,
      priceRange: '25-75',
      rating: 4.7,
      reviews: 143,
      image: '🪟',
      details: 'Interior and exterior window cleaning',
      tier: 'standard',
      benefits: ['Interior & exterior', 'Streak-free finish', 'All window types', 'Quick service']
    },
    {
      id: 3,
      name: 'Carpet Cleaning',
      category: 'Cleaning',
      description: 'Professional carpet stain removal and cleaning',
      price: 150,
      priceRange: '100-200',
      rating: 4.9,
      reviews: 198,
      image: '🟫',
      details: 'Deep carpet cleaning and stain treatment',
      tier: 'premium',
      benefits: ['Deep steam cleaning', 'Stain removal', 'Pet odor treatment', 'Fast drying']
    },
    {
      id: 4,
      name: 'Pipe Repair',
      category: 'Plumbing',
      description: 'Emergency pipe repair and leak detection',
      price: 120,
      priceRange: '100-200',
      rating: 4.9,
      reviews: 189,
      image: '🔧',
      details: 'Quick response for all plumbing emergencies',
      tier: 'premium',
      benefits: ['24/7 emergency', 'Licensed plumbers', 'Leak detection', 'Quality parts']
    },
    {
      id: 5,
      name: 'Toilet Installation',
      category: 'Plumbing',
      description: 'New toilet installation and repairs',
      price: 150,
      priceRange: '100-200',
      rating: 4.6,
      reviews: 76,
      image: '🚽',
      details: 'Professional installation by licensed plumbers',
      tier: 'standard',
      benefits: ['Expert installation', 'Disposal included', 'Water efficiency', 'Warranty coverage']
    },
    {
      id: 6,
      name: 'Water Heater Service',
      category: 'Plumbing',
      description: 'Water heater installation and maintenance',
      price: 200,
      priceRange: '150-250',
      rating: 4.7,
      reviews: 104,
      image: '🔥',
      details: 'Professional water heater services',
      tier: 'premium',
      benefits: ['Installation & repair', 'Energy efficient', 'Safety inspection', 'Extended warranty']
    },
    {
      id: 7,
      name: 'Electrical Wiring',
      category: 'Electrical',
      description: 'Home electrical wiring and installation',
      price: 150,
      priceRange: '100-200',
      rating: 4.7,
      reviews: 142,
      image: '⚡',
      details: 'Licensed electrician with 10+ years experience',
      tier: 'premium',
      benefits: ['Licensed & insured', 'Code compliant', 'Safety certified', '10+ years experience']
    },
    {
      id: 8,
      name: 'Light Installation',
      category: 'Electrical',
      description: 'Ceiling fans and lighting fixtures installation',
      price: 85,
      priceRange: '50-150',
      rating: 4.8,
      reviews: 167,
      image: '💡',
      details: 'Quick installation of all types of light fixtures',
      tier: 'standard',
      benefits: ['All fixture types', 'Same-day service', 'LED options', 'Cleanup included']
    },
    {
      id: 9,
      name: 'Circuit Breaker Service',
      category: 'Electrical',
      description: 'Circuit breaker repair and replacement',
      price: 180,
      priceRange: '150-250',
      rating: 4.6,
      reviews: 89,
      image: '🔌',
      details: 'Professional electrical panel services',
      tier: 'premium',
      benefits: ['Panel upgrades', 'Safety inspection', 'Code updates', 'Emergency service']
    },
    {
      id: 10,
      name: 'Lawn Mowing',
      category: 'Landscaping',
      description: 'Regular lawn mowing and grass cutting',
      price: 65,
      priceRange: '50-100',
      rating: 4.6,
      reviews: 203,
      image: '🌱',
      details: 'Weekly or bi-weekly lawn maintenance',
      tier: 'standard',
      benefits: ['Weekly maintenance', 'Edge trimming', 'Debris removal', 'Flexible scheduling']
    },
    {
      id: 11,
      name: 'Garden Design',
      category: 'Landscaping',
      description: 'Professional garden design and landscaping',
      price: 300,
      priceRange: '200-500',
      rating: 4.9,
      reviews: 87,
      image: '🌻',
      details: 'Custom garden design with professional installation',
      tier: 'premium',
      benefits: ['Custom design', 'Plant selection', 'Full installation', '90-day guarantee']
    },
    {
      id: 12,
      name: 'Tree Trimming',
      category: 'Landscaping',
      description: 'Tree trimming and removal services',
      price: 200,
      priceRange: '150-350',
      rating: 4.7,
      reviews: 115,
      image: '🌳',
      details: 'Professional tree care and removal',
      tier: 'premium',
      benefits: ['Certified arborist', 'Safe removal', 'Stump grinding', 'Full cleanup']
    },
    {
      id: 13,
      name: 'General Handyman',
      category: 'Handyman',
      description: 'General home repairs and maintenance',
      price: 75,
      priceRange: '50-100',
      rating: 4.8,
      reviews: 276,
      image: '🔨',
      details: 'Professional handyman for all your small repairs',
      tier: 'standard',
      benefits: ['Multi-skilled', 'Small repairs', 'Quick response', 'Fair pricing']
    },
    {
      id: 14,
      name: 'Drywall Repair',
      category: 'Handyman',
      description: 'Drywall installation and repair',
      price: 110,
      priceRange: '100-150',
      rating: 4.7,
      reviews: 134,
      image: '🧱',
      details: 'Expert drywall finishing and repairs',
      tier: 'standard',
      benefits: ['Patch & repair', 'Texture matching', 'Paint-ready finish', 'Clean work area']
    },
    {
      id: 15,
      name: 'Furniture Assembly',
      category: 'Handyman',
      description: 'Furniture and appliance assembly service',
      price: 55,
      priceRange: '50-100',
      rating: 4.9,
      reviews: 198,
      image: '📦',
      details: 'Fast and efficient assembly services',
      tier: 'standard',
      benefits: ['All brands', 'Tool provided', 'Fast service', 'Packaging removal']
    },
    {
      id: 16,
      name: 'AC Maintenance',
      category: 'HVAC',
      description: 'Air conditioning maintenance and repair',
      price: 125,
      priceRange: '100-200',
      rating: 4.8,
      reviews: 167,
      image: '❄️',
      details: 'Professional AC repair and maintenance',
      tier: 'premium',
      benefits: ['Full inspection', 'Filter replacement', 'Efficiency check', 'Seasonal tune-up']
    }
  ]

  const filterServices = () => {
    return allServices.filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = selectedPriceRange === 'all' || service.priceRange === selectedPriceRange

      return matchesCategory && matchesSearch && matchesPrice
    })
  }

  const filteredServices = filterServices()

  const priceRanges = ['all', '25-75', '50-100', '100-200', '150-250', '200-500']

  const hasActiveFilters = selectedCategory !== 'all' || selectedPriceRange !== 'all' || searchTerm !== ''

  return (
    <div className="services-page">
      <section 
        ref={headerRef}
        className={`services-header ${headerInView ? 'revealed' : ''}`}
        role="banner"
      >
        <div className="services-header-background">
          <div className="services-gradient-overlay"></div>
          <div className="services-grid-pattern"></div>
        </div>
        <div className="container services-header-content">
          <div className="services-badge">
            <Crown size={16} aria-hidden="true" />
            <span>Premium Home Services</span>
          </div>
          <h1>Our Services</h1>
          <p>Discover our comprehensive collection of professional home services, expertly crafted to transform your living space.</p>
        </div>
      </section>

      <div className="container services-container">
        <aside className="filters-sidebar lux-card">
          <div className="filters-header">
            <div className="filter-icon-wrapper">
              <Filter size={20} aria-hidden="true" />
            </div>
            <h3>Filters</h3>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <div className="category-list">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                >
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  {selectedCategory === cat && (
                    <CheckCircle size={16} aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-list">
              {priceRanges.map(range => (
                <label key={range} className="price-checkbox">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range}
                    checked={selectedPriceRange === range}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    aria-label={range === 'all' ? 'All Prices' : `Price range $${range}`}
                  />
                  <span>{range === 'all' ? 'All Prices' : `$${range}`}</span>
                </label>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              className="btn btn-reset"
              onClick={() => {
                setSelectedCategory('all')
                setSelectedPriceRange('all')
                setSearchTerm('')
              }}
              aria-label="Reset all filters"
            >
              <X size={16} aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          )}
        </aside>

        <div className="services-main">
          <div className="search-box lux-card">
            <Search size={20} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search services"
            />
          </div>

          <div className="services-count">
            <span className="count-badge">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </span>
            {hasActiveFilters && (
              <span className="filter-active-indicator">
                <Filter size={14} aria-hidden="true" />
                Filters active
              </span>
            )}
          </div>

          <div className="services-list" role="list">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))
            ) : (
              <div className="no-results lux-card">
                <div className="no-results-icon">🔍</div>
                <h3>No services found</h3>
                <p>Try adjusting your filters or search terms to find what you're looking for.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedPriceRange('all')
                    setSearchTerm('')
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ service, index }) {
  const [cardRef, cardInView] = useReveal({ threshold: 0.1 })
  const delay = (index % 6) * 100

  return (
    <article
      ref={cardRef}
      className={`service-card lux-card ${cardInView ? 'revealed' : ''}`}
      style={{ animationDelay: `${delay}ms` }}
      role="listitem"
    >
      {service.tier === 'premium' && (
        <div className="service-tier-badge" aria-label="Premium service">
          <Crown size={14} aria-hidden="true" />
          <span>Premium</span>
        </div>
      )}
      
      <div className="service-icon-wrapper">
        <div className="service-image">{service.image}</div>
      </div>
      
      <div className="service-content">
        <h3>{service.name}</h3>
        <p className="service-description">{service.description}</p>

        <div className="service-benefits">
          <h4>What's included:</h4>
          <ul>
            {service.benefits.map((benefit, idx) => (
              <li key={idx}>
                <CheckCircle size={14} aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="service-meta">
          <div className="service-rating">
            <Star size={16} className="star-icon" aria-hidden="true" />
            <span className="rating-value">{service.rating}</span>
            <span className="reviews-count" aria-label={`${service.reviews} reviews`}>
              ({service.reviews})
            </span>
          </div>
          <span className="badge badge-category">{service.category}</span>
        </div>

        <div className="service-footer">
          <div className="service-price">
            <span className="price-label">Starting at</span>
            <span className="price-value">${service.price}</span>
          </div>
          <button className="btn btn-primary btn-book" aria-label={`Book ${service.name}`}>
            <Clock size={16} aria-hidden="true" />
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </article>
  )
}
