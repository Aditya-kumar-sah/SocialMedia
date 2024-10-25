import React from 'react'
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import Rightbar from "../components/Rightbar"
import Topbar from '../components/Topbar'
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Profile = () => {

    
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);


    return (
        <>
            <Topbar />
            <div className='flex'>
                <Sidebar />
                <div className='flex-9'>
                    <div className='profilerighttop'>
                        <div className='h-[320px] relative'>
                            <img className='w-[100%] h-[250px] object-cover'  src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                } />
                            <img className='w-[150px] h-[150px] border-[3px] border-white rounded-[50%] object-cover absolute left-0 right-0 m-auto top-[150px]' src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                } />
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                          <h4 className='text-[24px]'>{user.username}</h4>
                          <span className='text-gray-500'>{user.desc}</span>
                        </div>
                    </div>
                    <div className='flex'>
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
