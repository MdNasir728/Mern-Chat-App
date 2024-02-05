import { Context } from "@/context/UserContext";
import { fetchChatList } from "@/hooks/useFetchChats";
import FriendCard from "@/lib/FriendCard/FriendCard";
import { friend } from "@/lib/shared/UtilityFn";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";

const Sidebar = () => {
  const { activeUser } = useContext(Context);
  const { data: chatList } = useQuery({
    queryKey: ["chatList"],
    queryFn: () => fetchChatList({ activeUser }),
  });

  return (
    <>
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
    </>
  );
};

export default React.memo(Sidebar);
