import { useRef } from 'react'

const PopularRoute = ({ city, rides, badge, badgeClass, icon }) => (
  <div className="route-card reveal">
    <span className={`badge ${badgeClass}`}>{badge}</span>
    <div className="route-icon">
      <img src={icon} alt={city} />
    </div>
    <div className="route-info">
      <h3>{city}</h3>
      <p>{rides} Routes</p>
    </div>
  </div>
)

const PopularRoutes = () => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="section-padding" id="routes">
      <div className="container">
        <div className="section-header reveal">
          <div className="header-text">
            <h2>Popular Taxi Routes</h2>
            <p>Explore the most booked routes with UrbanRide</p>
          </div>
          <div className="carousel-controls">
            <button className="control-btn" onClick={() => scroll('left')}>←</button>
            <button className="control-btn" onClick={() => scroll('right')}>→</button>
          </div>
        </div>
        
        <div className="routes-grid" ref={scrollRef}>
          <PopularRoute 
            city="Pune" 
            rides="456" 
            badge="Trending" 
            badgeClass="badge-trending" 
            icon="/pune.png"
          />
          <PopularRoute 
            city="Mumbai" 
            rides="412" 
            badge="Guest Favorite" 
            badgeClass="badge-favorite" 
            icon="/mumbai.png"
          />
          <PopularRoute 
            city="Nashik" 
            rides="320" 
            badge="Top Rated" 
            badgeClass="badge-top" 
            icon="/pune.png" 
          />
          <PopularRoute 
            city="Nagpur" 
            rides="280" 
            badge="Customer Choice" 
            badgeClass="badge-favorite" 
            icon="/delhi.png"
          />
          <PopularRoute 
            city="Solapur" 
            rides="190" 
            badge="Trending" 
            badgeClass="badge-trending" 
            icon="/bangalore.png"
          />
          <PopularRoute 
            city="Kolhapur" 
            rides="210" 
            badge="Guest Favorite" 
            badgeClass="badge-favorite" 
            icon="/mumbai.png"
          />
          <PopularRoute 
            city="Thane" 
            rides="540" 
            badge="Top Rated" 
            badgeClass="badge-top" 
            icon="/pune.png"
          />
          <PopularRoute 
            city="Aurangabad" 
            rides="260" 
            badge="Trending" 
            badgeClass="badge-trending" 
            icon="/bangalore.png"
          />
          <PopularRoute 
            city="Raigad" 
            rides="180" 
            badge="Guest Favorite" 
            badgeClass="badge-favorite" 
            icon="/mumbai.png"
          />
        </div>
      </div>
    </section>
  )
}

export default PopularRoutes
