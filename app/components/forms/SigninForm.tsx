'use client'

import React, { useState } from 'react'
import { SigninField } from './fields/SigninField'
import { SubmitButton } from '../Button'
import { useRouter } from 'next/navigation'
import { signin } from '@/app/actions/auth'
import Link from 'next/link'

const SigninForm = () => {
  const [state, setState] = useState<any>({});
  const [pending, setPending] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);

    const result = await signin(state, formData);

    if(result.errors){
      setState({ ...state, errors: result.errors });
    } else {
      setPending(false);
      setState({ ...state, errors: {} });
      alert("Login successfull");
      router.push('/cart');
    };

    setPending(false);
  };

  return (
    <form
          action=""
          onSubmit={handleSubmit}
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
            <SubmitButton text={`Login`} isPending={pending} />
          </div>
          <div className="w-full text-white">
            <p className="">Don't have an account?</p>
            <p className="">
              <Link href='/signup' className=''>
                Register
              </Link>
            </p>
          </div>
        </form>
  )
}

export default SigninForm