import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';

const Appointment = () => {
  const {docId} = useParams();
  const {doctors,currence} = useContext(AppContext)

  const [docInfo,SetDocInfo] = useState(null)
  const [docSlots,SetdocSlots] = useState([]);
  const [Slotindex,SetSlotIndex] = useState(0);
  const [slotTime,SetSlotTime] = useState('')
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async()=>{
    const docInfo = doctors.find(doc=> doc._id === docId);
    SetDocInfo(docInfo);
  }

  const getAvaliableSlots = async()=>{
    SetdocSlots([])
    
    let today = new Date();

    for(let i=0; i<7; i++){
      let currentDate = new Date();
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate()+1);
      endTime.setHours(21,0,0,0);

      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10);
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0);
      }
      else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      while(currentDate<endTime){
        let formattedtime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlot.push({
          datetime: new Date(currentDate),
          time: formattedtime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      SetdocSlots((prev) => ([...prev, timeSlot]));
    }
  }

  useEffect(()=>{ 
    fetchDocInfo();
  },[doctors,docId]);

  useEffect(()=>{
    getAvaliableSlots();
  },[docInfo])

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4 '>
        {/* ---------------------Doc Details -------------------*/}
        <div>
          <img src={docInfo.image} alt="" className='bg-indigo-500 w-full rounded-lg sm:max-w-72'/>
        </div>
        {/*-------------------doc info-name,degree,exp------------- */}
        <div className='flex-1 bg-white border border-gray-400 sm:mt-0 mt-[-80px] sm-mx-0 p-8 sm:mx-0 rounded-lg mx-2 py-7'>
          <p className='text-gray-900 text-center flex gap-2 font-medium text-2xl'>{docInfo.name} 
            <img src={assets.verified_icon} alt=""  className="w-5"/>
           </p>
          <div className='flex gap-2 mt-1 items-center text-sm text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="px-2 border rounded-full text-xs  py-0.5">{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About 
              <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 mt-1 max-w-[700px]'>{docInfo.about}</p>
          </div>
          <p className='flex text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{currence}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ---------------------Slots Section------------------ */}
      <div className='sm:ml-72 sm:pl-4 text-gray-600 font-medium  mt-4'>
        <p>Booking Slots</p>
        <div>
          {docSlots.length && docSlots.map((item,index)=>(
            <div key={index}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDate()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Appointment
