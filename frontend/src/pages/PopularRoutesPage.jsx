import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PopularRoutesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('All Cities');
  const [loading, setLoading] = useState(false);

  // Fallback image URL - using a very reliable one
  const fallbackImage = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop';

  // Mock Data for Routes
  const initialRoutes = [
    {
      id: 1,
      from: 'Pune',
      to: 'Mumbai',
      distance: '150 km',
      time: '3.5 hrs',
      image: '/mumbai.png', // Using local image
      tag: 'Popular',
      trending: false
    },
    {
      id: 2,
      from: 'Mumbai',
      to: 'Nashik',
      distance: '165 km',
      time: '4 hrs',
      image: '/bus9.png',
      tag: 'Trending',
      trending: true
    },
    {
      id: 3,
      from: 'Pune',
      to: 'Mahabaleshwar',
      distance: '120 km',
      time: '3 hrs',
      image: '/bus6.png',
      tag: 'Recently Booked',
      trending: false
    },
    {
      id: 4,
      from: 'Mumbai',
      to: 'Pune',
      distance: '150 km',
      time: '3.5 hrs',
      image: '/pune.png', // Using local image
      tag: 'Popular',
      trending: false
    },
    {
      id: 5,
      from: 'Nashik',
      to: 'Mumbai',
      distance: '165 km',
      time: '4 hrs',
      image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=800&auto=format&fit=crop',
      tag: 'Best Value',
      trending: false
    },
    {
      id: 6,
      from: 'Pune',
      to: 'Shirdi',
      distance: '185 km',
      time: '4.5 hrs',
      image: '/bus8.png',
      tag: 'Top Rated',
      trending: true
    }
  ];

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const [routes, setRoutes] = useState(initialRoutes);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate search
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="routes-page">
      {/* Hero Section */}
      <section className="routes-hero">
        <div className="container">
          <h1>Popular Routes</h1>
          <p>Explore all the trending taxi routes in your city</p>

          <form className="routes-search-box" onSubmit={handleSearch}>
            <div className="route-input-group">
              <i className="fas fa-map-marker-alt"></i>
              <input type="text" placeholder="From Location" />
            </div>
            <div className="route-input-group">
              <i className="fas fa-location-arrow"></i>
              <input type="text" placeholder="To Location" />
            </div>
            <button type="submit" className="find-route-btn">Find Routes</button>
          </form>
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        <section className="routes-content">
          {/* Filters */}
          <div className="filters-wrapper">
            <h2 className="section-title" style={{ fontSize: '1.8rem', margin: 0 }}>All Routes</h2>
            <div className="filter-groups">
              <select className="filter-select" onChange={(e) => setFilterCity(e.target.value)}>
                <option>All Cities</option>
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Nashik</option>
              </select>
              <select className="filter-select">
                <option>Travel Time</option>
                <option>Short (&lt; 3 hrs)</option>
                <option>Long (&gt; 3 hrs)</option>
              </select>
              <select className="filter-select">
                <option>Distance</option>
                <option>Below 150km</option>
                <option>Above 150km</option>
              </select>
            </div>
          </div>

          {/* Routes Grid */}
          <div className="routes-grid-container">
            {loading ? (
              // Loading Skeleton Effect
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="route-page-card skeleton" style={{ height: '400px', background: '#eee' }}></div>
              ))
            ) : (
              routes.map(route => (
                <div key={route.id} className="route-page-card">
                  <div className="route-card-image">
                    <img
                      src={route.image}
                      alt={`${route.from} to ${route.to}`}
                      onError={handleImageError}
                    />
                    <span className={`route-tag ${route.trending ? 'trending-tag' : ''}`}>
                      {route.tag}
                    </span>
                  </div>

                  <div className="route-card-content">
                    <div className="route-destination">
                      <h3>{route.from}</h3>
                      <i className="fas fa-arrow-right"></i>
                      <h3>{route.to}</h3>
                    </div>

                    <div className="route-details-list">
                      <div className="route-detail-item">
                        <i className="fas fa-road"></i>
                        <span>{route.distance}</span>
                      </div>
                      <div className="route-detail-item">
                        <i className="fas fa-clock"></i>
                        <span>{route.time}</span>
                      </div>
                      <div className="route-detail-item">
                        <i className="fas fa-users"></i>
                        <span>4 Seater</span>
                      </div>
                      <div className="route-detail-item">
                        <i className="fas fa-gas-pump"></i>
                        <span>Inc. Fuel</span>
                      </div>
                    </div>

                    <div className="route-action-container">
                      <button
                        className="book-route-btn full-width"
                        onClick={() => navigate('/#search-section')}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More */}
          <div className="load-more-container">
            <button className="load-more-btn">Load More Routes</button>
          </div>
        </section>
      </div>

      {/* Book A Cab From Cities Section */}
      <section className="book-from-cities-section">
        <div className="container">
          <div className="book-cities-header">
            <h2 className="book-cities-title">BOOK A BUS/CAB FROM CITIES</h2>
            <p className="book-cities-subtitle">Take advantage of great rates, reliable service, and on-time pick-up-drop!</p>
          </div>
          <div className="book-cities-grid">
            <div className="book-city-card">
              <img src="/pune1.png" alt="Nashik to Pune" className="book-city-img" />
              <div className="book-city-overlay">
                <div className="signboard-container">
                  <div className="signboard-pole"></div>
                  <div className="signboard"></div>
                </div>

              </div>
            </div>

            <div className="book-city-card">
              <img src="/pune2.png" alt="Pune to Nashik" className="book-city-img" />
              <div className="book-city-overlay">
                <div className="signboard-container">
                  <div className="signboard-pole"></div>
                  <div className="signboard"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularRoutesPage;
