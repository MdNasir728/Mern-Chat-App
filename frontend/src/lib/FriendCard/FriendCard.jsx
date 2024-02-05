import React, { useContext } from "react";
import { Context } from "../../context/UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard.jsx";

const FriendCard = ({ chatId, user, lastMsg }) => {
  const { setSelectedChat } = useContext(Context);
const navigate = useNavigate()
  

  const clickHandler = (e) => {
    e.preventDefault()
    const chatData = { _id: chatId, user };
    setSelectedChat(chatData);
    // Store chatData as a string in local storage
    localStorage.setItem("Chat", JSON.stringify(chatData));
    navigate(`/chats/${chatId}`)
  };

  return (
    <Link to={''} onClick={clickHandler} >
      <div className="rounded-lg border-slate-700 border-2 mb-1 p-1 hover:bg-cyan-700 delay-100 ">
        <ProfileCard name={user?.name} lastMsg={lastMsg} />
      </div>
    </Link>
  );
};

export default React.memo(FriendCard);
