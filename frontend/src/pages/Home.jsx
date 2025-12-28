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