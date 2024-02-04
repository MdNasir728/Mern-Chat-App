import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import profile from '../../assets/profile.webp'
const MessageCard = ({isMe, text, time }) => {
  return (
    <div className={`${isMe ? "justify-end" : "justify-start"} flex gap-2 m-2`}>
      <div className="flex justify-start  max-w-[75%] items-center gap-2">
        <Avatar className={`${isMe && "hidden"} w-6 h-6`}>
          <AvatarImage src={profile} />
          <AvatarFallback className="font-bold text-violet-800 border-cyan-900 border-2">
            S
          </AvatarFallback>
        </Avatar>
        <div
          className={`${
            isMe ? "bg-green-300 mr-1" : "bg-blue-200"
          }  rounded-lg px-2 pb-1 relative flex items-center`}
        >
          <span className="text-md font-[400] ">{text}</span>
          <span className="w-[2.1rem] h-2"></span>
          <span className="absolute bottom-0 right-1 text-[0.7rem] ">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
