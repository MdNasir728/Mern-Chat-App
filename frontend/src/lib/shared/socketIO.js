import { useEffect, useRef } from "react";
import { io } from "socket.io-client";


export const socketIO = (setChatMessage, activeUser) => {
    const ENDPOINT = "http://localhost:5000";

  let socketRef = useRef();

  useEffect(() => {
    let newSocket = io(ENDPOINT);
    socketRef.current = newSocket;
    socketRef.current.on("connect", () => {
      socketRef.current.emit("setup", activeUser);
    });
    socketRef.current.on("receivedMessage", (message) => {
      setChatMessage((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
  return socketRef;
};

