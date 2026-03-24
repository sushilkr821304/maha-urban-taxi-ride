import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Discover how Maha Urban Ride is redefining urban travel with safe, affordable, and reliable rides for everyone.</p>
          <Link to="/#hero-section" className="hero-cta-btn">Book a Ride</Link>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="intro-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-content">
              <h2>Who We Are</h2>
              <p>Maha Urban Taxi Ride (UrbanRide) is a premier intercity  service provider dedicated to making travel safe, comfortable, and affordable. With years of experience in the transportation industry, we've built a reputation for excellence and reliability.</p>
              <p>Our platform connects thousands of passengers with verified, professional drivers every day. Whether you're traveling for business or leisure, we ensure a premium experience from booking to destination.</p>
            </div>
            <div className="intro-image">
              <img src="/bus5.png" alt="UrbanRide Taxi Service" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}


      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card">
              <i className="fas fa-bullseye"></i>
              <h3>Our Mission</h3>
              <p>To revolutionize the intercity travel experience by providing a seamless, safe, and transparent booking platform that empowers both passengers and drivers.</p>
            </div>
            <div className="mv-card">
              <i className="fas fa-eye"></i>
              <h3>Our Vision</h3>
              <p>To become the most trusted and widely used intercity taxi platform in India, recognized for our commitment to safety, innovation, and customer satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-about intro-section">
        <div className="container">
          <div className="section-header text-center" style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Why Choose UrbanRide?</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>We go the extra mile to ensure your journey is perfect.</p>
          </div>
          <div className="why-about-grid">
            <div className="why-about-card">
              <i className="fas fa-tag"></i>
              <h4>Affordable Pricing</h4>
              <p>Transparent and competitive rates with no hidden charges. Premium service at local prices.</p>
            </div>
            <div className="why-about-card">
              <i className="fas fa-user-check"></i>
              <h4>Verified Drivers</h4>
              <p>All our drivers undergo rigorous background checks and training to ensure your safety and comfort.</p>
            </div>

            <div className="why-about-card">
              <i className="fas fa-shield-alt"></i>
              <h4>Safe & Secure Rides</h4>
              <p>Real-time tracking and emergency support features integrated into every ride you take.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services-about">
        <div className="container">
          <div className="section-header text-center" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Our Specialized Services</h2>
          </div>
          <div className="service-about-grid">
            <div className="service-about-card">
              <i className="fas fa-city"></i>
              <h4>Intercity Rides</h4>
              <p>Comfortable long-distance travel across major cities with professional AC cabs.</p>
            </div>
            <div className="service-about-card">
              <i className="fas fa-taxi"></i>
              <h4>Local Taxi</h4>
              <p>Reliable point-to-point transportation within the city for your daily commute.</p>
            </div>
            <div className="service-about-card">
              <i className="fas fa-plane-departure"></i>
              <h4>Airport Transfers</h4>
              <p>Punctual pickup and drop-off services for all major airports with luggage assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Ride with Us?</h2>
          <Link to="/#hero-section" className="cta-banner-btn">Book Now</Link>
        </div>
      </section>
    </div>
  );
};

export default About;
