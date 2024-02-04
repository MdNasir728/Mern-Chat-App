import { Context } from "@/context/UserContext";
import { fetchChatList } from "@/hooks/useFetchChats";
import FriendCard from "@/lib/FriendCard/FriendCard";
import { friend } from "@/lib/shared/UtilityFn";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { activeUser } = useContext(Context);
  const navigate = useNavigate();

  const { data: chatList, isLoading } = useQuery({
    queryKey: ["chatList"],
    queryFn: () => fetchChatList({ activeUser }),
  });

  // useEffect(() => {
  //   refetch;
  // }, [activeUser]);

  return (
    <div className="bg-blue-200 w-2/4 rounded-lg overflow-y-scroll p-2">
      {chatList?.length > 0 &&
        chatList?.map((item) => {
          return (
            <FriendCard
              key={item._id}
              chatId={item._id}
              user={friend({ item, activeUser })}
              lastMsg={item.lastMsg}
            />
          );
        })}
    </div>
  );
};

export default Sidebar;
