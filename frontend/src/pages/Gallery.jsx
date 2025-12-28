import React, { useState } from 'react';
import { X } from 'lucide-react';

export const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/91nsv0e5_exterior.jpeg',
      title: 'Blessed Medicare Centre - Exterior',
      description: 'Our welcoming facility located in Pipeline, Nairobi',
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/732s111w_interior.jpeg',
      title: 'Consultation Room',
      description: 'Modern consultation room with examination facilities',
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/8g3utl4z_interior2.jpeg',
      title: 'Patient Ward',
      description: 'Clean and comfortable patient care area',
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/6v8uz2oa_equipments.jpeg',
      title: 'Laboratory Equipment',
      description: 'State-of-the-art laboratory with diagnostic equipment',
    },
    {
      url: 'https://customer-assets.emergentagent.com/job_healthcenter-2/artifacts/nj5biuau_equipments1.jpeg',
      title: 'Diagnostic Equipment',
      description: 'Advanced ultrasound and diagnostic technology',
    },
  ];

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

      {/* Gallery Grid */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => setSelectedImage(image)}
              >
                <div
                  style={{
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    background: 'var(--bg-section)',
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
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3
                    className="service-title"
                    style={{ fontSize: '1rem', marginBottom: '0.5rem' }}
                  >
                    {image.title}
                  </h3>
                  <p className="body-small">{image.description}</p>
                </div>
              </div>
            ))}
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