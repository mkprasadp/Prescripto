import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import {toast} from 'react-toastify'
import axios from 'axios'
const AllAppointments = () => {
  const {
    adminAppointments,
    aToken,
    setAdminAppointments,
    getAdminAppointments,
   cancleAppointment
  } = useContext(AdminContext);
  const { calculateAge, convertDate, currencySymbol } = useContext(AppContext);
 

  useEffect(() => {
    getAdminAppointments();
  }, [aToken]);

  return (
    <div className=" w-full max-w-6xl mt-5">
      <p className=" mb-3 text-lg font-medium">All Appointments</p>
      <div className=" max-h-[80vh] border rounded min-h-[60vh] bg-white text-sm overflow-y-scroll">
        <div className=" hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b  grid-flow-col">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Doctor</p>
          <p>Fees </p>
          <p>Action</p>
        </div>
        {adminAppointments.map((item, index) => {
          return (
            <div
              className=" flex flex-wrap sm:grid max-sm:gap-2 sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] border-b text-gray-500 hover:bg-gray-100 justify-between items-center px-6 py-3 grid-flow-col"
              key={index}
            >
              <p className=" max-sm:hidden">{index + 1}</p>
              <div className=" flex items-center gap-2">
                <img
                  className="w-8 rounded-full "
                  src={item.userData.image}
                  alt=""
                />
                <p>{item.userData.name}</p>
              </div>
              <p className=" max-sm:hidden">
                {calculateAge(item.userData.dob)}
              </p>
              <p>
                {convertDate(item.slotDate)} , {item.slotTime}
              </p>
              <div className=" flex items-center gap-2">
                <img
                  className="w-8 rounded-full "
                  src={item.docData.image}
                  alt=""
                />
                <p>{item.docData.name}</p>
              </div>
              <p>
                {currencySymbol}
                {item.ammount}
              </p>
              {item.canclled ? (
                <p className=" text-red-400 test-xs font-medium">Canclled</p>
              ) : (
                <img
                  onClick={()=>cancleAppointment(item._id)}
                  className=" cursor-pointer w-10"
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAppointments;
