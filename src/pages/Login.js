import React from 'react'
import { useContext, useRef } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

const Login = () => {

  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
          <form className='h-[300px] p-[20px] bg-white rounded-[10px] flex flex-col  justify-between'>
            <input placeholder='Email' type='email' required ref={email} className='h-[50px] rounded-[10px] border-[1px] border-gray-500 text-[18px] pl-[20px] focus:outline-none' />
            <input placeholder='Password' type='password' minLength="6" required ref={password} className='h-[50px] rounded-[10px] border-[1px] border-gray-500 text-[18px] pl-[20px] focus:outline-none' />
            <button type="submit" disabled={isFetching} className=' h-[50px] border-none rounded-[10px] bg-blue-600 text-white font-bold cursor-pointer'>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className=' text-center text-blue-700'>Forgot Password?</span>
            <button className='h-[50px] border-none rounded-[10px] bg-green-600 text-white font-bold cursor-pointer'>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
