import React from 'react';
import { Image } from 'lucide-react';

export const Gallery = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <h1 className="hero-title">Our Facility</h1>
          <p className="hero-subtitle">
            Take a look at our modern medical facility and caring environment
          </p>
        </div>
      </section>

      {/* Gallery Placeholder */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                style={{
                  background: 'var(--bg-section)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  aspectRatio: '16/9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '2rem',
                }}
              >
                <Image size={48} color="var(--text-muted)" />
                <p className="body-small" style={{ textAlign: 'center' }}>
                  Facility Photo {item}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'var(--accent-wash)',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <h3 className="heading-3" style={{ marginBottom: '0.5rem' }}>
              Photo Gallery Coming Soon
            </h3>
            <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              We're currently updating our gallery with photos of our facility, staff, and services.
              Check back soon!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <h2 className="heading-2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            What You'll Find at Our Facility
          </h2>
          <div className="service-grid">
            <div className="service-card">
              <h3 className="service-title">Modern Equipment</h3>
              <p className="service-description">
                State-of-the-art medical equipment for accurate diagnosis and effective treatment
              </p>
            </div>
            <div className="service-card">
              <h3 className="service-title">Clean Environment</h3>
              <p className="service-description">
                Well-maintained, sanitized facilities ensuring patient safety and comfort
              </p>
            </div>
            <div className="service-card">
              <h3 className="service-title">Comfortable Waiting Area</h3>
              <p className="service-description">
                Spacious and comfortable waiting areas for patients and their families
              </p>
            </div>
            <div className="service-card">
              <h3 className="service-title">Professional Staff</h3>
              <p className="service-description">
                Friendly and experienced healthcare professionals dedicated to your care
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};