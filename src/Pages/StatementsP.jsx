import React from 'react'
import Navbar1 from '../Components/Navbar1'
import Banner from '../Components/Statements/Banner'
import Footer from '../Components/Footer'
import Statements from '../Components/Statements/Statements'

const StatementsP = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <Banner />
      <Statements />
      <Footer />
    </div>
  )
}

export default StatementsP
