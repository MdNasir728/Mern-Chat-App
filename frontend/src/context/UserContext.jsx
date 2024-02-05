import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Context = createContext();

export const UserContext = ({ children }) => {
  const [activeUser, setActiveUser] = useState();
  const [selectedChat, setSelectedChat] = useState({ _id: "", user: {} });

  const param = useParams();
  useEffect(() => {
    const user = localStorage.getItem("User");
    const chat = localStorage.getItem("Chat");
    if (param?.chatId) {
      setSelectedChat(JSON.parse(chat));
    } else {
      localStorage.removeItem('Chat')
      setSelectedChat();
    }
    setActiveUser(JSON.parse(user));
  }, []);

  return (
    <Context.Provider
      value={{
        activeUser,
        setActiveUser,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};
