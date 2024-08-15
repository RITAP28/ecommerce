import { SubmitButton } from "@/app/components/Button";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const Signup = () => {
  const handleRegister = async (formData: FormData) => {
    "use server";
    const username = formData.get("username") as string | undefined;
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        isAuthenticated: true,
        isVerified: true,
      },
    });

    redirect('/');
  };

  return (
    <>
      <div className="w-full bg-black h-[92vh]">
        <div className="w-full flex justify-center text-white">
          Sign in to your account
        </div>
        <div className="w-full flex justify-center items-start pt-[3rem] h-full">
          <form
            action={handleRegister}
            className="border-2 border-white px-8 py-6"
          >
            <div className="pb-4">
              <SignupField
                type={`username`}
                text={"Username"}
                id={`username`}
                name={`username`}
              />
            </div>
            <div className="pb-4">
              <SignupField
                type={`email`}
                text={"Email"}
                id={`email`}
                name={`email`}
              />
            </div>
            <div className="pb-4">
              <SignupField
                type={`text`}
                text={`Password`}
                id={`password`}
                name={`password`}
              />
            </div>
            <div className="w-full pt-4 pb-2 flex justify-center">
              <SubmitButton text={`Register`} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;

const SignupField = ({
  type,
  text,
  id,
  name,
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
