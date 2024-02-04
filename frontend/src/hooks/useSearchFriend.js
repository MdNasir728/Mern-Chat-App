import axios from 'axios'

export const useSearchFriend = async ({ text, activeUser }) => {
    const ENDPOINT = "http://localhost:5000";

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