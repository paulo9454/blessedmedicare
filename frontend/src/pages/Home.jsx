import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone, MapPin, Clock, Shield, Heart, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const facilityImages = [
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/91nsv0e5_exterior.jpeg',
      title: 'Blessed Medicare Centre',
      description: 'Our welcoming facility in Pipeline, Nairobi',
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/732s111w_interior.jpeg',
      title: 'Modern Consultation Rooms',
      description: 'Professional medical consultation facilities',
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/8g3utl4z_interior2.jpeg',
      title: 'Comfortable Patient Care',
      description: 'Clean and comfortable patient wards',
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/6v8uz2oa_equipments.jpeg',
      title: 'Advanced Laboratory',
      description: 'State-of-the-art diagnostic equipment',
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/nj5biuau_equipments1.jpeg',
      title: 'Diagnostic Technology',
      description: 'Modern ultrasound and imaging equipment',
    },
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % facilityImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [facilityImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % facilityImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + facilityImages.length) % facilityImages.length);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="info-badge">
            <Clock size={16} />
            Open 24 Hours
          </div>
          <h1 className="hero-title">
            Quality Healthcare You Can Trust
          </h1>
          <p className="hero-subtitle">
            Blessed Medicare Centre provides compassionate, professional medical care
            to families in Nairobi. Your health is our priority.
          </p>
          <div className="hero-cta">
            <Link to="/contact" className="btn-primary">
              <Calendar size={20} />
              Book Appointment
            </Link>
            <Link to="/services" className="btn-secondary">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Facility Slideshow */}
      <section className="section" style={{ background: 'var(--bg-page)', paddingTop: '2rem' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2 section-title">Our Medical Facility</h2>
            <p className="body-large section-description">
              Take a virtual tour of our modern healthcare facility
            </p>
          </div>

          <div
            style={{
              position: 'relative',
              maxWidth: '1000px',
              margin: '0 auto',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Slideshow Images */}
            <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
              {facilityImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: currentSlide === index ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Overlay with text */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                      padding: '2rem',
                      color: 'white',
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: 600,
                        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {image.title}
                    </h3>
                    <p style={{ fontSize: '1rem', opacity: 0.9 }}>{image.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'background 0.2s ease',
                zIndex: 10,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)')}
            >
              <ChevronLeft size={24} color="var(--text-primary)" />
            </button>

            <button
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                transition: 'background 0.2s ease',
                zIndex: 10,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)')}
            >
              <ChevronRight size={24} color="var(--text-primary)" />
            </button>

            {/* Slide Indicators */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 10,
              }}
            >
              {facilityImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: currentSlide === index ? '32px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    border: 'none',
                    background: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/gallery" className="btn-secondary">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2 section-title">Why Choose Blessed Medicare</h2>
            <p className="body-large section-description">
              We combine medical excellence with compassionate care to serve our community
            </p>
          </div>

          <div className="service-grid">
            <div className="service-card">
              <div className="service-icon">
                <Clock size={24} />
              </div>
              <h3 className="service-title">24/7 Availability</h3>
              <p className="service-description">
                Round-the-clock medical services to ensure you receive care whenever you need it.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Shield size={24} />
              </div>
              <h3 className="service-title">Experienced Professionals</h3>
              <p className="service-description">
                Our dedicated team of healthcare professionals is committed to your wellbeing.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Heart size={24} />
              </div>
              <h3 className="service-title">Compassionate Care</h3>
              <p className="service-description">
                Every patient is treated with dignity, respect, and the care they deserve.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Award size={24} />
              </div>
              <h3 className="service-title">5-Star Rated</h3>
              <p className="service-description">
                Trusted by our community with consistent 5-star reviews from satisfied patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services Overview */}
      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2 section-title">Our Medical Services</h2>
            <p className="body-large section-description">
              Comprehensive healthcare services for all your medical needs
            </p>
          </div>

          <div className="service-grid">
            <div className="service-card">
              <h3 className="service-title">General Consultations</h3>
              <p className="service-description">
                Professional medical consultations for all health concerns
              </p>
            </div>

            <div className="service-card">
              <h3 className="service-title">Laboratory Services</h3>
              <p className="service-description">
                Comprehensive diagnostic and testing services
              </p>
            </div>

            <div className="service-card">
              <h3 className="service-title">Pharmacy</h3>
              <p className="service-description">
                Well-stocked pharmacy with quality medications
              </p>
            </div>

            <div className="service-card">
              <h3 className="service-title">Autism Services</h3>
              <p className="service-description">
                Specialized care and support for autism spectrum disorders
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
              Ready to Experience Quality Healthcare?
            </h2>
            <p className="body-large" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Contact us today to schedule your appointment or visit our facility
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">
                <Calendar size={20} />
                Book Appointment
              </Link>
              <a href="tel:+254721480929" className="btn-secondary">
                <Phone size={20} />
                Call Now
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=MVMR+J5+Nairobi"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MapPin size={20} />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};