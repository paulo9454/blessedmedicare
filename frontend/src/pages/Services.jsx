import React from 'react';
import {
  Stethoscope,
  Activity,
  Pill,
  TestTube,
  Heart,
  Baby,
  Users,
  Shield,
  Syringe,
  Thermometer,
  Eye,
  Microscope,
} from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: <Stethoscope size={24} />,
      title: 'General Medical Consultations',
      description:
        'Comprehensive medical consultations for all health concerns. Our experienced doctors provide thorough examinations, accurate diagnoses, and effective treatment plans.',
    },
    {
      icon: <TestTube size={24} />,
      title: 'Laboratory & Diagnostic Services',
      description:
        'State-of-the-art laboratory facilities offering a wide range of diagnostic tests including blood work, urinalysis, and other essential medical tests for accurate diagnosis.',
    },
    {
      icon: <Pill size={24} />,
      title: 'Pharmacy Services',
      description:
        'Well-stocked pharmacy with quality medications and pharmaceutical products. Our pharmacists provide expert advice on medication use and management.',
    },
    {
      icon: <Users size={24} />,
      title: 'Autism Services',
      description:
        'Specialized care and support for individuals with autism spectrum disorders. We provide comprehensive assessment, therapy, and ongoing care with a compassionate approach.',
    },
    {
      icon: <Activity size={24} />,
      title: 'Preventive Healthcare',
      description:
        'Regular health screenings, vaccinations, and preventive care programs to help you maintain optimal health and catch potential issues early.',
    },
    {
      icon: <Heart size={24} />,
      title: 'Chronic Disease Management',
      description:
        'Ongoing care and management for chronic conditions such as diabetes, hypertension, and other long-term health conditions with personalized treatment plans.',
    },
    {
      icon: <Baby size={24} />,
      title: 'Maternal & Child Health',
      description:
        'Comprehensive healthcare services for mothers and children including prenatal care, pediatric consultations, and child wellness programs.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Emergency Care',
      description:
        'Available 24/7 for medical emergencies. Our trained staff is ready to provide immediate care when you need it most.',
    },
    {
      icon: <Syringe size={24} />,
      title: 'Immunization Services',
      description:
        'Complete immunization services for children and adults. Stay protected with our comprehensive vaccination programs.',
    },
    {
      icon: <Thermometer size={24} />,
      title: 'Minor Procedures',
      description:
        'Safe and professional minor medical procedures performed in our well-equipped facility with proper sterilization and care.',
    },
    {
      icon: <Eye size={24} />,
      title: 'Health Screenings',
      description:
        'Regular health check-ups and screenings to monitor your overall health and detect potential health issues early.',
    },
    {
      icon: <Microscope size={24} />,
      title: 'Specialized Diagnostics',
      description:
        'Advanced diagnostic services with modern equipment to ensure accurate and timely results for better treatment outcomes.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '60vh' }}>
        <div className="hero-content">
          <h1 className="hero-title">Our Medical Services</h1>
          <p className="hero-subtitle">
            Comprehensive healthcare solutions tailored to meet your needs, available 24/7
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="service-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="heading-2" style={{ marginBottom: '1rem' }}>
              Need Medical Assistance?
            </h2>
            <p className="body-large" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Our team is available 24/7 to provide the care you need
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-primary">
                Book Appointment
              </a>
              <a href="tel:+254721480929" className="btn-secondary">
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};