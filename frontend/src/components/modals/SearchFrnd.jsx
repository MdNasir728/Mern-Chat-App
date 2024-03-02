import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FaSearch } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchFriend } from "@/hooks/useSearchFriend";
import { Context } from "@/context/UserContext";
import ProfileCard from "@/lib/ProfileCard/ProfileCard";
import { useCreateNewChat } from "@/hooks/useCreateNewChat";
import { useNavigate } from "react-router-dom";
const SearchFrnd = () => {
  const [inputText, setInputText] = useState("");
  const { activeUser, setSelectedChat } = useContext(Context);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //for creating new chat
  const { mutate: mutation } = useMutation({
    mutationFn: useCreateNewChat,
    // onSuccess: (data) =>
    //   onSuccess({ navigate, data, setSelectedChat, queryClient }),
  });
  const createChatHandler = (userId) => {
    mutation({ userId, activeUser, setInputText,navigate, setSelectedChat });
  };

  // for searching new friend
  const { data, mutate } = useMutation({
    mutationFn: useSearchFriend,
  });
  useEffect(() => {
    if (inputText.length > 0) {
      mutate({ text: inputText, activeUser });
    }
  }, [inputText]);
  return (
    <Dialog>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipContent className="bg-slate-800">
              <h4 className=" text-white font-semibold">Search Friend</h4>
            </TooltipContent>
            <TooltipTrigger className="hover:bg-blue-200 delay-200 p-2 rounded">
              <FaSearch size={"1.5rem"} cursor={"pointer"} />
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>

      <DialogContent className=" bg-slate-300 h-[90vh] sm:max-w-[525px] flex flex-col justify-start">
        <DialogHeader>
          <DialogTitle>Search friend.</DialogTitle>
        </DialogHeader>
        <Input
          name="name"
          type="text"
          placeholder="Type name or email... "
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="w-full overflow-y-scroll bg-slate-100 p-2 rounded-lg">
          {data?.length > 0
            ? data?.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-200 rounded-lg flex flex-col p-2 mb-2 cursor-pointer"
                  onClick={() => createChatHandler(item._id)}
                >
                  <ProfileCard name={item?.name} />
                </div>
              ))
            : inputText && <p className="text-xl ">No match found!</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchFrnd;
