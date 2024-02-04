
export const checkIsMe = (msg, user) => msg?.sender === user._id;

export const friend = ({item, activeUser}) =>
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

export const logOut = ({setActiveUser, navigate, setSelectedChat}) => {
  setSelectedChat()
  setActiveUser();
  localStorage.clear();
  navigate("/login");
};