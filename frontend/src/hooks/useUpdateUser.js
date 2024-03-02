import axios from "axios";

export const mutationFn = async ({ user, activeUser }) => {
  const response = await axios.patch(
    `https://mern-chat-app-6ml4.vercel.app/api/user/${activeUser._id}`,
    { ...user },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeUser?.TOKEN}`,
      },
    }
  );
  return response.data;
};

export const onSuccess = ({ data, setActiveUser, toast }) => {
  if (data) {
    localStorage.setItem("User", JSON.stringify(data));
    setActiveUser(data);
    toast({
      title: data.name,
      description: data.message,
    });
  }
};
