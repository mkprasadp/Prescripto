import React from 'react'
import { assets, specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenue = () => {
  return (
    <div id='speciality' className=' flex flex-col items-center gap-4 py-16 text-gray-800'>
      <h1 className='text-3xl font-medium'>Find by Speciality</h1>
      <p className='w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, 
      schedule your appointment hassel-free</p>
      <div className='flex w-full overflow-scroll sm:justify-center gap-4 pt-5'>
        {specialityData.map((item,index)=>{
          return (
            <Link key={index} onClick={()=>scrollTo(0,0)}
            className='flex cursor-pointer items-center flex-col text-xm flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' to={`/doctors/${item.speciality}`}>
              <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
              <p>{item.speciality}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SpecialityMenue
