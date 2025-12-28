import React from 'react';
import { Heart, Target, Eye, Users, Award } from 'lucide-react';

export const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '60vh' }}>
        <div className="hero-content">
          <h1 className="hero-title">About Blessed Medicare Centre</h1>
          <p className="hero-subtitle">
            Dedicated to providing quality, compassionate healthcare to our community since our founding
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="service-grid">
            <div className="service-card">
              <div className="service-icon">
                <Target size={24} />
              </div>
              <h3 className="service-title">Our Mission</h3>
              <p className="service-description">
                To provide accessible, high-quality healthcare services to all members of our
                community with compassion, dignity, and respect. We strive to improve the health
                and wellbeing of every patient we serve.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Eye size={24} />
              </div>
              <h3 className="service-title">Our Vision</h3>
              <p className="service-description">
                To be the most trusted healthcare provider in Nairobi and Mombasa, recognized
                for excellence in patient care, medical innovation, and community health advocacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="heading-2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
              Our Story
            </h2>
            <div className="body-large" style={{ marginBottom: '1.5rem' }}>
              Blessed Medicare Centre was established with a simple yet profound goal: to provide
              quality healthcare that every family deserves. Located in the heart of Pipeline, Nairobi,
              we serve the communities of Nairobi and surrounding areas with dedication and care.
            </div>
            <div className="body-large" style={{ marginBottom: '1.5rem' }}>
              Our facility operates 24 hours a day, 7 days a week, ensuring that medical care is
              always available when you need it most. From routine check-ups to emergency care,
              our team of experienced healthcare professionals is committed to your wellbeing.
            </div>
            <div className="body-large">
              We take pride in our specialized services, including autism care, which reflects our
              commitment to serving all members of our community with the specialized attention
              they deserve.
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="heading-2 section-title">Our Core Values</h2>
            <p className="body-large section-description">
              The principles that guide everything we do
            </p>
          </div>

          <div className="service-grid">
            <div className="service-card">
              <div className="service-icon">
                <Heart size={24} />
              </div>
              <h3 className="service-title">Compassion</h3>
              <p className="service-description">
                We treat every patient with empathy, kindness, and understanding, recognizing
                the dignity of each individual.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Award size={24} />
              </div>
              <h3 className="service-title">Excellence</h3>
              <p className="service-description">
                We maintain the highest standards of medical care and continuously improve
                our services and facilities.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Users size={24} />
              </div>
              <h3 className="service-title">Community</h3>
              <p className="service-description">
                We are committed to serving our community and building lasting relationships
                based on trust and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="service-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="heading-1" style={{ color: 'var(--accent-text)', marginBottom: '0.5rem' }}>
                24/7
              </div>
              <p className="body-medium">Available</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="heading-1" style={{ color: 'var(--accent-text)', marginBottom: '0.5rem' }}>
                5.0
              </div>
              <p className="body-medium">Star Rating</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="heading-1" style={{ color: 'var(--accent-text)', marginBottom: '0.5rem' }}>
                100%
              </div>
              <p className="body-medium">Patient Care</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};