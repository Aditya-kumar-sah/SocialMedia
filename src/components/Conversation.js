import axios from "axios";
import { useEffect, useState } from "react";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="flex items-center p-[10px] cursor-pointer mt-[20px] hover:bg-[rgb(245, 243, 243)]">
      <img
        className="w-[40px] h-[40px] rounded-[50%] object-cover mr-[20px] "
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="font-medium hidden md:inline">{user?.username}</span>
    </div>
  );
}