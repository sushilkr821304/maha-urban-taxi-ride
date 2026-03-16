import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import MyRides from './pages/MyRides'
import RideHistory from './pages/RideHistory'
import PopularRoutesPage from './pages/PopularRoutesPage'
import About from './pages/About'
import Contact from './pages/Contact'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myrides" element={<MyRides />} />
          <Route path="/history" element={<RideHistory />} />
          <Route path="/routes" element={<PopularRoutesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
