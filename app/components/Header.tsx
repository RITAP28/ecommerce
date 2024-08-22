"use client";

import Link from "next/link";
import { UserProps } from "../utils/fetchUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState<UserProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleGetUser = async () => {
    setLoading(true);
    try {
      const user = await axios.get("/api/auth/validate");
      if (!user) {
        router.push("/signin");
        return;
      }
      console.log(user.data.user);
      setUser(user.data.user);
    } catch (error) {
      console.error("Error while fetching user in cart: ", error);
      router.push("/signin");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <div className="w-full h-full bg-slate-500 flex flex-row border-b-2 border-black">
      <div className="w-[20%] flex justify-center items-center font-bold font-Code">
        <Link href="/" className="text-black">
          SNARKK
        </Link>
      </div>
      <div className="w-[40%] flex items-center">
        <div className="w-full">
          <input
            type="text"
            name="search"
            id="search"
            className="w-[80%] py-1 rounded-xl text-sm font-Code pl-3 focus:border-none border-2 border-black bg-slate-400 text-black placeholder:text-black"
            placeholder="Search here..."
          />
        </div>
      </div>
      <div className="w-[40%] flex flex-row gap-2">
        <div className="basis-1/4 w-full flex justify-center items-center">
          <Link
            href="/about"
            className="hover:text-white transition-all ease-in-out duration-150 px-2 py-1 rounded-md font-Philosopher font-bold lowercase hover:underline"
          >
            About
          </Link>
        </div>
        <div className="basis-1/4 w-full flex justify-center items-center">
          <Link
            href="/about"
            className="hover:text-white transition-all ease-in-out duration-200 px-2 py-1 rounded-md font-Philosopher font-bold lowercase hover:underline"
          >
            Contact us
          </Link>
        </div>
        <div className="basis-1/4 w-full flex justify-center items-center">
          <Link
            href="/about"
            className="hover:text-white transition-all ease-in-out duration-150 px-2 py-1 rounded-md font-Philosopher font-bold lowercase hover:underline"
          >
            Our Story
          </Link>
        </div>
        <div className="basis-1/4 w-full flex justify-center items-center">
          {!user ? (
            <div className="font-Philosopher font-extrabold border-2 border-black text-white px-2 py-1 bg-black">
              <Link
                href="/signin"
                className=""
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="font-Philosopher font-extrabold border-2 border-black text-white px-2 py-1 uppercase bg-black">
              {user && user.username}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
