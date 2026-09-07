import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setaToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setaToken("");
    aToken && localStorage.removeItem("aToken");
  };
  return (
    <div className=" flex justify-between border-b bg-white px-4 py-3 sm:px-10 items-center ">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border rounded-full px-2.5 py-0.5 border-gray-500 text-gray-500">
          {" "}
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className=" text-white bg-primary px-10 py-2 rounded-full text-sm"
      >
        Log out
      </button>
    </div>
  );
};

export default Navbar;
