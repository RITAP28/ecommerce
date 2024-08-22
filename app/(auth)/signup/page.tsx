import SignupForm from "@/app/components/forms/SignupForm";

const Signup = () => {
  return (
    <>
      <div className="w-full bg-slate-500 h-[92vh]">
        <div className="w-full flex justify-center text-black text-lg pt-[3rem] font-Philosopher">
          Sign in to your account
        </div>
        <div className="w-full flex justify-center items-start pt-[3rem] h-full">
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export default Signup;


