import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-column company-info">
            <h2 className="footer-logo">Urban<span>Ride</span></h2>
            <p className="footer-desc">
              UrbanRide provides safe, reliable, and comfortable taxi services across major cities. 
              Our mission is to make travel simple, affordable, and secure for everyone.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">IG</a>
              <a href="#" className="social-icon">TW</a>
              <a href="#" className="social-icon">LI</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/myrides">My Rides</Link></li>
              <li><Link to="/history">Ride History</Link></li>
              <li><Link to="/routes">Popular Routes</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div className="footer-column">
            <h3>Popular Cities</h3>
            <ul className="footer-links cities-grid">
              <li>Pune</li>
              <li>Mumbai</li>
              <li>Nashik</li>
              <li>Nagpur</li>
              <li>Solapur</li>
              <li>Kolhapur</li>
              <li>Thane</li>
              <li>Aurangabad</li>
              <li>Raigad</li>
            </ul>
          </div>

          {/* Contact & App */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="footer-contact">
              <li>
                <strong>Phone:</strong> +91 9021345630
              </li>
              <li>
                <strong>Email:</strong> support@urbanride.in
              </li>
              <li>
                <strong>Location:</strong> Pune, Maharashtra, India
              </li>
            </ul>
            
            <div className="footer-app">
              <p>Mobile App Coming Soon</p>
              <div className="footer-store-btns">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge_IT_RGB_blk.svg" alt="App Store" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2026 UrbanRide. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
