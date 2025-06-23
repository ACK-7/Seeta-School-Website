import React from 'react'
import Navbar from '../Components/Navbar1'
import Footer from '../Components/Footer'
import ContactUs from '../Components/ContactUs/ContactUs'
import Campuses from '../Components/ContactUs/Campuses'
import OurTeamSection from '../Components/ContactUs/OurTeam'

const Apply = () => {
  return (
    <div>
      <Navbar />
      <Campuses />
      <ContactUs />
      <OurTeamSection />
      <Footer />
    </div>
  )
}

export default Apply
