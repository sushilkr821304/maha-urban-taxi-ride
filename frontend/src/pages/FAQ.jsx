import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData = [
    {
      category: 'Booking & Rides',
      icon: 'fas fa-taxi',
      questions: [
        {
          id: 1,
          q: 'How do I book a ride?',
          a: 'You can book a ride directly through our website or mobile app by entering your pickup and destination locations, choosing your preferred time slot, and confirming your booking.'
        },
        {
          id: 2,
          q: 'What is a fixed-route system?',
          a: 'A fixed-route system follows predefined paths and stops, similar to public transport. This ensures highest efficiency, fixed timings, and allows us to keep our fares affordable for daily commuters.'
        },
        {
          id: 3,
          q: 'Can I choose my pickup point?',
          a: 'For the safety and efficiency of all passengers, pickups are only available at our designated fixed stops. You can see the list of available stops on the routes page.'
        }
      ]
    },
    {
      category: 'Cancellation & Refund',
      icon: 'fas fa-undo-alt',
      questions: [
        {
          id: 6,
          q: 'Can I cancel my booking?',
          a: 'Yes, you can cancel your booking through the app or website before the trip starts. However, no-shows at the pickup point are not eligible for refunds.'
        },
        {
          id: 7,
          q: 'When will I get my refund?',
          a: 'Once a refund is approved, it usually takes 7-10 working days to reflect in your original payment method, depending on your bank.'
        }
      ]
    },
    {
      category: 'Safety & Security',
      icon: 'fas fa-user-shield',
      questions: [
        {
          id: 8,
          q: 'Are drivers verified?',
          a: 'Absolutely. Every driver on our platform undergoes a multi-level background check, document verification (DL, Aadhaar, PUC), and specialized driving training.'
        },
        {
          id: 9,
          q: 'Is GPS tracking available?',
          a: 'Yes, every trip is monitored 24/7 via GPS tracking through our central control room. You can also share your live trip details with family and friends.'
        }
      ]
    },
    {
      category: 'General Questions',
      icon: 'fas fa-globe',
      questions: [
        {
          id: 10,
          q: 'What cities do you operate in?',
          a: 'We currently operate across 20+ major cities in Maharashtra, including Pune, Mumbai, Nashik, Nagpur, Solapur, and Kolhapur.'
        },
        {
          id: 11,
          q: 'How can I contact support?',
          a: 'You can reach our 24/7 support team via the Contact page on our website, email us at support@urbanride.ltd, or call our passenger helpline at 84118-87118.'
        }
      ]
    }
  ];

  const handleToggle = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const filteredFaqs = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services</p>

          <div className="faq-search-container">
            <input
              type="text"
              className="faq-search-input"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
        </div>
      </section>

      {/* FAQ Main Content */}
      <section className="faq-content-section">
        <div className="container" style={{ maxWidth: '900px' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category, catIndex) => (
              <div key={catIndex} className="faq-category-wrapper">
                <h2 className="faq-category-title">
                  <i className={category.icon}></i>
                  {category.category}
                </h2>

                <div className="faq-accordion">
                  {category.questions.map((item) => (
                    <div
                      key={item.id}
                      className={`faq-item ${activeId === item.id ? 'active' : ''}`}
                    >
                      <div className="faq-question" onClick={() => handleToggle(item.id)}>
                        <h3>{item.q}</h3>
                        <div className="faq-icon-box">
                          <i className="fas fa-chevron-down"></i>
                        </div>
                      </div>
                      <div className="faq-answer">
                        <div className="answer-inner">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center" style={{ textAlign: 'center', padding: '100px 0' }}>
              <i className="fas fa-search" style={{ fontSize: '3rem', color: '#e2e8f0', marginBottom: '20px', display: 'block' }}></i>
              <h3 style={{ color: '#64748b' }}>No questions found for "{searchQuery}"</h3>
              <p style={{ color: '#94a3b8' }}>Try searching with different keywords</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="still-questions-section">
        <div className="container">
          <h2>Still have questions?</h2>
          <p>If you couldn't find the answer you were looking for, our support team is happy to help you.</p>
          <Link to="/contact" className="support-btn">Contact Support</Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
