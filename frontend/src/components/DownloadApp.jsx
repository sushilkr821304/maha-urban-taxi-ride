const DownloadApp = () => {
  return (
    <section className="section-padding bg-white" id="download">
      <div className="container">
        <div className="download-app-wrapper reveal">
          <div className="download-content">
            <h2 className="download-title">Download the Mobile App</h2>
            <p className="coming-soon">Coming Soon</p>
            <p className="download-desc">
              Our Android and iOS apps are launching soon. Book rides easily,
              get real-time tracking, and enjoy special offers.
            </p>

            <div className="platform-hints">
              <div className="platform-item">
                <i className="android-icon"></i>
                <span>Android</span>
              </div>
              <div className="platform-item">
                <i className="apple-icon"></i>
                <span>iOS</span>
              </div>
            </div>
          </div>

          <div className="download-visual">
            <div className="mobile-mockup">
              <img src="/download.png" alt="UrbanRide Mobile App" className="app-img" />
              <div className="store-buttons">
                <a href="#" className="store-btn">
                  {/* <img src="/playstore.png" alt="Google Play" /> */}
                </a>
                <a href="#" className="store-btn">
                  {/* <img src="/appstore.png" alt="App Store" /> */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DownloadApp
