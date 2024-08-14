"use client";

import Button from "@/app/components/Button";
import { signIn } from "@/app/server/auth";
import React, { useState } from "react";

const Signin = () => {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="w-full bg-black h-[92vh]">
      <div className="w-full flex justify-center text-white">
        Sign in to your account
      </div>
      <div className="w-full flex justify-center items-start pt-[3rem] h-full">
        <form
          action={async (formdata) => {
            "use server";
            await signIn("credentials", formdata);
          }}
          className="border-2 border-white px-8 py-6"
          method="post"
        >
          <div className="pb-4">
            <SigninField
              type={`email`}
              text={"Email"}
              id={`email`}
              value={formdata.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="pb-4">
            <SigninField
              type={`text`}
              text={`Password`}
              id={`password`}
              value={formdata.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full pt-4 pb-2 flex justify-center">
            <Button text={`Login`} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;

const SigninField = ({
  type,
  text,
  id,
  value,
  onChange,
}: {
  type: string;
  text: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <div className="w-full flex flex-col">
        <p className="text-white pb-1">{text}:</p>
        <input
          type={type}
          name=""
          size={30}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full pl-2 py-2 text-black rounded-sm"
          placeholder={`Your ${text}`}
        />
      </div>
    </>
  );
};
