import axios from "axios";

export const useGetChatMessage = async (selectedChat, activeUser) => {
  const ENDPOINT = "https://mern-chat-app-6ml4.vercel.app/";

  if (!selectedChat._id) return;

  const { data } = await axios.get(
    `${ENDPOINT}/api/message/${selectedChat._id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser?.TOKEN}`,
      },
    }
  );
  return data;
};
