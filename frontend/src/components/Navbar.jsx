import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar scrolled">
      <div className="container">
        <Link to="/" className="nav-logo">
          <img src="/header-logo.png" alt="Maha Urban Taxi Ride" className="logo-img" />
        </Link>

        <div className="mobile-header-actions">
          <a href="tel:+918411887118" className="mobile-phone-btn desktop-hide">
            <i className="fas fa-phone-alt"></i>
            <span>+91 8411887118</span>
          </a>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/routes">Routes</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>

        <div className="nav-actions">
          <a href="tel:+918411887118" className="navbar-cta">
            <i className="fas fa-phone-alt"></i>
            <span>+91 8411887118</span>
          </a>
        </div>
      </div>

      {/* Overlay backdrop for mobile menu */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </nav>
  )
}

export default Navbar
