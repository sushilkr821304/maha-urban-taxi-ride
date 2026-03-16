import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = location.pathname === '/'

  return (
    <nav className={`navbar ${isScrolled || !isHome ? 'glass-card' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">Urban<span>Ride</span></Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/myrides">My Rides</Link></li>
          <li><Link to="/history">Ride History</Link></li>
          <li><Link to="/routes">Popular Routes</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <a href="tel:+919021345630" className="navbar-cta">
          <span>📞</span> +91 9021345630
        </a>
      </div>
    </nav>
  )
}

export default Navbar
