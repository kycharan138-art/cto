import { useMemo, useState } from 'react'
import {
  Star,
  User,
  MessageSquare,
  Send,
  Award,
  Shield,
  CheckCircle,
  ThumbsUp,
  TrendingUp,
  ShieldCheck
} from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import './Reviews.css'

const SERVICES = [
  'House Cleaning',
  'Plumbing Repair',
  'Electrical Work',
  'Lawn Care',
  'HVAC Service',
  'General Handyman'
]

const INITIAL_REVIEWS = [
  {
    id: 1,
    author: 'Sarah Johnson',
    service: 'House Cleaning',
    rating: 5,
    date: '2024-01-15',
    text: 'Excellent service! The team was professional and thorough. My house has never looked better. Highly recommended!',
    helpful: 24,
    featured: true,
    verified: true
  },
  {
    id: 2,
    author: 'Michael Chen',
    service: 'Plumbing Repair',
    rating: 4,
    date: '2024-01-10',
    text: 'Great service at a fair price. The plumber was knowledgeable and fixed the issue quickly.',
    helpful: 18,
    featured: false,
    verified: true
  },
  {
    id: 3,
    author: 'Emily Rodriguez',
    service: 'Electrical Work',
    rating: 5,
    date: '2024-01-08',
    text: 'Professional and reliable. They completed the work on time and the quality was outstanding.',
    helpful: 32,
    featured: true,
    verified: true
  },
  {
    id: 4,
    author: 'James Wilson',
    service: 'Lawn Care',
    rating: 4,
    date: '2024-01-05',
    text: 'Very satisfied with the landscaping work. The team was friendly and took great care of my yard.',
    helpful: 15,
    featured: false,
    verified: true
  },
  {
    id: 5,
    author: 'Lisa Anderson',
    service: 'HVAC Service',
    rating: 5,
    date: '2024-01-02',
    text: 'Amazing! Fixed my air conditioning in less than an hour. Best service ever!',
    helpful: 45,
    featured: true,
    verified: true
  },
  {
    id: 6,
    author: 'David Kumar',
    service: 'General Handyman',
    rating: 4,
    date: '2023-12-28',
    text: 'Got multiple small repairs done efficiently. Great communication throughout the process.',
    helpful: 22,
    featured: false,
    verified: true
  }
]

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    title: 'Verified Reviews',
    description: '100% authentic concierge client feedback'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'White-glove service with absolute discretion'
  },
  {
    icon: Award,
    title: 'Industry Leader',
    description: 'Award-winning excellence since 2008'
  },
  {
    icon: TrendingUp,
    title: '10K+ Transformations',
    description: 'Trusted by estates across the globe'
  }
]

const RATING_VALUES = [1, 2, 3, 4, 5]

const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

