import React, { useState } from "react";
import axios from 'axios'
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [state, setStete] = useState("Sign up");
  const [name, setNmae] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {backendUrl,token,setToken}=useContext(AppContext)
  const navigate=useNavigate()
  console.log(backendUrl)
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      if(state=== 'Sign up'){
        const {data}= await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(data.success){
          setToken(data.token)
          toast.success("Signed up Successfully")
          setEmail('')
          setPassword('')
          setNmae('')
        }
        else{
          toast.error("Something went wrong")
        }
      }
      else{
         const {data}= await axios.post(backendUrl + '/api/user/login',{email,password})
         
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
          toast.success("Login  Successfully")
        }
        else{
          toast.error("Something went wrong")
        }

      }
    } catch (error) {
      toast.error(error.message)
      
    }
    
  };
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form
      onSubmit={handleOnSubmit}
      className=" min-h-[80vh] flex  items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign up" ? "Create Account" : "Login"}
        </p>
        <p className="text-sm">
          Please {state === "Sign up" ? "sign up" : "login"} to book an
          appointment
        </p>
        {
          state=== 'Sign up' &&
        <div className="w-full">
          <p>Full name</p>
          <input
            className="border  border-[#DADADA] rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setNmae(e.target.value)}
            value={name}
          />
        </div>
        }
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
          {state === "Sign up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setStete("Login")}
              className="text-primary underline  cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setStete("Sign up")}
              className="text-primary underline cursor-pointer"
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
