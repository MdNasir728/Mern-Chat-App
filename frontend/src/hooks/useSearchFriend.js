import axios from 'axios'

export const useSearchFriend = async ({ text, activeUser }) => {
    const ENDPOINT = "https://mern-chat-app-6ml4.vercel.app/";

    const { data } = await axios.post(
      `${ENDPOINT}/api/user`,
      { text },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeUser?.TOKEN}`,
        },
      }
    );
    return data;
  };