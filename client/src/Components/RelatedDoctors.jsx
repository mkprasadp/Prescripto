import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({docId,speciality}) => {
  const {doctors} =useContext(AppContext)
  const [relDoc,setRelDoc]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    if(doctors.length > 0 && speciality){
      const doctorsData= doctors.filter(doc=>doc.speciality===speciality && doc._id !=docId)
     setRelDoc(doctorsData)
 
    }

  },[doctors,speciality,docId])
   
  return (
   <div className="flex w-full items-center gap-4 my-16 md:mx-10 text-gray-900 flex-col">
      <h1 className="text-3xl font-medium">Top Doctors</h1>
      <p className=" text-sm sm:w-1/3 text-center">
        Simply browse through our extensive list of trusted doctors
      </p>
      <div className=" w-full grid grid-cols-auto gap-4 pt-5 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => {
          return (
            <div
          onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}}
              key={index}
              className="border cursor-pointer overflow-hidden rounded-xl border-blue-200 hover:translate-y-[-10px] transition-all duration-500"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center text-sm text-center gap-2 text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-gray-700 text-sm">{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="mt-10 px-12 py-3 rounded-full bg-blue-100 text-gray-600">more</button>
    </div>
  )
}

export default RelatedDoctors
