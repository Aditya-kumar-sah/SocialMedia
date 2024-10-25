import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={`flex flex-col mt-5 ${own ? "items-end" : ""}`}>
      <div className="flex items-center">
        <img
          className="w-8 h-8 rounded-full object-cover mr-2.5"
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className={`p-2.5 rounded-2xl max-w-xs ${
            own ? "bg-gray-200 text-black" : "bg-blue-600 text-white"
          }`}>{message.text}</p>
      </div>
      <div className="text-xs mt-2.5">{format(message.createdAt)}</div>
    </div>
  );
}