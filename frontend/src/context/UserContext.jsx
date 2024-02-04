import React, { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const UserContext = ({ children }) => {
  const [activeUser, setActiveUser] = useState();
  const [selectedChat, setSelectedChat] = useState({ _id: "", user: {} });
  const [toggleModalOpen, setToggleModalOpen] = useState(false);
  console.log(selectedChat);

  useEffect(() => {
    const user = localStorage.getItem("User");
    const chat = localStorage.getItem("Chat");
    setActiveUser(JSON.parse(user));
    setSelectedChat(JSON.parse(chat));
  }, []);

  return (
    <Context.Provider
      value={{
        activeUser,
        setActiveUser,
        selectedChat,
        setSelectedChat,
        toggleModalOpen,
        setToggleModalOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};
