import React, { useContext } from "react";
import { Context } from "../../context/UserContext.jsx";
import { ProfileModal } from "@/components/modals/ProfileModal.jsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.jsx";
import ProfileCard from "../ProfileCard/ProfileCard.jsx";
import { onSuccess, useDeleteChat } from "@/hooks/useDeleteChat.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const Topbar = () => {
  const { activeUser, selectedChat, setSelectedChat } = useContext(Context);
  const { chatId } = useParams();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: useDeleteChat,
    onSuccess: (data) => onSuccess({ data, navigate, setSelectedChat }),
  });

  const deleteChatHandler = () => {
    mutate({ chatId, activeUser });
  };

  return (
    <div className="bg-[#70e4da] flex justify-between items-center p-3 h-16">
      <div className="flex flex-grow w-full">
        <Dialog>
          <DialogTrigger>
            <div className="items-center py-2 px-4 rounded-lg">
              <ProfileCard name={selectedChat?.user?.name} />
            </div>
          </DialogTrigger>
          <ProfileModal user={selectedChat?.user} />
        </Dialog>
      </div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            disabled={isPending}
            className=" bg-gray-400 hover:bg-red-600 text-lg"
          >
            Delete Chat
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              chat and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-800 border-2 border-orange-200 text-white">
              <Button onClick={deleteChatHandler}>Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Topbar;
