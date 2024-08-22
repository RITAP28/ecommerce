'use client'

import React, { useState } from 'react'
import { SigninField } from './fields/SigninField'
import { SubmitButton } from '../Button'
import { useRouter } from 'next/navigation'
import { signin } from '@/app/actions/auth'
import Link from 'next/link';
import { useToast } from '@chakra-ui/react'

const SigninForm = () => {
  const toast = useToast();
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
      toast({
        title: "Login failed.",
        description: "Apologies from our side. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      setPending(false);
      setState({ ...state, errors: {} });
      toast({
        title: "Heyyo, Login successfull!",
        description: "Welcome back! You can continue your shopping now.",
        status: "success",
        duration: 4000,
        isClosable: true
      });
      const userId = result.user.id;
      router.push(`/cart/${userId}`);
    };

    setPending(false);
  };

  return (
    <form
          action=""
          onSubmit={handleSubmit}
          className="border-2 border-black px-8 py-6"
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
            <SubmitButton text={`Login`} isPending={pending} afterSubmitText={`logging you in...`} />
          </div>
          <div className="w-full flex justify-center items-center">
            <p className="font-Philosopher">
              OR
            </p>
          </div>
          <div className="w-full text-black font-Philosopher flex justify-center gap-1">
            <p className="flex justify-center">{`Don't have an account?`}</p>
            <p className="flex justify-center underline hover:text-slate-300 transition-all ease-in-out duration-200">
              <Link href='/signup' className=''>
                Register
              </Link>
            </p>
          </div>
        </form>
  )
}

export default SigninForm