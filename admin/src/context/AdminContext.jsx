import { createContext, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setaToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [adminAppointments,setAdminAppointments]=useState([])
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [dashData,setDashData]=useState(false)

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        console.log(data.doctors);
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
         {docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAdminAppointments= async ( )=>{
    try {
      const {data}= await axios.get( backendUrl + '/api/admin/admin-appointments' , {headers:{atoken:aToken}})
      if(data.success){
        setAdminAppointments(data.appointments)
        toast.success(data.message)
        console.log(data.appointments)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }
   const cancleAppointment= async (appointmentId )=>{
      try {
      
        const {data}= await axios.post( backendUrl + '/api/admin/cancle-appointment' , {appointmentId}, {headers:{atoken:aToken}} )
        if(data.success){
          toast.success(data.message)
          getAdminAppointments()
        }
        else{
          toast.error(data.message)
        }
        
      } catch (error) {
        toast.error(error.message)
      }
    }
  const getDashBordData= async( )=>{
    try {

      const {data}= await axios.get( backendUrl + '/api/admin/dashbord' ,{headers:{atoken:aToken}})
      if (data.success){
        console.log(data.dashBordData)
        setDashData(data.dashBordData)
      }
      else{
        toast.warn('Something went wrong')
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }
  const value = {
    aToken,
    setaToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    getAdminAppointments,
    adminAppointments,setAdminAppointments,cancleAppointment,
    dashData,setDashData,getDashBordData
    
    
  };

 
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
