import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { onSuccess, mutationFn } from "@/hooks/useSignUp";

const Login = () => {
  const navigate = useNavigate();
  const { setActiveUser } = useContext(Context);

 
  const { isLoading, mutate, error } = useMutation({
    mutationFn,
    onSuccess: (data) => onSuccess({ data, setActiveUser, navigate }),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (user) => {
    mutate({user, action: 'login'});
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-[35rem]  w-[25rem] max-md:w-[90%] bg-opacity-40 bg-black flex rounded-md flex-col p-5 items-center  space-y-4"
      >
        <h1 className="text-4xl font-bold text-[#05ffc9] ">
          Welcome to Snappy
        </h1>

        <h2 className="font-semibold text-3xl text-gray-200 ">SING IN</h2>

        <FormField
          className="w-full"
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-lg text-gray-300 ">Email</FormLabel>
              <FormControl>
                <Input
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
            <FormItem className="w-full">
              <FormLabel className="text-lg text-gray-300 ">Password</FormLabel>
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
        <div className="w-full flex justify-between gap-2">
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-[#591abd] w-1/2 text-white hover:bg-[#7227e4] text-xl border-[#50faaa]"
          >
            Sign In
          </Button>
          <Button
            disabled={isLoading}
            className="w-1/2 bg-gray-300 hover:bg-gray-500 text-xl border-[#50faaa]"
          >
            <Link to={"/signup"}>Sign Up</Link>
          </Button>
        </div>
        {<div className="text-white font-xl">{error && <p>{error.response.data.message}</p>}</div>}

      </form>
    </Form>
  );
};

export default Login;
