import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [state, setState] = useState("Admin");
  const { setaToken, backendUrl } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        console.log(backendUrl);
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          console.log(data.token);
          setaToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandle}
      className=" min-h-[80vh] flex items-center justify-center"
    >
      <div className=" flex flex-col m-auto p-8  gap-3  items-start  min-w-[340px] sm:min-w-96 border rounded-xl text-gray-700 text-am shadow-lg ">
        <p
          className=" text-2xl
         font-semibold m-auto "
        >
          {" "}
          <span className=" text-primary">{state}</span> Login
        </p>
        <div className=" w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              state === "Admin" ? "admin@gmail.com" : "doctor@gmail.com"
            }
            className="border border-gray-200 rounded w-full p-2 mt-1"
            type="text"
          />
        </div>
        <div className=" w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder={state === "Admin" ? "adminPassword" : "doctorPassword"}
            className="border border-gray-200 rounded w-full p-2 mt-1"
            type="text"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="cursor-pointer text-primary underline"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="underline text-primary cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
