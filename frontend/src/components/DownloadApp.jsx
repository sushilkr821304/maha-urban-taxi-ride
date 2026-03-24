const DownloadApp = () => {
  return (
    <section className="download-section" id="download">
      <div className="container">
        <div className="download-app-wrapper">
          <div className="download-content reveal reveal-left">
            <span className="app-badge">  Mobile App</span>
            <h2 className="download-title">Get the Urban Ride <span className="accent-text">App</span></h2>
            <p className="download-desc">
              Download the Urban Ride mobile app to book rides instantly,
              track trips in real time, and enjoy exclusive intercity travel benefits.
            </p>

            <div className="store-badges">
              <a href="#" className="store-link">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
              </a>
              <a href="#" className="store-link">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
              </a>
            </div>

            <button className="btn-blue-outline">Notify Me When Available</button>
          </div>

          <div className="download-visual reveal reveal-right">
            <div className="mobile-mockup-premium">
              <img src="/mobile2.png" alt="Urban Black Mobile App" className="premium-app-img" />
              <div className="glow-effect"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadApp
