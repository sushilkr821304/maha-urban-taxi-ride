import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import OurFleet from '../components/OurFleet';
const PopularRoutesPage = () => {
  const navigate = useNavigate();
  const [filterCity, setFilterCity] = useState('All Cities');
  const [loading, setLoading] = useState(false);

  // Fallback image URL - using a very reliable one
  const fallbackImage = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop';

  // Mock Data for Routes with Price
  const initialRoutes = [
    {
      id: 1,
      from: 'Pune',
      to: 'Mumbai',

      distance: '150 km',
      time: '3.5 hrs',
      image: '/rode1.png',
      tag: 'Popular',
      trending: false
    },
    {
      id: 2,
      from: 'Mumbai',
      to: 'Nashik',

      distance: '165 km',
      time: '4 hrs',
      image: 'rode2.png',
      tag: 'Trending',
      trending: true
    },
    {
      id: 3,
      from: 'Pune',
      to: 'Mahabaleshwar',

      distance: '120 km',
      time: '3 hrs',
      image: '/rode3.png',
      tag: 'Recently Booked',
      trending: false
    },
    {
      id: 4,
      from: 'Mumbai',
      to: 'Pune',

      distance: '150 km',
      time: '3.5 hrs',
      image: '/rode4.png',
      tag: 'Popular',
      trending: false
    },
    {
      id: 5,
      from: 'Nashik',
      to: 'Mumbai',

      distance: '165 km',
      time: '4 hrs',
      image: '/rode7.png',
      tag: 'Best Value',
      trending: false
    },
    {
      id: 6,
      from: 'Pune',
      to: 'Shirdi',

      distance: '185 km',
      time: '4.5 hrs',
      image: '/rode5.png',
      tag: 'Top Rated',
      trending: true
    },
    {
      id: 7,
      from: 'Pune',
      to: 'Solapur',

      distance: '185 km',
      time: '3.5 hrs',
      image: '/rode6.png',
      tag: 'Top Rated',
      trending: true
    },
    {
      id: 8,
      from: 'Pune',
      to: 'Nagpur',

      distance: '185 km',
      time: '9.5 hrs',
      image: '/bus8.png',
      tag: 'Top Rated',
      trending: true
    },
  ];

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const [routes, setRoutes] = useState(initialRoutes);


  return (
    <div className="routes-page">
      {/* Hero Section */}
      <section className="routes-hero">
        <div className="container">
          <h1>Explore Popular Routes</h1>

          <SearchBox variant="routes" />
        </div>
      </section>

      {/* Main Content */}
      <div className="container">
        <section className="routes-content">
          {/* Modern Pill Filters */}
          <div className="filters-wrapper">
            <h2 className="section-title">All Destinations</h2>
            <div className="filter-pills-container">
              {['All Cities', 'Pune', 'Mumbai', 'Nashik'].map(city => (
                <button
                  key={city}
                  className={`filter-pill ${filterCity === city ? 'active' : ''}`}
                  onClick={() => setFilterCity(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Premium Routes Grid */}
          <div className="routes-grid-container">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="route-page-card skeleton"></div>
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
                    <div className="card-gradient-overlay"></div>
                    <span className={`route-tag-pill ${route.tag.toLowerCase().replace(' ', '-')}`}>
                      {route.tag}
                    </span>
                    <div className="card-image-content">
                      <div className="route-name-overlay">
                        {route.from} <i className="fas fa-arrow-right"></i> {route.to}
                      </div>
                    </div>
                  </div>

                  <div className="route-card-body">
                    <div className="route-meta-inline">
                      <div className="meta-item">
                        <i className="fas fa-route"></i>
                        <span>{route.distance}</span>
                      </div>
                      <div className="meta-item">
                        <i className="fas fa-clock"></i>
                        <span>{route.time}</span>
                      </div>
                    </div>

                    <div className="route-secondary-info">
                      <span><i className="fas fa-gas-pump"></i> Inc. Fuel</span>
                    </div>

                    <button
                      className="book-route-cta"
                      onClick={() => navigate('/#hero-section')}
                    >
                      Book Ride <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More */}
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={() => navigate('/#hero-section')}
            >
              Load More Routes
            </button>
          </div>
        </section>

        {/* Fleet Section addition */}
        <section className="routes-fleet-section" style={{ marginTop: '5rem', paddingBottom: '3rem' }}>
          <OurFleet />
        </section>
      </div>

    </div>
  );
};

export default PopularRoutesPage;
