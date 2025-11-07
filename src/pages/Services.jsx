import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import './Services.css'

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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
      details: 'Deep cleaning service with eco-friendly products'
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
      details: 'Interior and exterior window cleaning'
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
      details: 'Deep carpet cleaning and stain treatment'
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
      details: 'Quick response for all plumbing emergencies'
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
      details: 'Professional installation by licensed plumbers'
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
      details: 'Professional water heater services'
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
      details: 'Licensed electrician with 10+ years experience'
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
      details: 'Quick installation of all types of light fixtures'
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
      details: 'Professional electrical panel services'
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
      details: 'Weekly or bi-weekly lawn maintenance'
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
      details: 'Custom garden design with professional installation'
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
      details: 'Professional tree care and removal'
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
      details: 'Professional handyman for all your small repairs'
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
      details: 'Expert drywall finishing and repairs'
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
      details: 'Fast and efficient assembly services'
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
      details: 'Professional AC repair and maintenance'
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

  return (
    <div className="services-page">
      <section className="services-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Browse and filter our comprehensive list of professional home services</p>
        </div>
      </section>

      <div className="container services-container">
        <aside className="filters-sidebar">
          <div className="filters-header">
            <Filter size={20} />
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
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                  />
                  <span>{range === 'all' ? 'All Prices' : `$${range}`}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            className="btn btn-outline"
            onClick={() => {
              setSelectedCategory('all')
              setSelectedPriceRange('all')
              setSearchTerm('')
            }}
            style={{ width: '100%' }}
          >
            Reset Filters
          </button>
        </aside>

        <div className="services-main">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="services-count">
            Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
          </div>

          <div className="services-list grid-3">
            {filteredServices.length > 0 ? (
              filteredServices.map(service => (
                <div key={service.id} className="service-card card">
                  <div className="service-image">{service.image}</div>
                  <h3>{service.name}</h3>
                  <p className="service-description">{service.description}</p>

                  <div className="service-details">
                    <span className="badge badge-primary">{service.category}</span>
                    <span className="price">${service.price}</span>
                  </div>

                  <div className="service-rating">
                    <span className="stars">{'⭐'.repeat(Math.floor(service.rating))}</span>
                    <span className="rating-value">{service.rating}</span>
                    <span className="reviews-count">({service.reviews})</span>
                  </div>

                  <p className="service-detail-text">{service.details}</p>

                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                    Book Now
                  </button>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No services found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
