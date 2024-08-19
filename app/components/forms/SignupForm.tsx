"use client";

import React, { useActionState, useState } from "react";
import { SignupField } from "./fields/SignupField";
import { SubmitButton } from "../Button";
import { signup } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [state, setState] = useState<any>({});
  const [pending, setPending] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);

    const result = await signup(state, formData);

    if (result?.errors) {
      setState({ ...state, errors: result.errors });
    } else {
      setPending(false);
      setState({ ...state, errors: {} });
      alert("Registration successfull");
      router.push("/");
    }

    setPending(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="border-2 border-white px-8 py-6">
        <div className="pb-4">
          <SignupField
            type={`username`}
            text={"Username"}
            id={`username`}
            name={`username`}
          />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}
        <div className="pb-4">
          <SignupField
            type={`email`}
            text={"Email"}
            id={`email`}
            name={`email`}
          />
        </div>
        {state?.errors?.email && <p>{state.errors.email}</p>}
        <div className="pb-4">
          <SignupField
            type={`text`}
            text={`Password`}
            id={`password`}
            name={`password`}
          />
        </div>
        {state?.errors?.password && (
          <div>
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error: string, index: number) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="w-full pt-4 pb-2 flex justify-center">
          <SubmitButton text={`Register`} isPending={pending} />
        </div>
      </form>
    </>
  );
};

export default SignupForm;
