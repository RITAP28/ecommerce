import SigninForm from "@/app/components/forms/SigninForm";

const Page = () => {
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

