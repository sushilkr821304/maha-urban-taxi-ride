const BenefitCard = ({ title, highlights, image }) => (
  <div className="benefit-card reveal">
    <div className="benefit-image">
      <img src={image} alt={title} />
    </div>
    <div className="benefit-info">
      <h3>{title}</h3>
      <ul className="benefit-highlights">
        {highlights.map((item, index) => (
          <li key={index}>
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
      title: "Senior citizen discount",
      image: "/ride-b1.png",
      highlights: [
        "Up to 50% discount for eligible senior citizens",
        "Affordable and convenient travel for elderly travelers",
        "Valid identity proof required"
      ]
    },
    {
      title: "Women's discount",
      image: "/ride-b2.png",
      highlights: [
        "Up to 50% discount for eligible women passengers",
        "Incentives for safe, respectful, and easy travel",
        "Verification by agent/conductor is mandatory"
      ]
    },
    {
      title: "School and college student discounts",
      image: "/ride-b3.png",
      highlights: [
        "Up to 10% discount for regular student travelers",
        "Valid school or college ID required",
        "Aimed at supporting education-related travel"
      ]
    }
  ]

  return (
    <section className="section-padding bg-light-alt" id="benefits">
      <div className="container">
        <div className="section-header reveal center">
          <h2 className="benefit-title">Ride Benefits</h2>
          <p className="benefit-subtitle">As part of social responsibility, concession is provided to eligible passengers as follows</p>
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
