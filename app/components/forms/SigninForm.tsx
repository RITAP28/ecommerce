'use client'

import React from 'react'
import { SigninField } from './fields/SigninField'
import { SubmitButton } from '../Button'
import { signIn } from '@/auth'
import { CredentialsSignin } from 'next-auth'
import { useRouter } from 'next/navigation'

const SigninForm = () => {
    const router = useRouter();
  return (
    <form
          action={async (formData: FormData) => {
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
        
            if(!email || !password){
              throw new Error("All fields are required");
            };
        
            try {
              await signIn("credentials", {
                email,
                password
              });
            } catch (error) {
              const err = error as CredentialsSignin;
              return err.message;
            };
            router.refresh();
          }}
          className="border-2 border-white px-8 py-6"
        >
          <div className="pb-4">
            <SigninField
              type={`email`}
              text={"Email"}
              id={`email`}
              name={`email`}
            />
          </div>
          <div className="pb-4">
            <SigninField
              type={`text`}
              text={`Password`}
              id={`password`}
              name={`password`}
            />
          </div>
          <div className="w-full pt-4 pb-2 flex justify-center">
            <SubmitButton text={`Login`} />
          </div>
        </form>
  )
}

export default SigninForm