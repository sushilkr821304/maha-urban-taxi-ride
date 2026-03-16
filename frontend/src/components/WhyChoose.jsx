const WhyItem = ({ text }) => (
  <div className="why-item">
    <i>✓</i>
    <span>{text}</span>
  </div>
)

const WhyChoose = () => {
  return (
    <section className="section-padding" id="about">
      <div className="container">
        <div className="why-choose">
          <div className="why-content reveal">
            <div className="section-header">
              <h2>Why Choose UrbanRide?</h2>
            </div>
            <div className="why-list">
              <WhyItem text="Professional and background-verified drivers" />
              <WhyItem text="Transparent pricing with no hidden charges" />
              <WhyItem text="Instant ride booking with quick pickup" />
              <WhyItem text="Live GPS ride tracking for better safety" />
              <WhyItem text="Multiple payment methods (UPI, Card, Wallet, Cash)" />
              <WhyItem text="Easy cancellations and refunds" />
              <WhyItem text="Comfortable and well-maintained vehicles" />
              <WhyItem text="Easy ride scheduling for future trips" />
              <WhyItem text="Safe and secure rides with trusted drivers" />

            </div>
          </div>
          <div className="why-visual reveal">
            <img src="/bus5.png" alt="UrbanRide Taxi" className="feature-img" />

          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
