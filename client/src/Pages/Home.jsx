import React from 'react'
import Header from '../Components/Header'
import SpecialityMenue from '../Components/SpecialityMenue'
import TopDoctor from '../Components/TopDoctor'
import Banner from '../Components/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenue/>
      <TopDoctor/>
      <Banner/>
    </div>
  )
}

export default Home
