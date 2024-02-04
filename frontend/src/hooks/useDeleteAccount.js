import axios from "axios";

export const handleDeleteAccount = async (activeUser) => {
  const { data } = await axios.delete(
    `http://localhost:5000/api/user/${activeUser?._id}`,
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
  if (data) {
    localStorage.clear();
    setActiveUser();
    navigate("/signup");
  }
};
