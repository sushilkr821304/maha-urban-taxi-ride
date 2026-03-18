import React from 'react';

const RefundPolicy = () => {
  const sections = [
    {
      id: 'general',
      title: '1. General Policy',
      icon: 'fas fa-info-circle',
      content: 'Urban Ride operates on a fixed-route, fixed-pickup/drop, public transport–style system. All tickets, passes, and bookings are subject to the terms mentioned below.'
    },
    {
      id: 'cancellation',
      title: '2. Ticket Cancellation',
      icon: 'fas fa-calendar-times',
      isNested: true,
      subsections: [
        {
          subtitle: 'a) Passenger-Initiated Cancellation',
          content: 'Ticket cancellation is allowed only before the scheduled trip start time, subject to the cancellation window. Once the trip has started or the vehicle has departed from the pickup point, cancellation will not be permitted. Failure to arrive at the pickup point on time will be treated as a No-Show, and no refund shall be issued.'
        },
        {
          subtitle: 'b) Pass Holders',
          content: 'Daily or Monthly Passes are non-refundable and non-transferable. Missed trips due to personal reasons, late arrival, or absence are not eligible for refund or adjustment.'
        }
      ]
    },
    {
      id: 'eligibility',
      title: '3. Refund Eligibility',
      icon: 'fas fa-check-circle',
      type: 'success',
      content: 'Refunds may be applicable only in the following cases:',
      isBullet: true,
      points: [
        'Trip cancellation by Urban Ride due to operational reasons',
        'Non-availability of vehicle without providing a backup arrangement',
        'Service cancellation caused by technical failure, subject to verification'
      ],
      footerText: 'In such cases, the refund may be credited back to the original payment method, or adjusted against a future trip or pass, at the company\'s discretion.'
    },
    {
      id: 'non-refundable',
      title: '4. Non-Refundable Situations',
      icon: 'fas fa-exclamation-circle',
      type: 'warning',
      content: 'No refund shall be issued in the following circumstances:',
      isBullet: true,
      points: [
        'Passenger arrives late at the pickup point',
        'Passenger voluntarily cancels after trip start time',
        'No-show at the pickup location',
        'Traffic delays, route diversions, weather conditions, or law enforcement restrictions',
        'Passenger denied boarding due to violation of safety, discipline, or conduct rules'
      ]
    },
    {
      id: 'timeline',
      title: '5. Refund Processing Timeline',
      icon: 'fas fa-history',
      isBullet: true,
      points: [
        'Approved refunds will be processed within 7–10 working days',
        'Refund timelines may vary depending on the payment method or banking partner'
      ]
    },
    {
      id: 'concession',
      title: '6. Special Concession Tickets',
      icon: 'fas fa-percentage',
      content: 'Tickets booked under Women, Senior Citizen, Student, Divyang, or Promotional Offers are non-refundable, unless the trip is cancelled by Urban Ride.'
    },
    {
      id: 'modifications',
      title: '7. Service Modifications',
      icon: 'fas fa-tools',
      content: 'Urban Ride reserves the right to:',
      isBullet: true,
      points: [
        'Modify, suspend, or cancel trips due to safety, operational, or regulatory reasons',
        'Change refund eligibility rules with prior notice on the website or app'
      ]
    },
    {
      id: 'dispute',
      title: '8. Dispute Resolution',
      icon: 'fas fa-handshake',
      content: 'Any dispute regarding cancellation or refund shall be resolved based on System records, Trip logs, and Control Room verification. The decision of Urban Ride shall be considered final and binding.'
    },
    {
      id: 'law',
      title: '9. Governing Law',
      icon: 'fas fa-gavel',
      content: 'This policy shall be governed by and interpreted in accordance with the laws of India, and disputes shall be subject to the exclusive jurisdiction of courts in <strong>Pune</strong>.'
    }
  ];

  return (
    <div className="legal-page">
      {/* Hero Section */}
      <section className="legal-hero" style={{ background: 'linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.8)), url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop")' }}>
        <div className="container">
          <h1>Cancellation & Refund Policy</h1>
          <p>Understand our cancellation rules and refund eligibility to ensure a smooth travel experience.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="legal-content-section">
        <div className="container legal-container">
          {/* Sidebar Navigation */}
          <aside className="legal-sidebar">
            <nav className="legal-nav">
              <h3>Policy Guide</h3>
              <ul>
                {sections.map(section => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title.split('. ')[1]}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Text Content */}
          <main className="legal-main-content">
            <p style={{ marginBottom: '40px', fontSize: '1.1rem', color: '#64748b' }}>
              Maha Urban Taxi Ride Private Limited. This Cancellation & Refund Policy outlines the rules and conditions under which passengers may cancel tickets and request refunds for cab services provided by Urban Ride.
            </p>

            {sections.map((section, index) => (
              <div 
                key={section.id} 
                id={section.id} 
                className={`legal-section ${section.type === 'success' ? 'success-highlight' : ''} ${section.type === 'warning' ? 'warning-highlight' : ''}`}
              >
                <h2>
                  <i className={section.icon}></i>
                  {section.title}
                </h2>
                
                {section.content && <p dangerouslySetInnerHTML={{ __html: section.content }} />}

                {section.isNested && section.subsections.map((sub, sIndex) => (
                  <div key={sIndex} className="legal-subsection" style={{ marginBottom: '25px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontWeight: 700 }}>{sub.subtitle}</h4>
                    <p>{sub.content}</p>
                  </div>
                ))}

                {section.isBullet && (
                  <ul>
                    {section.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}

                {section.footerText && <p style={{ marginTop: '15px', fontWeight: 500 }}>{section.footerText}</p>}
                
                {!section.type && index < sections.length - 1 && <div className="legal-divider"></div>}
              </div>
            ))}

            {/* Contact Highlight Box */}
            <div className="legal-contact-box" id="contact-info">
              <h3>10. Contact Support</h3>
              <p>For any urgent cancellation or refund queries, reach out to our 24/7 helpdesk:</p>
              <div className="contact-info-grid">
                <div className="contact-info-group">
                  <i className="fas fa-phone-alt"></i>
                  <span>84118 - 87118</span>
                </div>
                <div className="contact-info-group">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:support@urbanride.ltd">support@urbanride.ltd</a>
                </div>
                <div className="contact-info-group">
                  <i className="fas fa-globe"></i>
                  <a href="https://www.urbanride.ltd" target="_blank" rel="noopener noreferrer">www.urbanride.ltd</a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
