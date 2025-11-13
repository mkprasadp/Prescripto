import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'; 

const MyAppointments = () => {
  const {doctors} = useContext(AppContext);
  return (
    <div>
      <p className='pb-3 mt-12 font-medium border-b text-zinc-700'>My Appointment</p>
      <div>
        {doctors.slice(0,3).map((items,index)=>(
          <div key={index} className='border-b grid grid-cols-[1fr_2fr]  sm:flex gap-4 py-2 sm:gap-6'>
            <div className=''>
              <img src={items.image} alt="" className='w-32 bg-indigo-500'/>
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{items.name}</p>
              <p>{items.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{items.address.line1}</p>
              <p className='text-xs'>{items.address.line2}</p>
              <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>23, June, 2025 | 10:30</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border 
              rounded cursor-pointer hover:bg-indigo-500 hover:text-white transition-all duration-300'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border 
              rounded cursor-pointer hover:bg-indigo-500 hover:text-white transition-all duration-300'>Cancel Appointment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
