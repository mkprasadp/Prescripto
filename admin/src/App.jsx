import React from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes ,Route} from "react-router-dom";
import Dashbord from "./pages/Admin/Dashbord";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";

const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer></ToastContainer>
      <Navbar />
      <div className=" flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/admin-dashbord" element={<Dashbord></Dashbord>}></Route>
          <Route path="/all-apointments" element={<AllAppointments/>}></Route>
          <Route path="/add-doctor" element={<AddDoctor/>}></Route>

          <Route path="/doctors-list" element={<DoctorList/>}></Route>

        </Routes>
      </div>
    </div>
  ) : (
    <div className="">
      <Login></Login>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default App;
