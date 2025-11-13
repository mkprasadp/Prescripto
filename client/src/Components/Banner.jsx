import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className="flex bg-indigo-500 px-6 sm:px-10 md:px-14 lg:px-12  my-20 md:mx-10 rounded-lg">
      {/*left side----*/}
      <div className="flex-1 py-8 sm:py-10 md:py-14 lg:py-24 lg:pl-5">
        <div className="text-white font-semibold  text-xl sm:text-2xl md:text-3xl lg:text-5xl" >
          <p >Book Appointment</p>
          <p className="mt-4">with 100+ tested doctors </p>
        </div>
        <button  className="bg-white cursor-pointer text-sm text-gray-700 hover:scale-105 transition-all duration-300 px-8 py-3 rounded-full sm:text-base mt-6"
         onClick={()=>{navigate('/login');scrollTo(0,0)}}>
          Create account
        </button>
      </div>
      {/*--------Right Side ------ */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img  className=" w-full absolute bottom-0 right-0  max-w-md "src={assets.appointment_img} alt="" />
      </div>
    </div>
  );
};

export default Banner;
