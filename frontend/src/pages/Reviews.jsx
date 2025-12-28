import React from 'react';
import { Star, User } from 'lucide-react';

export const Reviews = () => {
  const reviews = [
    {
      author: 'Caleb Chauro',
      rating: 5,
      date: '5 years ago',
      text: 'The facility is easy to access and the services are the best. Personally, the experience is always super when we visit. My daughter gets the best treatment ever that i trust. May God bless the cheerful and caring hands of this facility.',
    },
    {
      author: 'Lawrence Mbogo',
      rating: 5,
      date: '5 years ago',
      text: 'This is the best medicare in matters health that I have been to I always recommend it to all. Keep up the good work and be blessed.',
    },
    {
      author: 'Titus Ngwono',
      rating: 5,
      date: '4 years ago',
      text: 'The best facility in the locality which helps patients.',
    },
    {
      author: 'Paul Mose',
      rating: 5,
      date: '5 years ago',
      text: 'Excellent service and professional care. Highly recommended for anyone seeking quality healthcare.',
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="testimonial-rating">
        {[...Array(5)].map((_, index) => (
          <Star key={index} size={16} fill="#FFA500" strokeWidth={0} />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '60vh' }}>
        <div className="hero-content">
          <div className="info-badge" style={{ justifyContent: 'center' }}>
            <Star size={16} fill="currentColor" />
            5.0 Rating
          </div>
          <h1 className="hero-title">Patient Reviews</h1>
          <p className="hero-subtitle">
            Read what our patients have to say about their experience at Blessed Medicare Centre
          </p>
        </div>
      </section>

      {/* Overall Rating */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div
            style={{
              maxWidth: '400px',
              margin: '0 auto',
              textAlign: 'center',
              padding: '2rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '12px',
            }}
          >
            <div className="heading-1" style={{ color: 'var(--accent-text)', marginBottom: '0.5rem' }}>
              5.0
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
              {[...Array(5)].map((_, index) => (
                <Star key={index} size={24} fill="#FFA500" strokeWidth={0} />
              ))}
            </div>
            <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              Based on 6 reviews
            </p>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <h2 className="heading-2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            What Our Patients Say
          </h2>
          <div className="testimonial-grid">
            {reviews.map((review, index) => (
              <div key={index} className="testimonial-card">
                <StarRating rating={review.rating} />
                <p className="testimonial-text">{review.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'var(--accent-wash)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-text)',
                    }}
                  >
                    <User size={16} />
                  </div>
                  <div>
                    <div className="testimonial-author">{review.author}</div>
                    <div className="body-small" style={{ color: 'var(--text-muted)' }}>
                      {review.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
              Experience Quality Care Yourself
            </h2>
            <p className="body-large" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Join our satisfied patients and experience the difference
            </p>
            <a href="/contact" className="btn-primary">
              Book Your Appointment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};