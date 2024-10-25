import { Bookmark, Chat, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, Event, WorkOutline, LineAxis } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import CloseFriends from './CloseFriends'
import { Users } from "../dummyData";
import { AuthContext } from "../context/AuthContext";
import axios from "axios"
import { Link } from  "react-router-dom";

const Sidebar = () => {

    const {user} = useContext(AuthContext)
    const [followings,setFollowings] = useState([]);

   useEffect(()=>{
      if(user){
        const getFollowings = async()=>{
            try {
                const following = await axios.get(`/users/friends/${user?._id}`);
                setFollowings(following.data);
            } catch (error) {
                alert("Something wrong occurred!")
            }
        }
        getFollowings();
      }
   },[user])

    return (
        <div className='flex-3 h-[calc(100vh-60px)] overflow-y-scroll sticky top-[60px]'>
            <div className='p-[20px]'>
                <ul className='p-0 m-0 ' >
                    <li className="flex items-center mb-[20px]">
                        <RssFeed className="mr-[15px]" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="flex items-center mb-[20px]">
                        <Chat className="mr-[15px]" />
                        <Link to="/messenger" className=' cursor-pointer'><span className="sidebarListItemText">Chats</span></Link>
                    </li>
                    <li className="flex items-center mb-[20px]">
                        <PlayCircleFilledOutlined className="mr-[15px]" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="flex items-center mb-[20px]">
                        <Group className="mr-[15px]" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="flex items-center mb-[20px]">
                        <Bookmark className="mr-[15px]" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="flex items-center mb-[20px]">
                        <HelpOutline className="mr-[15px]" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="flex items-center mb-[20px]">
                        <WorkOutline className="mr-[15px]" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="flex items-center mb-[20px]">
                        <Event className="mr-[15px]" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="flex items-center mb-[20px]">
                        <School className="mr-[15px]" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <button className='w-[150px] border-none bg-gray-400 p-[10px] rounded-[5px] font-bold'>
                    Show more
                </button>
                <hr className='my-[20px] mx-0' />
                <ul className='p-0 m-0'>
                    {followings.map((u) =>{
                        return <CloseFriends key={u._id} user={u} />
                    } )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
