import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MyRides from './pages/MyRides'
import RideHistory from './pages/RideHistory'
import PopularRoutesPage from './pages/PopularRoutesPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import FAQ from './pages/FAQ'
import SearchResults from './pages/SearchResults'
import SeatSelection from './pages/SeatSelection'
import BookingDetails from './pages/BookingDetails'
import Recruitment from './pages/Recruitment'
import ScrollToTop from './components/ScrollToTop'
import './index.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myrides" element={<MyRides />} />
          <Route path="/history" element={<RideHistory />} />
          <Route path="/routes" element={<PopularRoutesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/booking-details" element={<BookingDetails />} />
          <Route path="/recruitment" element={<Recruitment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
