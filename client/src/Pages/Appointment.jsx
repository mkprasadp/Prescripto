import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, getAllDoctors, backendUrl, token } =
    useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
  };
  
  useEffect(() => {
    fetchDocInfo();
  }, [docId,doctors]);
 
  const getavailableSlots = () => {
    setDocSlots([]);
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      const timeSlot = [];
      while (currentDate < endTime) {
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
      setDocSlots((prev) => [...prev, timeSlot]);
    }
  };
  console.log(docInfo)
 useEffect(() => {
   getavailableSlots()
  }, [docInfo]);
  const bookAppointment = async () => {
    if (!token) {
      
      toast.warn("Log in to book an Appointment");
      return navigate("/login");
    }
    try {
    const date = docSlots[slotIndex][0].datetime
    
    let day=date.getDate()
    let month= date.getMonth()+1
    let year= date.getFullYear()
    const slotDate=day +'_' + month + '_' + year
    console.log(slotDate)

    const {data}= await axios.post(backendUrl + '/api/user/book-appointment' ,{docId,slotTime,slotDate},{headers:{token:token}})
    if(data.success){
      toast.success(data.message)
      getAllDoctors()
      navigate('/my-appointments')

    }
    else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    docInfo && (
      <div>
        {/* ---------------------Doc Details -------------------*/}
        <div className="flex flex-col sm:flex-row gap-4 ">
          <div>
            <img
              className="bg-primary w-full rounded-lg sm:max-w-72"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className=" flex-1 bg-white border border-gray-400 sm:mt-0 mt-[-80px] sm-mx-0 p-8 sm:mx-0 rounded-lg mx-2 py-7">
            {/*-------------------doc info-name,degree,exp------------- */}
            <p className="text-gray-900 text-center flex gap-2 font-medium text-2xl">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex gap-2 mt-1 items-center text-sm text-gray-600">
              <p>
                {docInfo.degree}-{docInfo.speciality}
              </p>
              <button className="px-2 border rounded-full text-xs  py-0.5">
                {docInfo.experience}
              </button>
            </div>
            {/*------------doc info--------------- */}
            <div>
              <p className="flex mt-3 items-center gap-1 text-sm font-medium text-gray-900">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className=" text-sm text-gray-500 mt-1 max-w-[700px]">
                {docInfo.about}
              </p>
            </div>
            <p className="flex text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {/* ------------------slots----------------- */}
        <div className=" sm:ml-72 sm:pl-4 text-gray-600 font-medium  mt-4">
          <p className=""> Booking Slots</p>
          <div className=" flex gap-3 mt-4 items-center w-full overflow-x-scroll">
            {docSlots.length &&
              docSlots.map((item, index) => {
                return (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`rounded-full cursor-pointer py-6  min-w-16 text-center ${
                      slotIndex === index
                        ? "bg-primary text-white "
                        : " border border-gray-300"
                    }`}
                    key={index}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>

                    <p> {item[0] && item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>
          <div className=" flex gap-3 items-center w-full overflow-x-scroll  mt-4">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => {
                return (
                  <p
                    onClick={() => setSlotTime(item.time)}
                    key={index}
                    className={`text-sm px-5 py-2 rounded-full  font-light flex flex-shrink-0 cursor-pointer ${
                      item.time === slotTime
                        ? " bg-primary text-white"
                        : "text-gray-600 border border-gray-300"
                    }`}
                  >
                    {item.time.toLowerCase()}
                  </p>
                );
              })}
          </div>
          <button onClick={bookAppointment} className="py-3 px-14 bg-primary text-white font-medium rounded-full mt-4  ">
            Book an appointment
          </button>
        </div>
        {/*------------related doctors-------------- */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
