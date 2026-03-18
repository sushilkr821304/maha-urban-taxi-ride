import { Link } from 'react-router-dom';

const Footer = () => {
  const today = new Date();
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-IN', options);

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 – Brand Information */}
          <div className="footer-column brand-info">
            <div className="footer-logo-container">
              <img src="/footer-logo.png" alt="Maha Urban Taxi Ride" className="footer-logo-img" />
            </div>
            <p className="footer-desc">
              Maha Urban Taxi Ride provides safe, reliable and affordable intercity taxi services across major cities in Maharashtra.
              Our platform connects passengers with verified drivers for comfortable and secure travel.
            </p>
          </div>

          {/* Column 2 – Information */}
          <div className="footer-column">
            <h3>Information</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/refund">Cancellation & Refund</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3 – Popular Cities */}
          <div className="footer-column">
            <h3>Popular Cities</h3>
            <ul className="footer-links cities-grid">
              <li>Pune</li>
              <li>Mumbai</li>
              <li>Nashik</li>
              <li>Nagpur</li>
              <li>Solapur</li>
              <li>Kolhapur</li>
              <li>Aurangabad</li>
              <li>Thane</li>
            </ul>
          </div>

          {/* Column 4 – Contact Information */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <div className="contact-details-box">
              <h4 className="footer-company-name">Maha Urban Taxi Ride Private Limited</h4>
              <p className="footer-subheading">DEPARTMENTAL OFFICE</p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>
                    1038, Gera Imperium Rise, Opp. Wipro Circle,<br />
                    Rajiv Gandhi Infotech Park, Hinjewadi Phase 2,<br />
                    Pune - 411057 (Maha) India
                  </p>
                </div>

                <div className="contact-info-item">
                  <i className="fas fa-phone-alt"></i>
                  <a href="tel:08411887118">08411887118</a>
                </div>

                <div className="contact-info-item">
                  <i className="fas fa-envelope"></i>
                  <a href="mailto:support@urbanride.ltd">support@urbanride.ltd</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Info Row */}
        <div className="footer-bottom-row">
          <div className="footer-bottom-left">
            <p>© {today.getFullYear()} Maha Urban Taxi Ride. All rights reserved.</p>
            <p className="last-updated">Last Updated: {formattedDate}</p>
          </div>

          <div className="footer-bottom-center">
            <div className="partner-logo-box">
              <img src="/logo2.png" alt="ThynkTech India" className="thynktech-logo" />
              <p className="powered-by-text">Powered by <span>ThynkTech India</span></p>
            </div>
          </div>

          <div className="footer-bottom-right">
            <p>Visitors: 4,592</p>
            <p>Version: 1.0.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
