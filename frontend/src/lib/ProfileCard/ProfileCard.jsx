import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import profile from '../../assets/profile.webp'

const ProfileCard = ({ name, lastMsg }) => {
  return (
    <div className="flex rounded-lg items-center gap-2">
      <Avatar>
        <AvatarImage src={profile} />
        <AvatarFallback className="font-bold text-violet-800 border-cyan-900 border-2 text-xl">
          S
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center overflow-hidden ">
        <h1 className="font-bold text-voilet-500 mb-[-5px]">{name}</h1>
        {lastMsg && <p className="text-sm text-ellipsis text-nowrap overflow-hidden">{lastMsg}</p>}
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);
