import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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
      description: "Explore Nagpur, the Orange City of India, known for its growing business hubs and central connectivity. Enjoy smooth, reliable rides.",
      image: "/nagpur.png"
    }
  ];

  return (
    <section className="tourist-section">
      <div className="tourist-container">
        <div className="tourist-header reveal active">
          <h2 className="tourist-title">Popular Travel Destinations</h2>
          <p className="tourist-subtitle">
            Maha Urban Ride provides reliable and efficient intercity travel solutions, ensuring smooth journeys to top destinations, business centers, and popular travel routes.
          </p>
        </div>

        <div className="attraction-slider-wrapper">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              // Desktop & Tablet: Static grid behavior (Disable sliding visual)
              992: {
                slidesPerView: 3,
                autoplay: false,
                allowTouchMove: false,
                initialSlide: 0,
                centeredSlides: false
              },
              // Tablet Portrait
              768: {
                slidesPerView: 2,
                autoplay: false,
                allowTouchMove: false,
                centeredSlides: false
              },
              // Mobile View: Fully Auto-sliding
              0: {
                slidesPerView: 1,
                centeredSlides: true,
                autoplay: {
                  delay: 2000,
                  disableOnInteraction: false
                },
                allowTouchMove: true
              }
            }}
            className="attractions-swiper"
          >
            {attractions.map((attraction, index) => (
              <SwiperSlide key={attraction.id}>
                <div className="attraction-card reveal active">
                  <div className="card-image-box">
                    <img src={attraction.image} alt={attraction.title} />
                  </div>
                  <div className="card-text-box">
                    <h3>{attraction.title}</h3>
                    <p>{attraction.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TouristAttractions;
