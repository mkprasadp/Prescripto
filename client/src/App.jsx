import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import MyAppointments from './pages/MyAppointments'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import MyProfile from './pages/MyProfile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
     </Routes>
     <Footer/>
     <ToastContainer/>
    </div>
  )
}

export default App
