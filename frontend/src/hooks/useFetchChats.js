import axios from "axios";

export const fetchChatList = async ({activeUser}) => {
    const ENDPOINT = "https://mern-chat-app-6ml4.vercel.app/";
    const { data } = await axios.get(`${ENDPOINT}/api/chat`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser?.TOKEN}`,
      },
    });
    return data;
  };
