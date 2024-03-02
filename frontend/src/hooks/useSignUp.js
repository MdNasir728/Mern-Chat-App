import axios from "axios";

export const mutationFn = async ({ user, action }) => {
  const response = await axios.post(
    `https://mern-chat-app-6ml4.vercel.app/api/user/${action}`,
    {
      ...user,
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const onSuccess = ({ data, setActiveUser, navigate }) => {
  localStorage.setItem("User", JSON.stringify(data));
  setActiveUser(data);
  navigate("/chats");
};
