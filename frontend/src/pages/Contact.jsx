import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.status === 200) {
        setSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(
        err.response?.data?.detail || 
        'Unable to send message. Please try again or call us directly at 0721 480929.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '50vh' }}>
        <div className="hero-content">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-subtitle">
            Get in touch with us for appointments, inquiries, or emergency care
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <div className="service-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div className="service-card">
              <div className="service-icon">
                <Phone size={24} />
              </div>
              <h3 className="service-title">Phone</h3>
              <p className="service-description">
                <a href="tel:+254721480929" style={{ color: 'inherit' }}>
                  0721 480929
                </a>
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <MapPin size={24} />
              </div>
              <h3 className="service-title">Address</h3>
              <p className="service-description">
                Pipeline (kware), Kware stage mpya, Outer Ring Rd, Nairobi
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Clock size={24} />
              </div>
              <h3 className="service-title">Hours</h3>
              <p className="service-description">Open 24 Hours, 7 Days a Week</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="heading-2" style={{ marginBottom: '1rem', textAlign: 'center' }}>
              Send Us a Message
            </h2>
            <p
              className="body-medium"
              style={{ marginBottom: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}
            >
              Fill out the form below and we'll get back to you as soon as possible
            </p>

            {submitted && (
              <div
                style={{
                  background: 'var(--accent-wash)',
                  color: 'var(--accent-text)',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            {error && (
              <div
                style={{
                  background: '#fee',
                  color: '#c33',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontSize: '0.875rem',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="07XX XXX XXX"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section" style={{ background: 'var(--bg-page)' }}>
        <div className="container">
          <h2 className="heading-2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Find Us Here
          </h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7747894347396!2d36.7904!3d-1.3338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMjAnMDEuNyJTIDM2wrA0Nycy!5e0!3m2!1sen!2ske!4v1234567890"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Blessed Medicare Centre Location"
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
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
      </section>
    </div>
  );
};