import React from 'react'
import {Chat, Person, Search,Notifications} from "@mui/icons-material"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='h-[60px] w-[100%] bg-blue-500 flex items-center sticky top-0 z-50'>
        <div className='flex-3 '>
        <Link to="/" style={{ textDecoration: "none" }}>
            <span className='text-[24px] ml-[20px] fonr-bold text-white cursor-pointer'>SyncUp</span>
        </Link>
        </div>
        <div className='flex-5 '>
            <div className='flex items-center gap-1 w-[100%] h-[30px] rounded-[30px] bg-white py-2 px-3'>
               <Search/>
               <input className=' w-[70%] border-none focus:outline-none' placeholder='Search for friends,post or videos'/>
            </div>
        </div>
        <div className='flex-4 flex items-center justify-around text-white '>
            <div className='mr-[10px] text-[14px] cursor-pointer'>
                <span>Homepage</span>
                <span>Timeline</span>
            </div>
            <div className='flex'>
                <div className='mr-[15px] cursor-pointer relative'>
                    <Person/>
                    <span className='w-[15px] h-[15px] bg-red-600 rounded-[50%] text-white absolute top-[-5px] right-[-5px] flex items-center justify-center text-[12px]'>1</span>
                </div>
                <div className='mr-[15px] cursor-pointer relative'>
                    <Chat/>
                    <span className='w-[15px] h-[15px] bg-red-600 rounded-[50%] text-white absolute top-[-5px] right-[-5px] flex items-center justify-center text-[12px]'>1</span>
                </div>
                <div className='mr-[15px] cursor-pointer relative'>
                    <Notifications/>
                    <span className='w-[15px] h-[15px] bg-red-600 rounded-[50%] text-white absolute top-[-5px] right-[-5px] flex items-center justify-center text-[12px]'>1</span>
                </div>
            </div>
            <Link to={`/profile/${user.username}`}>
            <img className='h-[32px] w-[32px] rounded-[50%] object-cover cursor-pointer'  src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }/>
            </Link>
        </div>
    </div>
  )
}

export default Topbar
