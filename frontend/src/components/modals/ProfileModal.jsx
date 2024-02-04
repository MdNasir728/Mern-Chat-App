import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import ProfileCard from "@/lib/ProfileCard/ProfileCard";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
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
} from "../ui/alert-dialog";
import { mutationFn, onSuccess } from "@/hooks/useUpdateUser";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/context/UserContext";
import { useToast } from "../ui/use-toast";

export const ProfileModal = ({ user }) => {
  const [flag, setFlag] = useState(true);
  const { activeUser, setActiveUser } = useContext(Context);
  const toast = useToast()
  useEffect(() => {
    if (user?._id === activeUser._id) {
      setFlag(false);
    }
  });
  const form = useForm({
    defaultValues: {
      newName: user?.name,
      newEmail: user?.email,
      password: "",
      confirmPassword: "",
    },
  });
  const { isPending, mutate, error } = useMutation({
    mutationFn,
    onSuccess: (data) => onSuccess({ data, setActiveUser, toast }),
  });

  const onSubmit = (user) => {
    mutate({ user, activeUser });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="max-sm:hidden  items-center py-2 px-4 rounded-lg">
          <ProfileCard name={user?.name} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[35rem] bg-slate-200">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="  flex rounded-md flex-col p-5 items-center  space-y-4"
          >
            <FormField
              className="w-full"
              control={form.control}
              name="newName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg text-voilet-700 ">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly={flag}
                      type="text"
                      {...field}
                      className="w-full text-black font-semibold text-xl border-[#50faaa]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="w-full"
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg text-voilet-700">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      readOnly={flag}
                      type="email"
                      {...field}
                      className="w-full text-black font-semibold text-xl border-[#50faaa]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="w-full"
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className={flag ? "hidden" : "w-full"}>
                  <FormLabel className="text-lg text-voilet-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="w-full text-black font-semibold text-xl border-[#50faaa]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="w-full"
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className={flag ? "hidden" : "w-full"}>
                  <FormLabel className="text-lg text-voilet-700">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className="w-full text-black font-semibold text-xl border-[#50faaa] "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div
              className={
                flag ? "hidden" : "w-full flex justify-between gap-2 mt-8"
              }
            >
              <Button
                disabled={isPending}
                type="submit"
                className="bg-[#591abd] w-1/2 text-white hover:bg-[#7227e4] text-xl border-[#50faaa]"
              >
                Save changes
              </Button>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    disabled={isPending}
                    className=" bg-red-400 hover:bg-red-600 text-xl"
                  >
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 border-2 border-orange-200 text-white">
                      <Button onClick={() => useDeleteAccount(user)}>
                        Continue
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

            </div>
            <div>{error && <p>{error.response?.data?.message}</p>}</div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
