import SigninForm from "@/app/components/forms/SigninForm";
import { auth } from "@/auth";

const Page = async () => {
  return (
    <div className="w-full bg-slate-500 h-[92vh]">
      <div className="w-full flex justify-center pt-[3rem] font-Philosopher text-lg text-black">
        Sign in to your account
      </div>
      <div className="w-full flex justify-center items-start pt-[3rem] h-full">
        <SigninForm />
      </div>
    </div>
  );
};

export default Page;

