import React from 'react';
import { motion } from 'framer-motion';
import './WhyChoose.css';

const features = [
  {
    id: 1,
    image: '/why1.avif',
    title: 'Clean & Sanitised Buses',
    description: 'Ensuring the highest standards of cleanliness and hygiene for a safe and comfortable journey.'
  },
  {
    id: 2,
    image: '/why2.png',
    title: 'Safe & Verified Drivers',
    description: 'Our drivers are rigorously verified and trained to maintain the highest standards of safety and service.'
  },
  {
    id: 3,
    image: '/why3.avif',
    title: 'High Reliability',
    description: 'Delivering consistent, on-time service with meticulously maintained vehicles for a superior travel experience.'
  },
  {
    id: 4,
    image: '/why4.avif',
    title: 'Dedicated Support',
    description: 'Our support team is always available to assist you from booking till journey completion.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const WhyChoose = () => {
  return (
    <section className="wc-section" id="about">
      <div className="wc-container">
        <div className="wc-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="wc-title"
          >
            Why Choose UrbanRide?
          </motion.h2>
        </div>

        <motion.div
          className="wc-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="wc-card"
            >
              {/* Image Container with Hover Zoom */}
              <div className="wc-image-wrapper">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="wc-image"
                />
                <div className="wc-image-overlay"></div>
              </div>

              {/* Floating Label for Title */}
              <div className="wc-title-badge">
                <h3 className="wc-card-title">
                  {feature.title}
                </h3>
              </div>

              {/* Description Content Below */}
              <div className="wc-content">
                <p className="wc-card-desc">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
