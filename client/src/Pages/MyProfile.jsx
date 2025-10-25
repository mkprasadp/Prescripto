import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userData,setuserData] = useState({
    name:"John Doe",
    image:assets.profile_pic,
    email:"example@gmail.com",
    phone:"123-456-7890",
    address:{
      line1:"123 Main St",
      line2:"Apt 4B",
    },
    gender:"Male",
    dob:"1990-01-01"
  })

  const [isEdit,setisEdit] = useState(false);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm"> 
      <img src={userData.image} alt="" className='w-36 rounded'/>
      {isEdit?
      <input type='text' onChange={(e)=>setuserData(prev=>({...prev,name:e.target.value}))} value={userData.name}
      className='font-medium text-3xl mt-4 max-w-60 bg-gray-50'/>
      :<p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className=" bg-zinc-400 h-[1px] border-none"/>
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='gap-y-2.5 mt-3 text-neutral-700 grid grid-cols-[1fr_3fr]'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {isEdit?
          <input type='text' className='bg-gray-500 max-w-52'
          onChange={(e)=>setuserData(prev=>({...prev,name:e.target.value}))} value={userData.phone}/>
          :<p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {isEdit?
          <p>
            <input className='bg-gray-50' onChange={(e)=>setuserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} type='text' value={userData.address.line1}/>
            <br />
            <input className='bg-gray-50' type='text' onChange={(e)=>setuserData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={userData.address.line2}/>
          </p>
          :
          <p className='text-gray-500'>
            {userData.address.line1}
            <br />
            {userData.address.line2}
          </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='gap-y-2.5 mt-3 text-neutral-700 grid grid-cols-[1fr_3fr]'>
          <p className='font-medium'>Gender:</p>
          {isEdit?
          <select className='max-w-20 bg-gray-100' onChange={(e)=>setuserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender}>
            <option value="Male">Male</option>
            <option value="Famale">FeMale</option>
          </select>
          :<p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>DOB:</p>
          {isEdit?
          <input type='date' className='max-w-28 bg-gray-100' onChange={(e)=>setuserData(prev=>({...prev,dob:e.target.value}))} value={userData.dob}/>
          :<p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {isEdit?
        <button className='border border-indigo-500 cursor-pointer px-8 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition-all' 
          onClick={()=>setisEdit(false)}>Save Information</button>
        :<button className='border border-indigo-500 cursor-pointer px-8 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition-all' 
          onClick={()=>setisEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
