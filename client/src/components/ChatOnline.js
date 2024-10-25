import axios from "axios";
import { useEffect, useState } from "react";


export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="flex items-center font-medium cursor-pointer mt-[10px]" onClick={() => handleClick(o)}>
          <div className="relative mr-[10px]">
            <img
              className="w-[40px] h-[40px]  rounded-[50%] object-cover border-[1px] border-white"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="w-[10px] h-[10px] rounded-[50%] bg-green-400 absolute top-[2px] right-[2px]"></div>
          </div>
          <span className="hidden md:inline">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}