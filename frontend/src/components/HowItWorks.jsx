import { useState, useEffect } from 'react';
import { BiSearchAlt2, BiBus, BiCheckCircle, BiMapPin } from 'react-icons/bi';
import './HowItWorks.css';

const steps = [
  {
    id: 1,
    title: 'Select your ride',
    description: 'Book your free ride by selecting your pickup, dropoff & preferred seat.',
    icon: <BiSearchAlt2 />,
  },
  {
    id: 2,
    title: 'Choose Your  Bus ',
    description: 'Explore nearby stops, compare bus timings, and choose the most convenient option for your journey.',
    icon: <BiBus />,
  },
  {
    id: 3,
    title: 'Your Ride is Successfully Booked',
    description: 'Your ride is confirmed! You’ll receive updates on your bus location, stop details and safety features.',
    icon: <BiCheckCircle />,
  },
  {
    id: 4,
    title: 'Real-Time Bus Tracking',
    description: 'Live location, stop updates, and safety features — everything you need for a smooth ride.',
    icon: <BiMapPin />,
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev === steps.length ? 1 : prev + 1));
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-header center reveal">
          <h2 className="how-it-works-title">How it works</h2>
          <p>It's simple to take a ride. Just search, select and it's done!</p>
        </div>

        <div className="how-content-wrapper">
          {/* Left Side: Steps */}
          <div className="how-steps-container reveal reveal-left">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`step-card ${activeStep === step.id ? 'active' : ''}`}
                onMouseEnter={() => {
                  setActiveStep(step.id);
                  setIsPaused(true);
                }}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => {
                  setActiveStep(step.id);
                  setIsPaused(true);
                }}
              >
                <div className="step-icon">{step.icon}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  {activeStep === step.id && (
                    <p className="step-desc">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="how-visual-container reveal reveal-right">
            <div className="image-display-container">
              {[1, 2, 3, 4].map((stepId) => (
                <img
                  key={stepId}
                  src={`/${stepId}.png`}
                  alt={`Step ${stepId}`}
                  className={`step-image ${activeStep === stepId ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
