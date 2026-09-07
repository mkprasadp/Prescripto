import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate= useNavigate()
  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "January",
    "February",
    "March",
    "Epril",
    "May",
    "June",
    "July",
    "Augast",
    "September",
    "October",
    "November",
    "December",
  ];
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[dateArray[1]] + " " + dateArray[2];
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/list-appointments",
        {
          headers: { token: token },
        }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancleAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancle-appointment",
        { appointmentId },
        { headers: { token: token } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAllAppointments();
    console.log(appointments);
  }, [token]);

  const verify = async (order_id) => {};

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment payment",
      decription: "Appointment payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-payment",
             response ,
            { headers: { token: token } }
          );
          if (data.success) {
            getAllAppointments()
            navigate('/my-appointments')
           
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token: token } }
      );
      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <p className=" pb-3 mt-12 font-medium border-b text-zinc-700">
        My Appointment
      </p>
      <div>
        {appointments.map((item, index) => {
          return (
            <div
              className="border-b grid grid-cols-[1fr_2fr]  sm:flex gap-4 py-2 sm:gap-6"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className=" flex-1 text-am text-gray-700">
                <p className=" text-zinc-700 font-semibold">
                  {" "}
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1"> Address:</p>
                <p className=" text-xs"> {item.docData.address.line1}</p>
                <p className=" text-xs">{item.docData.address.line2}</p>
                <p className=" text-xs mt-1 ">
                  {" "}
                  <span className="text-sm text-gray-700 font-medium">
                    Date & Time:
                  </span>{" "}
                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div></div>
              <div className=" flex flex-col gap-2 justify-end ">
                { !item.canclled && item.payment && <button className="sm:min-w-48 py-2 border bg-blue-50 rounded-full text-zinc-600 text-sm text-center ">Paid</button>}
                {!item.canclled && !item.payment && 
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className="sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-500 rounded-full text-zinc-500 text-sm text-center "
                  >
                    Pay Online
                  </button>
                }
                {!item.canclled && (
                  <button
                    onClick={() => cancleAppointment(item._id)}
                    className="sm:min-w-48 py-2 border hover:bg-red-700 hover:text-white transition-all duration-500 rounded-full text-zinc-500 text-sm text-center "
                  >
                    Cancel Appointment
                  </button>
                )}
                {item.canclled && (
                  <button className="sm:min-w-48 py-2 border  border-gray-200 text-rose-600  rounded-full  text-sm text-center ">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
