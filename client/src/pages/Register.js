import React from 'react'
import axios from "axios";
import { useRef } from "react";
import {  useNavigate } from "react-router";
import { Link } from 'react-router-dom';

const Register = () => {

  
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className='w-[100vw] h-[100vh] bg-gray-300 flex items-center justify-center'>
      <div className='w-[70%] h-[70%] flex'>
            <div className='flex-1 flex flex-col justify-center'>
                <h3 className='text-[50px]  font-semibold text-blue-600 mb-[10px]'>SyncUp</h3>
                <span className='text-[24px]'>
                    Connect with friends and the world around you on SyncUp
                </span>
            </div>
            <div className='flex-1 flex flex-col justify-center'>
                <form onSubmit={handleClick} className='h-[400px] p-[20px] bg-white rounded-[10px] flex flex-col  justify-between'>
                    <input placeholder='Email' ref={email} required type='email' className='h-[50px] rounded-[10px] border-[1px] border-gray-500 text-[18px] pl-[20px] focus:outline-none'/>
                    <input placeholder='Username'  ref={username} required className='h-[50px] rounded-[10px] border-[1px] border-gray-500 text-[18px] pl-[20px] focus:outline-none'/>
                    <input placeholder='Password' ref={password} type='password' required  minLength="6" className='h-[50px] rounded-[10px] border-[1px] border-gray-500 text-[18px] pl-[20px] focus:outline-none'/>
                    <input placeholder='Password Again' ref={passwordAgain} required type='password' className='h-[50px] rounded-[10px] border-[1px] border-gray-500 text-[18px] pl-[20px] focus:outline-none'/>
                    <button className=' h-[50px] border-none rounded-[10px] bg-blue-600 text-white font-bold cursor-pointer' type="submit">Sign Up</button>
                    <Link to="/login"><button className='h-[50px] border-none rounded-[10px] bg-green-600 text-white font-bold cursor-pointer'>Log into Account</button></Link>
                </form>
            </div>
      </div>
    </div>
  )
}

export default Register
