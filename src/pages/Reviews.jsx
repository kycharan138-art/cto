import { useState } from 'react'
import { Star, User, MessageSquare, Send } from 'lucide-react'
import './Reviews.css'

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      service: 'House Cleaning',
      rating: 5,
      date: '2024-01-15',
      text: 'Excellent service! The team was professional and thorough. My house has never looked better. Highly recommended!',
      helpful: 24
    },
    {
      id: 2,
      author: 'Michael Chen',
      service: 'Plumbing Repair',
      rating: 4,
      date: '2024-01-10',
      text: 'Great service at a fair price. The plumber was knowledgeable and fixed the issue quickly.',
      helpful: 18
    },
    {
      id: 3,
      author: 'Emily Rodriguez',
      service: 'Electrical Work',
      rating: 5,
      date: '2024-01-08',
      text: 'Professional and reliable. They completed the work on time and the quality was outstanding.',
      helpful: 32
    },
    {
      id: 4,
      author: 'James Wilson',
      service: 'Lawn Care',
      rating: 4,
      date: '2024-01-05',
      text: 'Very satisfied with the landscaping work. The team was friendly and took great care of my yard.',
      helpful: 15
    },
    {
      id: 5,
      author: 'Lisa Anderson',
      service: 'HVAC Service',
      rating: 5,
      date: '2024-01-02',
      text: 'Amazing! Fixed my air conditioning in less than an hour. Best service ever!',
      helpful: 45
    },
    {
      id: 6,
      author: 'David Kumar',
      service: 'General Handyman',
      rating: 4,
      date: '2023-12-28',
      text: 'Got multiple small repairs done efficiently. Great communication throughout the process.',
      helpful: 22
    }
  ])

  const [newReview, setNewReview] = useState({
    author: '',
    service: '',
    rating: 5,
    text: ''
  })

  const [filterRating, setFilterRating] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const services = [
    'House Cleaning',
    'Plumbing Repair',
    'Electrical Work',
    'Lawn Care',
    'HVAC Service',
    'General Handyman'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingClick = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating: rating
    }))
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (newReview.author && newReview.service && newReview.text) {
      const review = {
        id: reviews.length + 1,
        ...newReview,
        date: new Date().toISOString().split('T')[0],
        rating: parseInt(newReview.rating),
        helpful: 0
      }
      setReviews([review, ...reviews])
      setNewReview({
        author: '',
        service: '',
        rating: 5,
        text: ''
      })
    } else {
      alert('Please fill in all fields')
    }
  }

  const filterAndSortReviews = () => {
    let filtered = reviews
    if (filterRating !== 'all') {
      filtered = filtered.filter(r => r.rating === parseInt(filterRating))
    }

    if (sortBy === 'recent') {
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sortBy === 'helpful') {
      return filtered.sort((a, b) => b.helpful - a.helpful)
    } else if (sortBy === 'highest') {
      return filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'lowest') {
      return filtered.sort((a, b) => a.rating - b.rating)
    }
    return filtered
  }

  const filteredReviews = filterAndSortReviews()
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  const ratingDistribution = [5, 4, 3, 2, 1].map(r => ({
    rating: r,
    count: reviews.filter(rev => rev.rating === r).length
  }))

  return (
    <div className="reviews-page">
      <section className="reviews-header">
        <div className="container">
          <h1>Customer Reviews</h1>
          <p>See what our satisfied customers have to say</p>
        </div>
      </section>

      <div className="container reviews-container">
        {/* Rating Summary */}
        <section className="rating-summary card">
          <div className="average-rating">
            <div className="rating-number">{averageRating}</div>
            <div className="rating-stars">
              {'⭐'.repeat(Math.round(parseFloat(averageRating)))}
            </div>
            <p className="rating-text">Based on {reviews.length} reviews</p>
          </div>

          <div className="rating-distribution">
            {ratingDistribution.map(dist => (
              <div key={dist.rating} className="rating-row">
                <span className="rating-label">{dist.rating} stars</span>
                <div className="rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{
                      width: `${(dist.count / reviews.length) * 100}%`
                    }}
                  ></div>
                </div>
                <span className="rating-count">{dist.count}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="reviews-content">
          {/* Write Review Section */}
          <section className="write-review card">
            <h2>Share Your Experience</h2>
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="author">Your Name *</label>
                  <input
                    id="author"
                    type="text"
                    name="author"
                    placeholder="John Doe"
                    value={newReview.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service *</label>
                  <select
                    id="service"
                    name="service"
                    value={newReview.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a service...</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Rating *</label>
                <div className="rating-selector">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${newReview.rating >= star ? 'active' : ''}`}
                      onClick={() => handleRatingClick(star)}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="text">Your Review *</label>
                <textarea
                  id="text"
                  name="text"
                  placeholder="Share your experience with this service..."
                  value={newReview.text}
                  onChange={handleInputChange}
                  required
                  minLength="10"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                <Send size={18} />
                Post Review
              </button>
            </form>
          </section>

          {/* Reviews List */}
          <section className="reviews-list-section">
            <div className="reviews-controls">
              <div className="filter-sort">
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(e.target.value)}
                  className="control-select"
                >
                  <option value="all">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="control-select"
                >
                  <option value="recent">Most Recent</option>
                  <option value="helpful">Most Helpful</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>
              <span className="review-count">{filteredReviews.length} reviews</span>
            </div>

            <div className="reviews-list">
              {filteredReviews.length > 0 ? (
                filteredReviews.map(review => (
                  <div key={review.id} className="review-item card">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          <User size={24} />
                        </div>
                        <div>
                          <h3 className="reviewer-name">{review.author}</h3>
                          <p className="review-meta">
                            {review.service} • {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="review-rating">
                        {'⭐'.repeat(review.rating)}
                      </div>
                    </div>

                    <p className="review-text">{review.text}</p>

                    <div className="review-footer">
                      <button className="helpful-btn">
                        <MessageSquare size={16} />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reviews">
                  <p>No reviews found with the selected filters.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
