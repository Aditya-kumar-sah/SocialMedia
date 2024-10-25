import React from 'react'
import Online from './Online'
import { useContext, useEffect, useState } from "react";
import { Users } from "../dummyData";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const Rightbar = ({ user }) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);


  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };



  const HomeRightbar = () => {
    return (
      <>
        <div className='flex items-center'>
          <img className='w-[40px] h-[40px] mr-[10px]' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzr1dq96jyTU1M0KtOAEYU2HDZM_dKEAKdIA&s' />
          <span className='text-[15px] font-small'><b>Pola Foster</b> and <b>3 other friends</b> have a birthday today</span>
        </div>
        <img className='w-[100%] rounded-[10px] my-[10px] mx-0' src='https://vicimediainc.com/wp-content/uploads/2020/04/Ad-Creative-6.jpg' />
        <h4 className='mb-[20px]'>Online friends</h4>
        <ul className='p-0 m-0'>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightBar = () => {
    return (
      <>
         {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className='text-[18px] font-small mb-[10px]'>User information title</h4>
        <div className='mb-[30px]'>
          <div className='mb-[10px]'>
            <span className='font-medium mr-[15px] text-gray-600'>City:</span>
            <span className=' font-light'>{user.city}</span>
          </div>
          <div className='rightbarinfoitem'>
            <span className='font-medium mr-[15px] text-gray-600'>From:</span>
            <span className=' font-light'>{user.from}</span>
          </div>
          <div className='rightbarinfoitem'>
            <span className='font-medium mr-[15px] text-gray-600'>Relationship:</span>
            <span className=' font-light'>
            {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className='rightbartitle'>User Friends</h4>
        <div className='flex flex-wrap justify-between'>
        {friends.map((friend) => (
        <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
          <div className='flex flex-col '>
            <img className='h-[100px] w-[100px] object-cover rounded-[5px] mb-[20px] cursor-pointer'  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  } />
            <span className='rightbarfollowiingname'>{friend.username}</span>
          </div>
          </Link>
        ))}
        </div>
      </>
    )
  }

  return (
    <div className='flex-4'>
      <div className='pt-[20px] pr-[20px] pb-0 pl-0'>
        {profile ? <ProfileRightBar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
