import React, { useState } from 'react'

const Login = () => {

  const [state,setState] = useState('Sign Up');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const onsubmitHandler = (e)=>{
    e.preventDefault();
  }

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className="text-2xl font-semibold">{state === 'Sign Up'?"Create account":"Login"}</p>
        <p className="text-sm">Please {state === 'Sign Up'?"Sign up":"Login"} to book an appointment</p>
        {state === 'Sign Up' &&
          <div className="w-full">
            <p>Full Name</p>
            <input className="border border-[#DADADA] rounded w-full p-2 mt-1" placeholder='Full Name'
            type="text" onChange={(e)=>setName(e.target.value)} value={name} required/>
          </div>
        }
        <div className="w-full">
          <p>Email</p>
          <input className="border border-[#DADADA] rounded w-full p-2 mt-1" placeholder='Email'
          type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        </div>
        <div className="w-full">
          <p>Password</p>
          <input className="border border-[#DADADA] rounded w-full p-2 mt-1" placeholder='Password'
          type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
        </div>
        <button type='submit' className="bg-indigo-500 text-white w-full py-2 my-2 rounded-md text-base">
          {state === 'Sign Up'?"Create account":"Login"}</button>
        {state === 'Sign Up'?
          <p>Already have an account?
            <span onClick={()=>setState('Login')} className='text-indigo-500 underline cursor-pointer'>Login here</span>
          </p>:
          <p>Create an new Account?
            <span onClick={()=>setState('Sign Up')} className='text-indigo-500 underline cursor-pointer'>click here</span>
          </p>
        }
      </div>
    </form>
  )
}

export default Login
