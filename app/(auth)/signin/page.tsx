import Button from '@/app/components/Button';
import React from 'react'

const Signin = () => {
  return (
    <div className='w-full bg-black h-[92vh]'>
        <div className="w-full flex justify-center text-white">Sign in to your account</div>
        <div className="w-full flex justify-center items-start pt-[3rem] h-full">
            <form action="" className='border-2 border-white px-8 py-6' method="post">
                <div className="pb-4">
                    <SigninField type={`text`} text={`Username`} />
                </div>
                <div className="pb-4">
                    <SigninField type={`email`} text={'Email'} />
                </div>
                <div className="pb-4">
                    <SigninField type={`text`} text={`Password`} />
                </div>
                <div className="w-full pt-4 pb-2 flex justify-center">
                    <Button text={`Login`} />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signin;

const SigninField = ({type, text}: {
    type: string;
    text: string;
}) => {
    return (
        <>
        <div className="w-full flex flex-col">
            <p className="text-white pb-1">{text}:</p>
            <input type={type} name="" size={30} className='w-full pl-2 py-2 text-black rounded-sm' placeholder={`Your ${text}`} />
        </div>
        </>
    )
}