import axios from "axios";

export const useSendMessage = async ({ text, selectedChat, activeUser }) => {
  const ENDPOINT = "https://mern-chat-app-6ml4.vercel.app/";
  const { data } = await axios.post(
    `${ENDPOINT}/api/message/${selectedChat?._id}`,
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

export const onSuccess = ({ inputMsgRef, socketRef, data }) => {
  inputMsgRef.current.value = "";
  socketRef.current.emit("newMessage", data);
};
