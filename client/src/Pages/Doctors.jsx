import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const[ filterDoc,setFilterDoc]=useState([])
  const {doctors}=useContext(AppContext)
  const [showFilter ,setShowFilter]=useState(false)
  const navigate=useNavigate()
  const applyFilter=()=>{
    if(speciality){
        setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
    }
    else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])
  console.log(speciality);
  console.log(doctors)
  return (
    <div>
      <p className=" text-gray-600">Browse through the doctors specialist</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5 ">
        <button className={` px-3 py-1 rounded border text-sm transition-all duration-200 sm:hidden ${ showFilter ? 'bg-primary text-white':''}`} onClick={()=>setShowFilter(prev=>!prev)}>Filters</button>
        
        <div  className={`flex flex-col gap-4 text-sm text-gray-600 ${ showFilter ? 'flex':' hidden sm:flex'}` }>
          <ul className="flex flex-col gap-4">
            <li  onClick={()=> speciality==='General physician' ? navigate('/doctors'):navigate('/doctors/General physician')} className={`w-[94vw] py-1.5 pr-16 pl-3 border border-gray-300 ${ speciality==="General physician"?"bg-indigo-100 text-black":""} transition-all cursor-pointer  sm:w-auto rounded`}>General physician</li>
            <li onClick={()=> speciality==='Gynecologist' ? navigate('/doctors'):navigate('/doctors/Gynecologist')} className={`w-[94vw] py-1.5 pr-16 pl-3 border border-gray-300 transition-all ${ speciality==="Gynecologist"?"bg-indigo-100 text-black":""} cursor-pointer  sm:w-auto rounded`}>Gynecologist</li>
            <li onClick={()=> speciality==='Dermat0logist' ? navigate('/doctors'):navigate('/doctors/Dermatologist')} className={`w-[94vw] py-1.5 pr-16 pl-3 border border-gray-300 transition-all ${ speciality==="Dermatologist"?"bg-indigo-100 text-black":""} cursor-pointer  sm:w-auto rounded`}>Dermatologist</li>
            <li onClick={()=> speciality==='Pediatricians' ? navigate('/doctors'):navigate('/doctors/Pediatricians')} className={`w-[94vw] py-1.5 pr-16 pl-3 border border-gray-300 transition-all ${ speciality==="Pediatricians"?"bg-indigo-100 text-black":""} cursor-pointer  sm:w-auto rounded`}>Pediatricians</li>
            <li onClick={()=> speciality==='Neurologist' ? navigate('/doctors'):navigate('/doctors/Neurologist')} className={`w-[94vw] py-1.5 pr-16 pl-3 border border-gray-300 transition-all cursor-pointer ${ speciality==="Neurologist"?"bg-indigo-100 text-black":""} sm:w-auto rounded`}>Neurologist</li>
            <li onClick={()=> speciality==='Gastroenterologist' ? navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className={`w-[94vw] py-1.5 pr-16 pl-3 border border-gray-300 transition-all ${ speciality==="Gastroenterologist"?"bg-indigo-100 text-black":""} cursor-pointer  sm:w-auto rounded`}>Gastroenterologist</li>
          </ul>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6"> 
          {
            filterDoc.map((item, index) => {
          return (
            <div
            onClick={()=>navigate(`/appointment/${item._id}`)}
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
        })

          }

        </div>
      </div>
    </div>
  );
};

export default Doctors;
