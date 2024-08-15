"use client";

import { SubmitButton } from "@/app/components/Button";
import axios from "axios";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const registrationData = await res.data();
      if (registrationData.success) {
        redirect("/");
      } else {
        console.log("registration failed");
        setError(registrationData.msg);
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.log("Registration failed");
      setError("Error while signing up...");
      throw new Error("Registration failed");
    }
  };

  return (
    <>
      <div className="w-full bg-black h-[92vh]">
        <div className="w-full flex justify-center text-white">
          Sign in to your account
        </div>
        <div className="w-full flex justify-center items-start pt-[3rem] h-full">
          <form
            action=""
            className="border-2 border-white px-8 py-6"
            method="post"
            onSubmit={handleRegister}
          >
            <div className="pb-4">
              <SignupField
                type={`username`}
                text={"Username"}
                id={`username`}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="pb-4">
              <SignupField
                type={`email`}
                text={"Email"}
                id={`email`}
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="pb-4">
              <SignupField
                type={`text`}
                text={`Password`}
                id={`password`}
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full pt-4 pb-2 flex justify-center">
              <SubmitButton text={`Register`} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;

const SignupField = ({
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
