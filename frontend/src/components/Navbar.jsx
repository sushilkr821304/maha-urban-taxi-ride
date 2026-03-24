import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent background scroll and 'jump' behavior when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [isMenuOpen]);

  return (
    <nav className="navbar scrolled">
      <div className="container">
        <Link to="/" className="nav-logo">
          <img src="/header-logo.png" alt="Maha Urban Taxi Ride" className="logo-img" />
        </Link>

        <div className="mobile-header-actions">
          <a href="tel:+918411887118" className="mobile-phone-btn desktop-hide mobile-hide">
            <i className="fas fa-phone-alt"></i>
            <span>+91 8411887118</span>
          </a>

          <button
            className={`mobile-menu-btn ${isMenuOpen ? 'menu-open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li className="mobile-only sidebar-header">
            <Link to="/" className="sidebar-logo">
              <img src="/header-logo.png" alt="Maha Urban Taxi Ride" className="sidebar-logo-img" />
            </Link>
            <button
              className="sidebar-close-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close Menu"
            >
              <i className="fas fa-times"></i>
            </button>
          </li>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/routes">Routes</NavLink></li>
          <li><NavLink to="/about">About Us</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li className="nav-dropdown">
            <NavLink to="/recruitment" className="dropdown-trigger">
              Recruitment <i className="fas fa-chevron-down"></i>
            </NavLink>
            <ul className="dropdown-menu">
              <li><a href="https://emp.urbanride.ltd/EmpReg-login" target="_blank" rel="noopener noreferrer">Employee Registration</a></li>
              <li><Link to="/recruitment?type=cab">Vendor Registration</Link></li>
            </ul>
          </li>
          <li className="mobile-only sidebar-cta-wrapper">
            <a href="tel:+918411887118" className="navbar-cta">
              <i className="fas fa-phone-alt"></i>
              <span>+91 8411887118</span>
            </a>
          </li>
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
