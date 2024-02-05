import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../../lib/ChatAreaTop/Topbar.jsx";
import MessageCard from "../../lib/MessageCard/MessageCard.jsx";
import { IoIosSend } from "react-icons/io";
import { Context } from "../../context/UserContext.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import {
  checkIsMe,
  formatTimeFromISOString,
  scrollToBottom,
} from "@/lib/shared/UtilityFn.js";
import { useGetChatMessage } from "@/hooks/useGetChatMessage.js";
import { onSuccess, useSendMessage } from "@/hooks/useSendMessage.js";
import { socketIO } from "@/lib/shared/socketIO.js";

const ChatArea = () => {
  const [chatMessage, setChatMessage] = useState([]);
  const { activeUser, selectedChat } = useContext(Context);

  const containerRef = useRef(null);
  const inputMsgRef = useRef("");
  const socketRef = socketIO(setChatMessage, activeUser);

  //fetching chatMsg on initial load
  const { data, isSuccess: querySuccess } = useQuery({
    queryKey: ["chatMessage", selectedChat?._id],
    queryFn: () => useGetChatMessage(selectedChat, activeUser),
  });
  //update on new msg send
  const mutation = useMutation({
    mutationFn: useSendMessage,
    onSuccess: (data) => onSuccess({ inputMsgRef, socketRef, data }),
  });

  const onSendMessage = (e) => {
    e.preventDefault();
    const data = {
      text: inputMsgRef.current.value,
      selectedChat,
      activeUser,
    };
    mutation.mutate(data);
  };

  useEffect(() => {
    if (querySuccess) {
      setChatMessage(data);
      socketRef.current.emit("join chat", selectedChat._id);
    }
  }, [querySuccess, selectedChat]);

  useEffect(() => {
    scrollToBottom(containerRef);
  }, [chatMessage]); // Scroll when messages change

  return selectedChat ? (
    <>
      <Topbar />
      <section
        ref={containerRef}
        className="bg-zinc-100 overflow-scroll h-[calc(100%-8rem)]"
      >
        {chatMessage?.length > 0 ? (
          chatMessage?.map((msg) => {
            return (
              <MessageCard
                key={msg._id}
                isMe={checkIsMe(msg, activeUser)}
                text={msg.text}
                time={formatTimeFromISOString(msg.createdAt)}
              />
            );
          })
        ) : (
          <div className="h-full flex justify-center items-center">
            <p className="text-2xl">Send your first message!!</p>
          </div>
        )}
      </section>
      <section className="bg-[#82f0e7] flex justify-between items-center p-3 h-16 gap-2 absolute bottom-0 w-full">
        <Input
          className="border-2 border-slate-900"
          type="text"
          placeholder="Type here..."
          ref={inputMsgRef}
          onKeyUp={(e) => e.key === "Enter" && onSendMessage(e)}
        />
        <Button className="bg-white rounded-full hover:bg-slate-300">
          <IoIosSend
            cursor={"pointer"}
            size={"1.8rem"}
            onClick={(e) => onSendMessage(e)}
          />
        </Button>
      </section>
    </>
  ) : (
    <p className="bg-yellow-50 max-sm:w-full w-full h-full rounded-lg overflow-hidden relative text-center  font-mono text-2xl">
      Click on any chat!
    </p>
  );
};

export default ChatArea;
