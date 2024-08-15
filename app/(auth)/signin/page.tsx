import {SubmitButton} from "@/app/components/Button";
import { redirect } from "next/navigation";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

const Page = () => {

  const handleLogin = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string | undefined;
    const password = formData.get('password') as string | undefined;

    if(!email || !password){
      throw new Error("All fields are required");
    };

    try {
      await signIn("credentials", {
        email,
        password
      });
      redirect('/');
    } catch (error) {
      const err = error as CredentialsSignin;
      return err.message;
    };
  };

  return (
    <div className="w-full bg-black h-[92vh]">
      <div className="w-full flex justify-center text-white">
        Sign in to your account
      </div>
      <div className="w-full flex justify-center items-start pt-[3rem] h-full">
        <form
          action={handleLogin}
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
      </div>
    </div>
  );
};

export default Page;

const SigninField = ({
  type,
  text,
  id,
  name
}: {
  type: string;
  text: string;
  id: string;
  name: string;
}) => {
  return (
    <>
      <div className="w-full flex flex-col">
        <p className="text-white pb-1">{text}:</p>
        <input
          type={type}
          name={name}
          size={30}
          id={id}
          className="w-full pl-2 py-2 text-black rounded-sm"
          placeholder={`Your ${text}`}
        />
      </div>
    </>
  );
};
