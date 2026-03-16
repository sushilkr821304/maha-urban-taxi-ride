const BenefitCard = ({ title, highlights, icon, image, badge }) => (
  <div className="benefit-card reveal">
    <div className="benefit-image">
      <img src={image} alt={title} />
      {badge && <div className="benefit-badge">{badge}</div>}
    </div>
    <div className="benefit-info">
      <h3>{title}</h3>
      <ul className="benefit-highlights">
        {highlights.map((item, index) => (
          <li key={index}>
            <i>✓</i>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

const RideBenefits = () => {
  const benefits = [
    {
      title: "Driver Safety Assurance",
      badge: "Verified",
      image: "/car1.png",
      highlights: [
        "Verified and background-checked drivers",
        "Real-time ride tracking for safety",
        "Emergency contact support"
      ]
    },
    {
      title: "Women Safety Priority",
      badge: "Safe Travel",
      image: "/hero2.png",
      highlights: [
        "Priority ride options for women riders",
        "Verified drivers and secure travel",
        "24/7 support for assistance"
      ]
    },
    {
      title: "Student Travel Discounts",
      badge: "Education First",
      image: "/hero1.png",
      highlights: [
        "Special discounted fares for students",
        "Easy booking for daily commute",
        "Affordable travel for education routes"
      ]
    },
    {
      title: "Senior Citizen Support",
      badge: "Care & Comfort",
      image: "/car3.png",
      highlights: [
        "Comfortable rides for elderly passengers",
        "Easy pickup and drop assistance",
        "Priority customer support"
      ]
    }
  ]

  return (
    <section className="section-padding bg-light-alt" id="benefits">
      <div className="container">
        <div className="section-header reveal center">
          <h2>Ride Benefits</h2>
          <p>Enjoy extra advantages and comfort when you travel with UrbanRide.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RideBenefits
