import { friend } from "@/lib/shared/UtilityFn";
import axios from "axios";

export const useCreateNewChat = async ({
  userId,
  activeUser,
  setInputText,
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
  return data;
};
export const onSuccess = ({ navigate, data, setSelectedChat, queryClient }) => {
  queryClient.invalidateQuery({ queryKey: ["chatList"] });
  const chatData = { _id: data._id, user: friend(data) };
  setSelectedChat(chatData);
  // Store chatData as a string in local storage
  localStorage.setItem("Chat", JSON.stringify(chatData));

  navigate(`/${data._id}`);
};
