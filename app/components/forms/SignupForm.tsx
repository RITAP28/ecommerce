"use client";

import React from "react";
import { SignupField } from "./fields/SignupField";
import bcrypt from "bcryptjs";
import { prisma } from "@/db";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../Button";

const SignupForm = () => {
  const router = useRouter();
  return (
    <>
      <form
        action={async (formData: FormData) => {
          const username = formData.get("username") as string | undefined;
          const email = formData.get("email") as string | undefined;
          const password = formData.get("password") as string | undefined;

          if (!username || !email || !password) {
            throw new Error("All fields are required");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (user) {
            throw new Error("User already exists");
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          await prisma.user.create({
            data: {
              username: username,
              email: email,
              password: hashedPassword,
              isAuthenticated: true,
              isVerified: true,
            },
          });
          router.refresh();
        }}
        className="border-2 border-white px-8 py-6"
      >
        <div className="pb-4">
          <SignupField
            type={`username`}
            text={"Username"}
            id={`username`}
            name={`username`}
          />
        </div>
        <div className="pb-4">
          <SignupField
            type={`email`}
            text={"Email"}
            id={`email`}
            name={`email`}
          />
        </div>
        <div className="pb-4">
          <SignupField
            type={`text`}
            text={`Password`}
            id={`password`}
            name={`password`}
          />
        </div>
        <div className="w-full pt-4 pb-2 flex justify-center">
          <SubmitButton text={`Register`} />
        </div>
      </form>
    </>
  );
};

export default SignupForm;
