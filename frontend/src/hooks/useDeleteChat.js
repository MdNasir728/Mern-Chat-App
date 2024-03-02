import axios from "axios";

export const useDeleteChat = async ({ activeUser, chatId }) => {
  const { data } = await axios.delete(
    `http://localhost:5000/api/chat/${chatId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser?.TOKEN}`,
      },
    }
  );
  return data;
};
export const onSuccess = ({ navigate,setSelectedChat }) => {
  setSelectedChat()
  localStorage.removeItem("Chat");
  navigate("/chats");
};
