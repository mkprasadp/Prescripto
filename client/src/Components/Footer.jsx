import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm my-10 mt-40'>
      {/*----------Left section -------- */}
      <div>
         <img className='mb-5  w-40' src={assets.logo} alt="" />
         <p className='w-full text-gray-600 md:w-2/3 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis cumque delectus natus veniam. Quo quis possimus consequuntur blanditiis aut.</p>
      </div>
      {/*----------Middle section -------- */}
      <div>
        <p className='text-xl font-medium mb-5  '>Companey</p>
        <ul className=' text-gray-600 gap-2 flex flex-col'>
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Privacy policy</li>
        </ul>
      </div>
      {/*----------Right section -------- */}
      <div >
        <p className='text-xl font-medium mb-5  '>GET IN TOUCH</p>
        <ul className=' text-gray-600 gap-2 flex flex-col'>
          <li>+91 123-045-6789</li>
          <li>indrajeetbhujbal0@gmail.com</li>
        </ul>
      </div>
      {/*----------Copy-right -------- */}

      
      </div>
      <div>
        <hr />
        <p className='text-gray-600 text-center py-5 text-sm'>Copyright Precripto 2025@- All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
