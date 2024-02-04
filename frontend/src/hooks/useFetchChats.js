import axios from "axios";

export const fetchChatList = async ({activeUser}) => {
    const ENDPOINT = "http://localhost:5000";
    const { data } = await axios.get(`${ENDPOINT}/api/chat`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser?.TOKEN}`,
      },
    });
    return data;
  };
