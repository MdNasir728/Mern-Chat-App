import { friend } from "@/lib/shared/UtilityFn";
import axios from "axios";

export const useCreateNewChat = async ({
  userId,
  activeUser,
  setInputText,
  setSelectedChat,
}) => {
  setInputText("");
  const { data } = await axios.post(
    `http://localhost:5000/api/chat`,
    { friendId: userId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser?.TOKEN}`,
      },
    }
  );
  const chatData = { _id: data._id, user: friend(data) };
  setSelectedChat(chatData);

  return data;
};
// export const onSuccess = ({ navigate, data, setSelectedChat, queryClient }) => {
//   queryClient.invalidateQuery({ queryKey: ["chatList"] });
//   const chatData = { _id: data._id, user: friend(data) };
//   setSelectedChat(chatData);
//   // Store chatData as a string in local storage
//   localStorage.setItem("Chat", JSON.stringify(chatData));
//   navigate(`/chats/${data._id}`);
// };
