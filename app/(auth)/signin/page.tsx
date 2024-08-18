import SigninForm from "@/app/components/forms/SigninForm";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();
  console.log("user found in sign -> page.tsx: ", session?.user);
  return (
    <div className="w-full bg-black h-[92vh]">
      <div className="w-full flex justify-center text-white">
        Sign in to your account
      </div>
      <div className="w-full flex justify-center items-start pt-[3rem] h-full">
        <SigninForm />
      </div>
    </div>
  );
};

export default Page;

