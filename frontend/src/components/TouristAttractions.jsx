import React from 'react';
import './TouristAttractions.css';

const TouristAttractions = () => {
  const attractions = [
    {
      id: 1,
      title: "Pune",
      description: "Travel to Pune, a perfect blend of modern lifestyle and rich heritage. Ideal for business trips, education hubs, and weekend getaways with smooth taxi services.",
      image: "/pune.png"
    },
    {
      id: 2,
      title: "Nashik",
      description: "Discover Nashik, known for its spiritual vibes and vineyards. Enjoy peaceful journeys for pilgrimages, wine tours, and scenic road trips with reliable cab service.",
      image: "/nashik.png"
    },
    {
      id: 3,
      title: "Nagpur",
      description: "Explore Nagpur, the Orange City of India, known for its growing business hubs and central connectivity. Enjoy smooth and reliable rides for daily travel and intercity journeys.",
      image: "/nagpur.png"
    }
  ];

  return (
    <section className="tourist-section">
      <div className="tourist-container">
        <div className="tourist-header reveal">
          <h2 className="tourist-title">Popular Travel Destinations</h2>
          <p className="tourist-subtitle">
            Maha Urban Ride provides reliable and efficient intercity travel solutions, ensuring smooth journeys to top destinations, business centers, and popular travel routes.
          </p>
        </div>

        <div className="attraction-grid">
          {attractions.map((attraction, index) => (
            <div
              key={attraction.id}
              className="attraction-card reveal"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="card-left">
                <img src={attraction.image} alt={attraction.title} />
              </div>
              <div className="card-right">
                <h3>{attraction.title}</h3>
                <p>{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TouristAttractions;
