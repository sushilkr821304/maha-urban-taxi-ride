import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const PopularRoute = ({ city, rides, badge, badgeClass, icon }) => (
  <div className="route-card reveal active">
    {/* Text info on the left */}
    <div className="route-info">
      <h3>{city}</h3>
      <p>{rides} Routes</p>
    </div>

    {/* Right side container for Badge and Icon with proper vertical spacing */}
    <div className="route-right">
      <span className={`badge-tag ${badgeClass}`}>{badge}</span>
      <div className="route-icon">
        <img src={icon} alt={city} />
      </div>
    </div>
  </div>
)

const PopularRoutes = () => {
  const swiperRef = useRef(null)

  const routes = [
    { city: "Pune", rides: "456", badge: "Trending", badgeClass: "badge-trending", icon: "/pune.png" },
    { city: "Mumbai", rides: "412", badge: "Guest Favorite", badgeClass: "badge-favorite", icon: "/mumbai.png" },
    { city: "Nashik", rides: "320", badge: "Top Rated", badgeClass: "badge-top", icon: "/pune.png" },
    { city: "Nagpur", rides: "280", badge: "Customer Choice", badgeClass: "badge-favorite", icon: "/delhi.png" },
    { city: "Solapur", rides: "190", badge: "Trending", badgeClass: "badge-trending", icon: "/bangalore.png" },
    { city: "Kolhapur", rides: "210", badge: "Guest Favorite", badgeClass: "badge-favorite", icon: "/mumbai.png" },
    { city: "Thane", rides: "540", badge: "Top Rated", badgeClass: "badge-top", icon: "/pune.png" },
    { city: "Aurangabad", rides: "260", badge: "Trending", badgeClass: "badge-trending", icon: "/bangalore.png" },
    { city: "Raigad", rides: "180", badge: "Guest Favorite", badgeClass: "badge-favorite", icon: "/mumbai.png" }
  ]

  return (
    <section className="section-padding" id="routes">
      <div className="container">
        <div className="section-header reveal active">
          <div className="header-text">
            <h2>Popular Routes</h2>
            <p>Explore the most booked routes with UrbanRide</p>
          </div>
          <div className="carousel-controls">
            <button className="control-btn prev-route">←</button>
            <button className="control-btn next-route">→</button>
          </div>
        </div>

        <div className="routes-carousel">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.prev-route',
              nextEl: '.next-route',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 }
            }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            className="routes-swiper"
          >
            {routes.map((route, index) => (
              <SwiperSlide key={index}>
                <PopularRoute {...route} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default PopularRoutes
