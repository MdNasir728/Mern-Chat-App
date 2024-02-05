// checking is my msg or not
export const checkIsMe = (msg, user) => msg?.sender === user._id;
// checking is me or not
export const isMe = (user, activeUser) => {
  if (user?._id === activeUser._id) {
    return true;
  } else {
    return false;
  }
};

export const friend = ({ item, activeUser }) =>
  item?.users?.find((usr) => usr._id !== activeUser?._id);

export const formatTimeFromISOString = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes}`;
};

export const scrollToBottom = (containerRef) => {
  if (containerRef.current) {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }
};

export const logOut = ({ setActiveUser, navigate, setSelectedChat }) => {
  setSelectedChat();
  setActiveUser();
  localStorage.clear();
  navigate("/login");
};
