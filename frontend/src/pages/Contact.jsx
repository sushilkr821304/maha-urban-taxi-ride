const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Get in touch with us for any inquiries or support</p>
        </div>

        <div className="contact-card">
          <h2 className="contact-card-title">Maha Urban Taxi Ride Private Limited</h2>
          
          <div className="contact-card-grid">
            {/* Left Side - Address */}
            <div className="contact-card-col">
              <h3 className="contact-card-heading">Departmental Office</h3>
              <address className="address-details">
                1038, Gera Imperium Rise, Opp. Wipro Circle,<br />
                Rajiv Gandhi Infotech Park, Hinjewadi Phase 2,<br />
                Pune – 411057 (Maha) India
              </address>
            </div>

            {/* Right Side - ContactInfo */}
            <div className="contact-card-col">
              <h3 className="contact-card-heading">Contact Information</h3>
              <div className="contact-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-info-text">
                    <p className="info-label">Phone</p>
                    <p className="info-value">08411887118</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-info-text">
                    <p className="info-label">Email</p>
                    <p className="info-value"><a href="mailto:support@urbanride.ltd">support@urbanride.ltd</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
