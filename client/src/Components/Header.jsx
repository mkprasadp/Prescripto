import React from 'react' 
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap bg-indigo-500 rounded-lg px-6 md:px-10 lg:px-20 flex-wrap'>
      {/*'------Left Side -----'*/}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-white font-semibold  text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-tight lg:leading-tight'>
          Book Appointment <br />With Trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row text-white gap-3 text-sm font-light items-center'>
          <img className='w-28' src={assets.group_profiles} alt="" />
          <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block'/>schedule your appointment hassel-free</p>
        </div>
        <a href="#speciality" className=' gap-2 flex items-center bg-white px-8 py-3 text-gray-600 rounded-full text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
          Book Appointment <img src={assets.arrow_icon} alt="" />
        </a>
      </div>
      {/*'------Right Side -----'*/}
      <div className='md:w-1/2 relative'>
        <img src={assets.header_img} alt="" className='w-full md:absolute rounded-lg bottom-0 h-auto' />
      </div>
    </div>
  )
}

export default Header
