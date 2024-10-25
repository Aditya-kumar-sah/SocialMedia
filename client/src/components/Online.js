import { Link } from "react-router-dom";
import React from 'react'

const Online = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={`/profile/${user?.username}`}>
    <li className='flex items-center mb-[15px]'>
      <div className='mr-[10px] relative'>
        <img className='w-[40px] h-[40px] rounded-[50%] object-cover' src={PF + user.profilePicture} />
        <span className='w-[12px] h-[12px] rounded-[50%] bg-green-600 absolute top-[-2px] right-0 border-[2px] border-white'></span>
      </div>
      <span className='font-medium'>{user.username}</span>
    </li>
   </Link>
  )
}

export default Online