export default function Reviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS)
  const [newReview, setNewReview] = useState({
    author: '',
    service: '',
    rating: 5,
    text: ''
  })
  const [filterRating, setFilterRating] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [helpfulClicks, setHelpfulClicks] = useState({})
  const [formFeedback, setFormFeedback] = useState(null)

  // Reveal hooks for motion
  const [headerRef, headerRevealed] = useReveal({ threshold: 0.2 })
  const [trustRef, trustRevealed] = useReveal({ threshold: 0.15 })
  const [summaryRef, summaryRevealed] = useReveal({ threshold: 0.2 })
  const [featuredRef, featuredRevealed] = useReveal({ threshold: 0.2 })
  const [formRef, formRevealed] = useReveal({ threshold: 0.2 })
  const [listRef, listRevealed] = useReveal({ threshold: 0.2 })

  const totalReviews = reviews.length

  const averageRating = useMemo(() => {
    if (!totalReviews) return 0
    return reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
  }, [reviews, totalReviews])

  const averageRatingDisplay = averageRating.toFixed(1)
  const roundedAverage = Math.round(averageRating)

  const ratingDistribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map(rating => {
      const count = reviews.filter(review => review.rating === rating).length
      const percentage = totalReviews ? Math.round((count / totalReviews) * 100) : 0
      return { rating, count, percentage }
    })
  }, [reviews, totalReviews])

  const verifiedCount = useMemo(
    () => reviews.filter(review => review.verified).length,
    [reviews]
  )

  const featuredReviews = useMemo(() => {
    const highlighted = reviews.filter(review => review.featured)
    highlighted.sort((a, b) => b.helpful - a.helpful)
    return highlighted.slice(0, 3)
  }, [reviews])

  const filteredReviews = useMemo(() => {
    const ratingFiltered = filterRating === 'all'
      ? [...reviews]
      : reviews.filter(review => review.rating === Number(filterRating))

    const sortedReviews = [...ratingFiltered]

    switch (sortBy) {
      case 'helpful':
        sortedReviews.sort((a, b) => b.helpful - a.helpful)
        break
      case 'highest':
        sortedReviews.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest':
        sortedReviews.sort((a, b) => a.rating - b.rating)
        break
      case 'recent':
      default:
        sortedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
    }

    return sortedReviews
  }, [reviews, filterRating, sortBy])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewReview(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value
    }))
  }

  const handleRatingClick = (rating) => {
    setNewReview(prev => ({
      ...prev,
      rating
    }))
  }

  const handleRatingKeyDown = (event, rating) => {
    const currentIndex = RATING_VALUES.indexOf(rating)
    if (currentIndex === -1) return

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault()
      const nextRating = RATING_VALUES[(currentIndex + 1) % RATING_VALUES.length]
      handleRatingClick(nextRating)
      const nextButton = document.getElementById(`rating-option-${nextRating}`)
      nextButton?.focus()
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault()
      const prevIndex = (currentIndex - 1 + RATING_VALUES.length) % RATING_VALUES.length
      const prevRating = RATING_VALUES[prevIndex]
      handleRatingClick(prevRating)
      const prevButton = document.getElementById(`rating-option-${prevRating}`)
      prevButton?.focus()
    }
  }

  const handleSubmitReview = (event) => {
    event.preventDefault()

    if (!newReview.author.trim() || !newReview.service || newReview.text.trim().length < 10) {
      setFormFeedback({
        type: 'error',
        message: 'Please complete all required fields to share your experience.'
      })
      return
    }

    const review = {
      id: Date.now(),
      author: newReview.author.trim(),
      service: newReview.service,
      rating: Number(newReview.rating),
      date: new Date().toISOString().split('T')[0],
      text: newReview.text.trim(),
      helpful: 0,
      featured: false,
      verified: false
    }

    setReviews(prev => [review, ...prev])
    setNewReview({
      author: '',
      service: '',
      rating: 5,
      text: ''
    })
    setFormFeedback({
      type: 'success',
      message: 'Thank you for sharing your experience.'
    })
  }

  const handleHelpfulClick = (reviewId) => {
    if (helpfulClicks[reviewId]) return

    setHelpfulClicks(prev => ({ ...prev, [reviewId]: true }))
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    )
  }

  const handleClearFilters = () => {
    setFilterRating('all')
    setSortBy('recent')
  }

  return (
    <div className="reviews-page">
      <section
        ref={headerRef}
        className={`reviews-hero ${headerRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`}
        aria-labelledby="reviews-heading"
        role="banner"
      >
        <div className="reviews-hero-background" aria-hidden="true">
          <div className="reviews-hero-gradient"></div>
          <div className="reviews-hero-pattern"></div>
          <div className="reviews-hero-orbs">
            <span className="hero-orb orb-1"></span>
            <span className="hero-orb orb-2"></span>
            <span className="hero-orb orb-3"></span>
          </div>
        </div>
        <div className="container">
          <div className="reviews-hero-content">
            <div className="reviews-hero-badge">
              <Star size={16} aria-hidden="true" />
              <span>Concierge Testimonials</span>
            </div>
            <h1 id="reviews-heading">Experiences Worth Celebrating</h1>
            <p>
              Discover how discerning homeowners describe their elevated service journeys.
              Every story is meticulously verified by our concierge team for authenticity.
            </p>
            <div className="reviews-hero-stats">
              <div className="hero-stat-card">
                <span className="stat-value">{averageRatingDisplay}</span>
                <span className="stat-label">Concierge Rating</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-value">98%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Premium Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={trustRef}
        className={`trust-badges-section ${trustRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`}
        aria-label="Trust Indicators"
      >
        <div className="container">
          <div className="trust-badges-grid">
            {TRUST_BADGES.map((badge, index) => {
              const Icon = badge.icon
              return (
                <div
                  key={badge.title}
                  className={`trust-badge lux-card hover-lift ${trustRevealed ? `fade-up delay-${Math.min((index + 1) * 100, 500)}` : ''}`}
                  role="status"
                  aria-label={`${badge.title}: ${badge.description}`}
                >
                  <div className="trust-badge-icon" aria-hidden="true">
                    <Icon size={24} />
                  </div>
                  <div className="trust-badge-content">
                    <h2>{badge.title}</h2>
                    <p>{badge.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="container reviews-layout">
        <aside
          ref={summaryRef}
          className={`rating-summary lux-card gradient-border ${summaryRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`}
          aria-label="Rating Summary"
          role="complementary"
        >
          <div className="summary-top">
            <div className="summary-score" aria-label={`Average rating ${averageRatingDisplay} out of 5`}>
              {averageRatingDisplay}
            </div>
            <div className="summary-stars" aria-hidden="true">
              {RATING_VALUES.map(value => (
                <Star
                  key={value}
                  size={22}
                  fill={value <= roundedAverage ? '#f59e0b' : 'none'}
                  stroke={value <= roundedAverage ? '#f59e0b' : '#94a3b8'}
                />
              ))}
            </div>
            <p className="summary-caption">Based on {totalReviews} curated experiences</p>
          </div>

          <div className="summary-distribution">
            <h3>Rating Breakdown</h3>
            {ratingDistribution.map((entry, index) => (
              <div
                key={entry.rating}
                className={`distribution-row ${summaryRevealed ? `fade-up delay-${Math.min((index + 1) * 100, 500)}` : ''}`}
                role="status"
                aria-label={`${entry.rating} star rating: ${entry.count} reviews (${entry.percentage}%)`}
              >
                <span className="distribution-label">
                  {entry.rating}
                  <Star size={12} aria-hidden="true" fill="#f59e0b" stroke="#f59e0b" />
                </span>
                <div
                  className="distribution-bar"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={entry.percentage}
                >
                  <div
                    className="distribution-bar-fill"
                    style={{ width: `${entry.percentage}%` }}
                  ></div>
                </div>
                <span className="distribution-count">{entry.count}</span>
              </div>
            ))}
          </div>

          <div className="summary-insights">
            <div className="insight-card">
              <CheckCircle size={18} aria-hidden="true" />
              <span>{verifiedCount} Verified</span>
            </div>
            <div className="insight-card">
              <ThumbsUp size={18} aria-hidden="true" />
              <span>98% Recommend</span>
            </div>
          </div>
        </aside>

        <div className="reviews-main">
          {featuredReviews.length > 0 && (
            <section
              ref={featuredRef}
              className={`featured-testimonials ${featuredRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`}
              aria-label="Featured Customer Reviews"
            >
              <div className="section-heading">
                <div className="section-badge">Signature Spotlights</div>
                <h2>Featured Praise from Our Concierge Clients</h2>
              </div>
              <div className="featured-grid">
                {featuredReviews.map((review, index) => (
                  <article
                    key={review.id}
                    className={`featured-card lux-card gradient-border hover-lift ${featuredRevealed ? `fade-up delay-${Math.min((index + 1) * 100, 500)}` : ''}`}
                    aria-label={`Featured review by ${review.author}`}
                  >
                    <div className="featured-card-top">
                      <span className="featured-badge" aria-label="Featured Review">
                        <Star size={14} aria-hidden="true" fill="currentColor" />
                        Featured
                      </span>
                      {review.verified && (
                        <span className="verified-badge" aria-label="Verified experience">
                          <ShieldCheck size={14} aria-hidden="true" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="featured-rating" aria-label={`Rating ${review.rating} out of 5`}>
                      {RATING_VALUES.map(value => (
                        <Star
                          key={value}
                          size={18}
                          fill={value <= review.rating ? '#f59e0b' : 'none'}
                          stroke={value <= review.rating ? '#f59e0b' : '#cbd5f5'}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <blockquote>“{review.text}”</blockquote>
                    <div className="featured-footer">
                      <div className="featured-avatar" aria-hidden="true">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="featured-name">{review.author}</div>
                        <div className="featured-meta">
                          {review.service} • {formatDate(review.date)}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="helpful-btn"
                      onClick={() => handleHelpfulClick(review.id)}
                      disabled={helpfulClicks[review.id]}
                      aria-label={`Mark this review as helpful. Currently ${review.helpful} people found this helpful.`}
                    >
                      <ThumbsUp size={16} aria-hidden="true" />
                      Helpful ({review.helpful})
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section
            ref={formRef}
            className={`write-review lux-card gradient-border ${formRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`}
            aria-label="Share your experience"
          >
            <div className="write-review-header">
              <div className="section-badge">Submit Testimonial</div>
              <h2>Share Your Signature Experience</h2>
              <p>
                We personally review every submission to ensure it reflects genuine luxury service experiences.
              </p>
            </div>

            {formFeedback && (
              <div
                className={`form-feedback ${formFeedback.type}`}
                role="status"
                aria-live="polite"
              >
                {formFeedback.message}
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="author">
                    Your Name <span className="required" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="author"
                    type="text"
                    name="author"
                    placeholder="Alexandra Knight"
                    value={newReview.author}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="service">
                    Service <span className="required" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={newReview.service}
                    onChange={handleInputChange}
                    required
                    aria-required="true"
                  >
                    <option value="">Select a service…</option>
                    {SERVICES.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <span id="rating-label">
                  Rating <span className="required" aria-hidden="true">*</span>
                </span>
                <div
                  className="rating-selector"
                  role="radiogroup"
                  aria-labelledby="rating-label"
                >
                  {RATING_VALUES.map(value => (
                    <button
                      key={value}
                      id={`rating-option-${value}`}
                      type="button"
                      className={`star-btn ${newReview.rating >= value ? 'active' : ''}`}
                      onClick={() => handleRatingClick(value)}
                      onKeyDown={(event) => handleRatingKeyDown(event, value)}
                      role="radio"
                      aria-checked={newReview.rating === value}
                      tabIndex={newReview.rating === value ? 0 : -1}
                      aria-label={`${value} star${value > 1 ? 's' : ''}`}
                    >
                      <Star
                        size={32}
                        fill={newReview.rating >= value ? '#f59e0b' : 'none'}
                        stroke={newReview.rating >= value ? '#f59e0b' : '#cbd5f5'}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
                <span className="rating-value-display" aria-live="polite">
                  Selected rating: {newReview.rating} star{newReview.rating !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="text">
                  Your Review <span className="required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="text"
                  name="text"
                  placeholder="Share the details that stood out during your service experience…"
                  value={newReview.text}
                  onChange={handleInputChange}
                  required
                  minLength={10}
                  aria-required="true"
                  aria-describedby="review-help"
                />
                <small id="review-help" className="form-help">
                  Minimum 10 characters. Highlight the moments that made your experience exceptional.
                </small>
              </div>

              <button type="submit" className="btn btn-primary btn-large btn-glow">
                <Send size={18} aria-hidden="true" />
                Post Review
              </button>
            </form>
          </section>

          <section
            ref={listRef}
            className={`reviews-collection ${listRevealed ? 'reveal-fade-up revealed' : 'reveal-fade-up'}`}
            aria-label="All Customer Reviews"
          >
            <div className="collection-header">
              <div>
                <div className="section-badge">Client Voices</div>
                <h2>All Reviews</h2>
              </div>
              <div className="reviews-controls">
                <div className="filter-group">
                  <label htmlFor="filter-rating" className="sr-only">Filter by rating</label>
                  <select
                    id="filter-rating"
                    value={filterRating}
                    onChange={(event) => setFilterRating(event.target.value)}
                    className="control-select"
                    aria-label="Filter reviews by star rating"
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>

                  <label htmlFor="sort-by" className="sr-only">Sort reviews</label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="control-select"
                    aria-label="Sort reviews by preference"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                  </select>
                </div>
                <span className="review-count" role="status" aria-live="polite">
                  {filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="reviews-grid">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, index) => (
                  <article
                    key={review.id}
                    className={`review-card lux-card hover-lift ${listRevealed ? `fade-up delay-${Math.min((index + 1) * 100, 500)}` : ''}`}
                    aria-label={`Review by ${review.author}`}
                  >
                    <div className="review-card-header">
                      <div className="reviewer">
                        <div className="reviewer-avatar" aria-hidden="true">
                          <User size={22} />
                        </div>
                        <div>
                          <h3>{review.author}</h3>
                          {review.verified && (
                            <span className="verified-inline">
                              <ShieldCheck size={14} aria-hidden="true" />
                              Verified
                            </span>
                          )}
                          <p>{review.service} • {formatDate(review.date)}</p>
                        </div>
                      </div>
                      <div className="review-stars" aria-label={`Rating ${review.rating} out of 5`}>
                        {RATING_VALUES.map(value => (
                          <Star
                            key={value}
                            size={18}
                            fill={value <= review.rating ? '#f59e0b' : 'none'}
                            stroke={value <= review.rating ? '#f59e0b' : '#cbd5f5'}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="review-card-text">{review.text}</p>
                    <div className="review-card-footer">
                      <button
                        type="button"
                        className="helpful-btn"
                        onClick={() => handleHelpfulClick(review.id)}
                        disabled={helpfulClicks[review.id]}
                        aria-label={`Mark this review as helpful. Currently ${review.helpful} people found this helpful.`}
                      >
                        <ThumbsUp size={16} aria-hidden="true" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="no-reviews lux-card" role="status">
                  <MessageSquare size={48} aria-hidden="true" />
                  <p>No reviews match the selected filters yet.</p>
                  <button type="button" className="btn btn-outline" onClick={handleClearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
