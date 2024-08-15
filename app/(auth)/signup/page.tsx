import SignupForm from "@/app/components/forms/SignupForm";

const Signup = () => {
  return (
    <>
      <div className="w-full bg-black h-[92vh]">
        <div className="w-full flex justify-center text-white">
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


