import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomeMainSection from '../components/HomeMainSection'

const Home = () => {
  return (
    <div className="transition-colors duration-300 bg-gradient-to-b from-sky-200 to-white dark:from-gray-800 dark:to-black text-gray-800 dark:text-gray-100 min-h-screen">
      <Navbar />
      <HomeMainSection />
      <Footer />
    </div>
  )
}

export default Home
