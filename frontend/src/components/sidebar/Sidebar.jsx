import { Context } from "@/context/UserContext";
import { fetchChatList } from "@/hooks/useFetchChats";
import FriendCard from "@/lib/FriendCard/FriendCard";
import { friend } from "@/lib/shared/UtilityFn";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";

const Sidebar = () => {
  const { activeUser, selectedChat } = useContext(Context);
  const { data: chatList, refetch } = useQuery({
    queryKey: ["chatList"],
    queryFn: () => fetchChatList({ activeUser }),
  });
  useEffect(()=>{
    refetch()
  }, [selectedChat])

  return (
    <>
      {chatList?.length > 0 ? (
        chatList?.map((item) => {
          return (
            <FriendCard
              key={item._id}
              chatId={item._id}
              user={friend({ item, activeUser })}
              lastMsg={item.lastMsg}
            />
          );
        })
      ) : (
        <p>Add friend to enjoy Snappy!</p>
      )}
    </>
  );
};

export default React.memo(Sidebar);
