import React, { useContext, useEffect, useState } from "react";
// import "./Home.css";

import ChatArea from "../../components/ChatArea/ChatArea.jsx";
import { Context } from "../../context/UserContext.jsx";

import Sidebar from "@/components/sidebar/Sidebar";

const Home = () => {
  const { selectedChat } = useContext(Context);
  return (
    <section className="h-[calc(100%-71.94px)] w-full rounded-lg flex  gap-2">
      <Sidebar />
      {selectedChat ? (
        <ChatArea />
      ) : (
        <p className="bg-yellow-50 w-full h-full rounded-lg overflow-hidden text-center  font-mono text-2xl">
          Click on any chat!
        </p>
      )}
    </section>
  );
};

export default Home;
