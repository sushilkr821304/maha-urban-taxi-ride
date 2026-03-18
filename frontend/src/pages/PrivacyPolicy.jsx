import React from 'react';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: 'fas fa-shield-alt',
      content: 'Urban Ride / Maha Smart Cab ("Urban Ride", "we", "our", "us") respects the privacy of its users and is committed to protecting their personal information. This Privacy Policy explains how information is collected, used, stored, and protected when you use our website, mobile application, or transportation services.'
    },
    {
      id: 'collection',
      title: '1. Information We Collect',
      icon: 'fas fa-clipboard-list',
      isNested: true,
      subsections: [
        {
          subtitle: 'a) Personal Information',
          points: [
            'Full name',
            'Mobile number',
            'Email address',
            'Identity proof details (Student ID, Senior Citizen ID, Government ID – for concessions or verification)'
          ]
        },
        {
          subtitle: 'b) Trip & Service Information',
          points: [
            'Trip history and ride details',
            'Pickup and drop locations',
            'Seat allocation and pass details (Daily / Monthly Pass)',
            'Service usage records'
          ]
        },
        {
          subtitle: 'c) Location & Technical Information',
          points: [
            'GPS location during active trips (for safety and monitoring)',
            'Geo-fencing alerts',
            'App or website usage data'
          ]
        }
      ]
    },
    {
      id: 'purpose',
      title: '2. Purpose of Data Collection',
      icon: 'fas fa-bullseye',
      isBullet: true,
      points: [
        'To provide safe, disciplined, and reliable transport services',
        'To manage bookings, seat allotment, and passes',
        'To ensure passenger safety through 24×7 control room, SOS, and tracking systems',
        'To handle customer support, complaints, and lost & found cases',
        'To comply with legal, regulatory, and government requirements'
      ]
    },
    {
      id: 'sharing',
      title: '3. Data Sharing & Disclosure',
      icon: 'fas fa-share-alt',
      content: 'Urban Ride does not sell or rent personal data to third parties. Information may be shared only in the following cases:',
      isBullet: true,
      points: [
        'With government or law-enforcement authorities when required by law',
        'In emergency situations to ensure passenger safety',
        'With authorized internal staff and control room personnel for operational purposes'
      ]
    },
    {
      id: 'security',
      title: '4. Data Security',
      icon: 'fas fa-lock',
      content: 'We implement appropriate technical, administrative, and organizational security measures to protect user data, including:',
      isBullet: true,
      points: [
        'Restricted access to personal information',
        'Secure servers and controlled data access',
        'Internal data handling policies'
      ],
      footerText: 'However, no system is completely secure, and Urban Ride cannot guarantee absolute security of data transmitted over the internet.'
    },
    {
      id: 'tracking',
      title: '5. Location Tracking & Surveillance',
      icon: 'fas fa-map-marked-alt',
      content: 'For safety and transparency purposes, Urban Ride may use:',
      isBullet: true,
      points: [
        'GPS tracking during trips',
        'Trip history recording',
        'Geo-fencing alerts'
      ],
      footerText: 'These measures are strictly for passenger safety, service monitoring, and compliance, not for personal surveillance.'
    },
    {
      id: 'cookies',
      title: '6. Cookies & Website Usage',
      icon: 'fas fa-cookie-bite',
      content: 'Our website may use basic cookies to improve user experience. We do not use intrusive or unnecessary tracking cookies. Users can manage cookie preferences through their browser settings.'
    },
    {
      id: 'rights',
      title: '7. User Rights',
      icon: 'fas fa-user-check',
      content: 'Users have the right to:',
      isBullet: true,
      points: [
        'Access their personal information',
        'Request correction of inaccurate data',
        'Request deletion of data upon service termination, subject to legal and regulatory requirements'
      ],
      footerText: 'Requests can be made through our official support channels.'
    },
    {
      id: 'children',
      title: '8. Children’s Privacy',
      icon: 'fas fa-child',
      content: 'Urban Ride does not knowingly collect personal information from children under 13 years of age. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.'
    },
    {
      id: 'thirdparty',
      title: '9. Third-Party Links',
      icon: 'fas fa-external-link-alt',
      content: 'Our website may contain links to third-party websites. Urban Ride is not responsible for the privacy practices or content of such external websites.'
    },
    {
      id: 'updates',
      title: '10. Policy Updates',
      icon: 'fas fa-sync-alt',
      content: 'Urban Ride reserves the right to update or modify this Privacy Policy at any time. Any changes will be published on our website and will be effective immediately upon posting.'
    },
    {
      id: 'consent',
      title: '11. Consent',
      icon: 'fas fa-file-contract',
      content: 'By using our website, mobile application, or transport services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.'
    }
  ];

  return (
    <div className="legal-page">
      {/* Hero Section */}
      <section className="legal-hero" style={{ background: 'linear-gradient(rgba(10, 10, 10, 0.8), rgba(10, 10, 10, 0.8)), url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop")' }}>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Your privacy and data protection are important to us. Learn how we handle your information with care.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="legal-content-section">
        <div className="container legal-container">
          {/* Sidebar Navigation */}
          <aside className="legal-sidebar">
            <nav className="legal-nav">
              <h3>On this page</h3>
              <ul>
                {sections.map(section => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.title.includes('.') ? section.title.split('. ')[1] : section.title}</a>
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
                
                {section.content && <p>{section.content}</p>}

                {section.isNested && section.subsections.map((sub, sIndex) => (
                  <div key={sIndex} className="legal-subsection" style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '10px', fontWeight: 700 }}>{sub.subtitle}</h4>
                    <ul>
                      {sub.points.map((point, pIndex) => (
                        <li key={pIndex}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}

                {section.isBullet && (
                  <ul>
                    {section.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}

                {section.footerText && <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#64748b' }}>{section.footerText}</p>}
                
                {index < sections.length - 1 && <div className="legal-divider"></div>}
              </div>
            ))}

            {/* Contact Highlight Box */}
            <div className="legal-contact-box" id="contact-info">
              <h3>12. Contact Information</h3>
              <p>For any questions or concerns regarding this Privacy Policy, please reach out to us:</p>
              <div className="contact-info-grid">
                <div className="contact-info-group">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:support@urbanride.ltd">support@urbanride.ltd</a>
                </div>
                <div className="contact-info-group">
                  <i className="fas fa-phone-alt"></i>
                  <span>84118-87118</span>
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

export default PrivacyPolicy;
