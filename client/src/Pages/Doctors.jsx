import React from 'react'
import { doctors } from '../assets/assets'

const Doctors = () => {
  return (
    <div>
      <p>Browse through the doctors specialist</p>
      <div>
        <div>
          <p>General physician</p>
          <p>Gynecologist</p>
          <p>Dermatologist</p>
          <p>Pediatricians</p>
          <p>Neurologist</p>
          <p>Gastroenterologist</p>
        </div>
        <div>
           {doctors.map((doc,index)=>(
            <div key={index} className='flex'>
              <img src={doc.image} alt="" />
            </div>
           ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
