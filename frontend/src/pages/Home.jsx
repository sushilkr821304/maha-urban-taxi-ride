import HeroSection from '../components/HeroSection'
import SearchBox from '../components/SearchBox'
import PopularRoutes from '../components/PopularRoutes'
import WhyChoose from '../components/WhyChoose'
import RideBenefits from '../components/RideBenefits'
import DownloadApp from '../components/DownloadApp'
import TouristAttractions from '../components/TouristAttractions'
import HowItWorks from '../components/HowItWorks'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#search-section') {
      const element = document.getElementById('search-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal')
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight
        const elementTop = reveal.getBoundingClientRect().top
        const elementVisible = 150
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active')
        }
      })
    }

    window.addEventListener('scroll', handleReveal)
    handleReveal() // Initial check

    return () => window.removeEventListener('scroll', handleReveal)
  }, [])

  return (
    <>
      <HeroSection />
      <PopularRoutes />
      <WhyChoose />
      <RideBenefits />
      <DownloadApp />
      <HowItWorks />
      <TouristAttractions />
    </>
  )
}

export default Home
