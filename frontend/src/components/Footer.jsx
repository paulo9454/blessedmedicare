import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Blessed Medicare Centre</h3>
            <p>
              Quality healthcare you can trust. Serving Nairobi with
              compassionate medical services 24/7.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <Link to="/about">About Us</Link>
            <Link to="/services">Our Services</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/reviews">Patient Reviews</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="footer-section">
            <h3>Contact Information</h3>
            <p style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <MapPin size={16} style={{ marginTop: '4px', flexShrink: 0 }} />
              Pipeline (kware), Kware stage mpya, Outer Ring Rd, Nairobi
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} />
              0721 480929
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} />
              Open 24 Hours
            </p>
          </div>

          <div className="footer-section">
            <h3>Service Area</h3>
            <p>Nairobi</p>
            <p>Surrounding Areas</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Blessed Medicare Centre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};