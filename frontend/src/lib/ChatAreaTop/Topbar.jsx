import React, { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Context } from "../../context/UserContext.jsx";

import { ProfileModal } from "@/components/modals/ProfileModal.jsx";

const Topbar = () => {
  const { selectedChat } = useContext(Context);

  return (
    <div className="bg-[#70e4da] flex justify-between items-center p-3 h-16">
      <div className="flex flex-grow w-full">
        <ProfileModal user={selectedChat?.user} />
      </div>
      <div className="">
        <RxHamburgerMenu fontSize={"1.5rem"} cursor={"pointer"} />
      </div>
    </div>
  );
};

export default Topbar;
