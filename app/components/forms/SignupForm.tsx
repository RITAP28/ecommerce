"use client";

import React, { useActionState, useState } from "react";
import { SignupField } from "./fields/SignupField";
import { SubmitButton } from "../Button";
import { signup } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupForm = () => {
  const [state, setState] = useState<any>({});
  const [pending, setPending] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formElement = e.target as HTMLFormElement;

    const formData = new FormData(formElement);
    console.log(formData);
    console.log(state);

    const result = await signup(state, formData);

    if (result?.errors) {
      setState({ ...state, errors: result.errors });
    } else {
      setPending(false);
      setState({ ...state, errors: {} });
      alert("Registration successfull");
      router.push("/cart");
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
            onChange={handleChange}
          />
        </div>
        {state?.errors?.name && <p className="text-red-400">{state.errors.name}</p>}
        <div className="pb-4">
          <SignupField
            type={`email`}
            text={"Email"}
            id={`email`}
            name={`email`}
            onChange={handleChange}
          />
        </div>
        {state?.errors?.email && <p className="text-red-400">{state.errors.email}</p>}
        <div className="pb-4">
          <SignupField
            type={`text`}
            text={`Password`}
            id={`password`}
            name={`password`}
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
          <SubmitButton text={`Register`} isPending={pending} />
        </div>
        <div className="w-full text-white">
            <p className="">Already have an account?</p>
            <p className="">
              <Link href='/signup' className=''>
                Login
              </Link>
            </p>
          </div>
      </form>
    </>
  );
};

export default SignupForm;
