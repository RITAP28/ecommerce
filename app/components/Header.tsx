import { auth } from "@/auth";
import Link from "next/link"


const Header = async () => {
    const session = await auth();
    console.log("user found -> ", session?.user);
  return (
    <div className="w-full h-full bg-black text-white flex flex-row">
        <div className="w-[20%] flex justify-center items-center font-bold font-Code">
            <Link href="/">SNARKK</Link>
        </div>
        <div className="w-[50%]"></div>
        <div className="w-[30%] flex flex-row gap-2">
            <div className="basis-1/4 w-full flex justify-center items-center">
                <Link href="/about" className="hover:bg-white hover:text-black transition ease-in-out duration-150 px-2 py-1 rounded-md">About</Link>
            </div>
            <div className="basis-1/4 w-full flex justify-center items-center">
                <Link href="/about" className="hover:bg-white hover:text-black transition ease-in-out duration-150 px-2 py-1 rounded-md">Contact us</Link>
            </div>
            <div className="basis-1/4 w-full flex justify-center items-center">
                <Link href="/about" className="hover:bg-white hover:text-black transition ease-in-out duration-150 px-2 py-1 rounded-md">Our Story</Link>
            </div>
            <div className="basis-1/4 w-full flex justify-center items-center">
                {session ? (
                    <div className="">
                        {session.user.name}
                    </div>
                ) : (
                    <Link href="/signin" className="hover:bg-white hover:text-black transition ease-in-out duration-150 px-2 py-1 rounded-md">Login</Link>
                )}
            </div>
        </div>
    </div>
  )
}

export default Header