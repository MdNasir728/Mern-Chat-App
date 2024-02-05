import React, { useContext, useEffect } from "react";

import ChatArea from "../../components/ChatArea/ChatArea.jsx";
import { Context } from "../../context/UserContext.jsx";

import Sidebar from "@/components/sidebar/Sidebar";
import { useParams } from "react-router-dom";

const Home = () => {
  const { setSelectedChat } = useContext(Context);
  const { chatId } = useParams();

  useEffect(() => {
    if (!chatId) {
      localStorage.removeItem("Chat");
      setSelectedChat();
    }
  });
  return (
    <section className="h-[calc(100%-71.94px)] w-full rounded-lg flex  gap-2">
      <div
        className={`${chatId && "max-sm:hidden"}
            bg-blue-200 w-2/5 max-md:w-1/2 max-sm:w-full rounded-lg overflow-y-scroll p-2`}
      >
        <Sidebar />
      </div>
      <div
        className={`
          ${!chatId && "max-sm:hidden"}
             flex flex-col bg-yellow-50 max-sm:w-full w-full h-full rounded-lg overflow-hidden relative`}
      >
        <ChatArea />
      </div>
    </section>
  );
};

export default Home;
