import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <nav className={`navbar scrolled`}>
      <div className="container">
        <Link to="/" className="nav-logo">
          <img src="/header-logo.png" alt="Maha Urban Taxi Ride" className="logo-img" />
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/myrides">My Rides</NavLink></li>
          <li><NavLink to="/history">Ride History</NavLink></li>
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
    </nav>
  )
}

export default Navbar
