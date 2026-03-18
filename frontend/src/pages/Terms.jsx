import React from 'react';

const Terms = () => {
  const sections = [
    {
      id: 'overview',
      title: '1. Service Overview',
      icon: 'fas fa-info-circle',
      content: 'Urban Ride is a fixed-route, fixed-stop public transport–style cab service offering safe, affordable, and disciplined transportation with private-ride comfort. Services may include daily rides, passes, shared rides, women-only rides, and special commuter services.'
    },
    {
      id: 'acceptance',
      title: '2. Acceptance of Terms',
      icon: 'fas fa-check-circle',
      content: 'By using our website, mobile application, booking service, or traveling in our vehicles, a passenger agrees to comply with and be bound by these Terms & Conditions.'
    },
    {
      id: 'booking',
      title: '3. Booking & Seat Allocation',
      icon: 'fas fa-chair',
      content: 'All trips operate on a fixed pickup and drop system similar to public transport. Seat allotment is subject to availability and predefined capacity limits. <strong>Overloading is strictly prohibited under Zero Overloading Policy.</strong> Seat reservation does not guarantee a specific seat number unless explicitly mentioned.'
    },
    {
      id: 'fare',
      title: '4. Fare, Pass & Payment',
      icon: 'fas fa-wallet',
      content: 'Fares are pre-declared and non-negotiable. Monthly/Daily passes are non-transferable and valid only for a registered user. Any concessions (Women, Senior Citizens, Students, Divyang) require valid ID proof. No refund shall be issued for missed trips due to late arrival at pickup points.'
    },
    {
      id: 'responsibilities',
      title: '5. Passenger Responsibilities',
      icon: 'fas fa-user-shield',
      isBullet: true,
      points: [
        'Arrive on time at designated pickup points',
        'Follow public transport discipline',
        'Avoid misconduct, intoxication, or disturbance',
        'Keep vehicle clean and use waste bin provided',
        'Protect personal belongings (Lost & Found policy applies)',
        'Follow driver instructions for safety'
      ]
    },
    {
      id: 'safety',
      title: '6. Safety & Security Measures',
      icon: 'fas fa-shield-alt',
      isBullet: true,
      points: [
        'Uniformed, ID-verified drivers',
        'Alcohol test before duty & random checks',
        '24×7 control room & SOS connectivity',
        'GPS tracking, geo-fencing alerts & trip history records',
        'Women-only rides & female attendant (request-based)',
        'Emergency response protocols',
        'Regular vehicle maintenance & safety inspections'
      ]
    },
    {
      id: 'lostfound',
      title: '7. Lost & Found Policy',
      icon: 'fas fa-search-location',
      content: 'Items found in the vehicle will be logged and stored for a limited period. Urban Ride is not responsible for valuables left unattended. Claims must be raised within a defined time window.'
    },
    {
      id: 'breakdown',
      title: '8. Vehicle Breakdown & Delays',
      icon: 'fas fa-tools',
      content: 'In case of breakdown, a backup vehicle will be arranged, subject to availability. Delays due to traffic, weather, law enforcement, or emergencies shall not be grounds for refund.'
    },
    {
      id: 'modifications',
      title: '9. Service Modifications',
      icon: 'fas fa-edit',
      content: 'Urban Ride reserves the right to: Modify routes, timings, fares, or services. Suspend or cancel trips due to operational or safety reasons. Update Terms & Conditions without prior notice.'
    },
    {
      id: 'prohibited',
      title: '10. Prohibited Activities',
      icon: 'fas fa-ban',
      isBullet: true,
      points: [
        'Carry illegal, hazardous, or offensive materials',
        'Damage vehicle property',
        'Force unscheduled stops or route changes'
      ]
    },
    {
      id: 'liability',
      title: '11. Limitation of Liability',
      icon: 'fas fa-exclamation-triangle',
      content: 'Urban Ride shall not be liable for: Traffic delays, missed connections, or indirect losses. Personal injuries caused by passenger negligence. Loss of personal items beyond Lost & Found policy limits.'
    },
    {
      id: 'termination',
      title: '12. Termination of Service',
      icon: 'fas fa-user-times',
      content: 'Urban Ride reserves the right to deny service to any passenger violating rules, safety norms, or discipline policies, without refund.'
    },
    {
      id: 'law',
      title: '13. Governing Law & Jurisdiction',
      icon: 'fas fa-gavel',
      content: 'These Terms shall be governed by the laws of India. All disputes shall be subject to the exclusive jurisdiction of courts in <strong>Pune</strong>.'
    }
  ];

  return (
    <div className="legal-page">
      {/* Hero Section */}
      <section className="legal-hero">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p>Please read these terms carefully before using our services. Your safety and discipline are our top priorities.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="legal-content-section">
        <div className="container legal-container">
          {/* Sidebar Navigation */}
          <aside className="legal-sidebar">
            <nav className="legal-nav">
              <h3>Contents</h3>
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
            {sections.map((section, index) => (
              <div key={section.id} id={section.id} className="legal-section">
                <h2>
                  <i className={section.icon}></i>
                  {section.title}
                </h2>
                {section.isBullet ? (
                  <ul>
                    {section.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: section.content }} />
                )}
                {index < sections.length - 1 && <div className="legal-divider"></div>}
              </div>
            ))}

            {/* Contact Highlight Box */}
            <div className="legal-contact-box">
              <h3>14. Contact & Support</h3>
              <p>For any queries or assistance regarding these terms, please contact our helpline.</p>
              <div className="contact-info-grid">
                <div className="contact-info-group">
                  <i className="fas fa-phone-alt"></i>
                  <span>08411887118</span>
                </div>
                <div className="contact-info-group">
                  <i className="fas fa-globe"></i>
                  <a href="https://urbanride.ltd" target="_blank" rel="noopener noreferrer">www.urbanride.ltd</a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Terms;
