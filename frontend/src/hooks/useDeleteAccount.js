import axios from "axios";

export const useDeleteAccount = async (activeUser) => {
  const { data } = await axios.delete(
    `https://mern-chat-app-6ml4.vercel.app//api/user/${activeUser?._id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser?.TOKEN}`,
      },
    }
  );
  return data
};
export const onSuccess = ({ data, setActiveUser, navigate }) => {
    localStorage.clear();
    setActiveUser();
    navigate("/signup");
};
