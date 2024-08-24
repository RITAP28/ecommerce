"use client";

import React, { useState } from "react";
import { SignupField } from "./fields/SignupField";
import { SubmitButton } from "../Button";
import { signup } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from '@chakra-ui/react'

const SignupForm = () => {
  const toast = useToast();
  const [state, setState] = useState<any>({});
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [pending, setPending] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    const result = await signup(state, formData);

    if (result?.errors) {
      setState({ ...state, errors: result.errors });
      toast({
        title: "Registration failed.",
        description: "Apologies from our side. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      setPending(false);
      setState({ ...state, errors: {} });
      toast({
        title: "You are signed up!",
        description: "Your account has been created.",
        status: "success",
        duration: 4000,
        isClosable: true
      });
      const userId = result.user.id as number;
      router.push(`/cart/${userId}`);
    }

    setPending(false);
  };

  return (
    <>
      <form id="signupform" onSubmit={handleSubmit} className="border-2 border-black px-8 py-6">
        <div className="pb-4">
          <SignupField
            type={`username`}
            text={"Username"}
            id={`username`}
            name='username'
            onChange={handleChange}
          />
        </div>
        {state?.errors?.name && <p className="text-red-400">{state.errors.name}</p>}
        <div className="pb-4">
          <SignupField
            type={`email`}
            text={"Email"}
            id={`email`}
            name='email'
            onChange={handleChange}
          />
        </div>
        {state?.errors?.email && <p className="text-red-400">{state.errors.email}</p>}
        <div className="pb-4">
          <SignupField
            type={`text`}
            text={`Password`}
            id={`password`}
            name='password'
            onChange={handleChange}
          />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error: string, index: number) => (
                <li key={index} className="text-red-400">{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="w-full pt-4 pb-2 flex justify-center">
          <SubmitButton text={`Register`} isPending={pending} afterSubmitText={`Signing you up...`} />
        </div>
        <div className="w-full flex justify-center">
          <p className="font-Philosopher">OR</p>
        </div>
        <div className="w-full text-black flex flex-row justify-center font-Philosopher gap-1">
            <p className="">Already have an account?</p>
            <p className="">
              <Link href='/signin' className='underline hover:text-white transition-all ease-in-out duration-200'>
                Login
              </Link>
            </p>
          </div>
      </form>
    </>
  );
};

export default SignupForm;
