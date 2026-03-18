import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SearchBox from "./SearchBox";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: "/new111.png",
    },
    {
      id: 2,
      image: "/newbb22.png",
    },
    {
      id: 3,
      image: "/newbb4.png",
    },
  ];

  const commonText = {
    title: "Active  Rides Today!",
  };

  return (
    <section className="hero-slider-section" id="home">
      {/* Background Slider */}
      <div className="hero-background-slider">
        <Swiper
          modules={[Autoplay]}
          speed={1500}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="hero-slide-bg"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Fixed Content Over Slider */}
      <div className="container hero-content-fixed">
        <h1 className="hero-title-fixed">{commonText.title}</h1>
      </div>

      {/* Integrated Search Box - Remains Fixed */}
      <SearchBox />
    </section>
  );
};

export default HeroSection;
