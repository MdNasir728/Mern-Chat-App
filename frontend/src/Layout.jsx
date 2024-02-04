import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "./context/UserContext";

import SearchFrnd from "./components/modals/SearchFrnd";
import { Button } from "./components/ui/button";
import { IoMdLogOut } from "react-icons/io";
import { logOut } from "./lib/shared/UtilityFn";
import { ProfileModal } from "./components/modals/ProfileModal";

const Layout = () => {
  const { activeUser, setActiveUser , setSelectedChat} = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="h-[95vh] lg:w-[70vw] sm:w-[90vw] md:w-[80vw] relative flex flex-col rounded-lg overflow-hidden gap-1 ">
      <section className="w-full bg-blue-300 rounded-lg py-2 px-4 flex justify-between items-center  ">
        <div className="hover:bg-blue-200 rounded-lg delay-200">
          <ProfileModal user={activeUser} />
        </div>

        <h2 className="font-bold font-sans text-3xl text-cyan-900 ">SNAPPY</h2>
        <div className="flex items-center gap-2">
          <SearchFrnd />
          <Button
            className="bg-gray-300 hover:bg-red-400 flex items-center gap-1"
            onClick={() => logOut({ setActiveUser, navigate, setSelectedChat })}
          >
           <p className="max-sm:hidden">LOGOUT</p> <IoMdLogOut />
          </Button>
        </div>
      </section>

      <Outlet />
    </div>
  );
};

export default Layout;
