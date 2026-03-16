import HeroSection from '../components/HeroSection'
import SearchBox from '../components/SearchBox'
import PopularRoutes from '../components/PopularRoutes'
import WhyChoose from '../components/WhyChoose'
import RideBenefits from '../components/RideBenefits'
import DownloadApp from '../components/DownloadApp'
import { useEffect } from 'react'

const Home = () => {
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
      <SearchBox />
      <PopularRoutes />
      <WhyChoose />
      <RideBenefits />
      <DownloadApp />
    </>
  )
}

export default Home
