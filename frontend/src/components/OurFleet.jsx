import React, { useEffect, useRef } from 'react';

const fleetData = [
  {
    id: 1,
    image: '/final_cab1.png',
    title: '15–17 Seater Urbania Buses',
    desc: 'Safe, premium and comfortable Urbania buses designed for city rides, office commutes, and group travel across Maha Urban Ride routes.'
  },
  {
    id: 2,
    image: '/final_cab2.png',
    title: '7 Seater Maruti Suzuki Ertiga',
    desc: 'Spacious and reliable 7-seater ideal for daily travel, corporate rides, and intercity journeys with maximum comfort and smooth experience.'
  },
  {
    id: 3,
    image: '/newb1.png',
    title: '30–35 Seater Buses',
    desc: 'High-capacity buses with superior comfort, perfect for long-distance travel, daily routes, and safe group transportation.'
  }
];

const OurFleet = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.fleet-card.reveal');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="our-fleet-container mt-16" ref={sectionRef}>
      <h2 className="section-title">Our Fleet</h2>
      <div className="fleet-grid-container">
        {fleetData.map((item, index) => (
          <div
            key={item.id}
            className="fleet-card reveal"
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="fleet-image-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="fleet-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurFleet;
