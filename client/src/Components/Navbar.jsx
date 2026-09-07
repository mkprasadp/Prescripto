import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
const Navbar = () => {
  const navigate = useNavigate();
  const [showMenue, setShowMenue] = useState(false);
  const {token,setToken,userData} =useContext(AppContext)
  const logout=()=>{
    setToken(false)
    localStorage.removeItem('token')
  }
  return (
    <div className="flex items-center justify-between text-sm py-4  border-b border-gray-400 mb-5">
      <img
        src={assets.logo}
        className="w-44 cursor-pointer"
        onClick={() => navigate("/")}
        alt=""
      />
      <ul className="hidden  items-start gap-5 md:flex font-medium">
        <NavLink to={"/"}>
          <li className=" py-1">Home</li>
          <hr className=" border-none outline-none h-0.5 bg-primary m-auto w-3/5 hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className=" py-1">All Doctors</li>
          <hr className=" border-none outline-none h-0.5 bg-primary m-auto w-3/5 hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className=" py-1">About</li>
          <hr className=" border-none outline-none h-0.5 bg-primary m-auto w-3/5 hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className=" py-1">Contact</li>
          <hr className=" border-none outline-none h-0.5 bg-primary m-auto w-3/5 hidden" />
        </NavLink>
      </ul>
      <div className="items-center gap-4 flex">
        {token && userData? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium hidden text-gray-600 z-20 group-hover:block">
              <div className=" min-w-48 rouded flex flex-col bg-stone-100 gap-4 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary py-3 px-8 rounded-full text-white font-light hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          src={assets.menu_icon}
          onClick={() => setShowMenue(true)}
          className="md:hidden w-6"
          alt=""
        />
        {/*--------mobile mnu ----------- */}
        <div
          className={` ${
            showMenue ? " fixed w-full" : "h-0 w-0"
          } md:hidden top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className=" flex  items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              onClick={() => setShowMenue(false)}
              className="w-7"
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col text-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink  onClick={() => setShowMenue(false)} to={"/"}>
              {" "}
              <p className="px-4 py-2 rounded inline-block">Home</p>{" "}
            </NavLink>
            <NavLink onClick={() => setShowMenue(false)} to={"/doctors"}>
              <p className="px-4 py-2 rounded inline-block">All Doctors</p>{" "}
            </NavLink>

            <NavLink onClick={() => setShowMenue(false)} to={"/about"}>
              <p className="px-4 py-2 rounded inline-block">About</p>{" "}
            </NavLink>

            <NavLink onClick={() => setShowMenue(false)} to={"/contact"}>
              <p className="px-4 py-2 rounded inline-block">Contact</p>{" "}
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
