import React from 'react'
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Post = ({ post }) => {

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likehandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  return (
    <div className='w-[100%] rounded-[10px] shadow-md my-[30px] mx-0'>
      <div className='p-[10px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to={`/profile/${user.username}`}>
              <img className='h-[32px] w-[32px] rounded-[50%] object-cover' src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              } />
            </Link>
            <span className='text-[15px] font-roboto font-medium my-0 mx-[10px]'>{user.username}</span>
            <span className='text-[12px]'>{format(post.createdAt)}</span>
          </div>
          <div className='posttopright'>
            <MoreVert />
          </div>
        </div>
        <div className='my-[20px] mx-0'>
          <span className='postText'>{post?.desc}</span>
          <img className='mt-[20px] w-[100%] max-h-[500px] object-contain' src={PF + post.img} />
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <img className='w-[24px] h-[24px] mr-[5px] cursor-pointer' onClick={likehandler} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBhxzWN0yB9ve8_7EVHdMXjEBlxMLCnCkQPw&s' />
            <img className='w-[22px] h-[22px] mr-[5px] cursor-pointer' onClick={likehandler} src='https://static-00.iconduck.com/assets.00/like-icon-512x418-geumcm5m.png' />
            <span className='text-[15px]'>{like} people liked</span>
          </div>
          <div className='postbottomright'>
            <span className='cursor-pointer text-[15px]'>{post.comment} comment</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
