import React from 'react'
import { EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Share = () => {
     const { user } = useContext(AuthContext);
     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
     const desc = useRef();
     const [file, setFile] = useState(null);

     const submitHandler = async (e) => {
          e.preventDefault();
          const newPost = {
               userId: user._id,
               desc: desc.current.value,
          };
          if (file) {
               const data = new FormData();
               const fileName = Date.now() + file.name;
               data.append("name", fileName);
               data.append("file", file);
               newPost.img = fileName;
               console.log(newPost);
               try {
                    await axios.post("/upload", data);
               } catch (err) { }
          }
          try {
               await axios.post("/posts", newPost);
               window.location.reload();
          } catch (err) { }
     };

     return (
          <div className='w-[100%] h-[170px] rounded-[10px] shadow-md'>
               <div className='p-[10px]'>
                    <div className='flex items-center'>
                         <img className='w-[50px] h-[50px] rounded-[50%] object-cover mr-[10px]' src={
                              user.profilePicture
                                   ? PF + user.profilePicture
                                   : PF + "person/noAvatar.png"
                         } />
                         <input placeholder={"What's in your mind " + user.username + "?"} ref={desc} className=' border-none w-[80%] focus:outline-none' />
                    </div>
                    <hr className='m-[20px]' />
                    {file && (
                         <div className="pt-0 pb-[10px] px-[20px] relative">
                              <img className="w-[100%] object-cover" src={URL.createObjectURL(file)} alt="" />
                              <Cancel className="absolute top-0 right-[20px] cursor-pointer opacity-[0.7]" onClick={() => setFile(null)} />
                         </div>
                    )}
                    <form className="flex items-center justify-between" onSubmit={submitHandler}>
                         <div className="flex ml-[20px]">
                              <label htmlFor="file" className="flex items-center mr-[15px] cursor-pointer">
                                   <PermMedia htmlColor="tomato" className="text-[18px] mr-[3px]" />
                                   <span className="text-[14px] font-medium">Photo or Video</span>
                                   <input
                                        style={{ display: "none" }}
                                        type="file"
                                        id="file"
                                        accept=".png,.jpeg,.jpg"
                                        onChange={(e) => setFile(e.target.files[0])}
                                   />
                              </label>
                              <div className="flex items-center mr-[15px] cursor-pointer">
                                   <Label htmlColor="blue" className="text-[18px] mr-[3px]" />
                                   <span className="text-[14px] font-medium">Tag</span>
                              </div>
                              <div className="flex items-center mr-[15px] cursor-pointer">
                                   <Room htmlColor="green" className="text-[18px] mr-[3px]" />
                                   <span className="text-[14px] font-medium">Location</span>
                              </div>
                              <div className="flex items-center mr-[15px] cursor-pointer">
                                   <EmojiEmotions htmlColor="goldenrod" className="text-[18px] mr-[3px]" />
                                   <span className="text-[14px] font-medium">Feelings</span>
                              </div>
                         </div>
                         <button className=" border-none p-[7px] rounded-[5px]  bg-green-600 font-medium mr-[20px] cursor-pointer text-white" type="submit">
                              Share
                         </button>
                    </form>
               </div>
          </div>
     )
}

export default Share
