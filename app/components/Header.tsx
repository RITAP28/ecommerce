"use client";

import Link from "next/link";
import { handleFetchUser, UserProps } from "../utils/fetchUser";
import { redirect, useRouter } from "next/navigation";
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
    <div className="w-full h-full bg-slate-500 flex flex-row">
      <div className="w-[20%] flex justify-center items-center font-bold font-Code">
        <Link href="/" className="text-black">
          SNARKK
        </Link>
      </div>
      <div className="w-[40%]"></div>
      <div className="w-[40%] flex flex-row gap-2">
        <div className="basis-1/4 w-full flex justify-center items-center">
          <Link
            href="/about"
            className="hover:text-white transition-all ease-in-out duration-150 px-2 py-1 rounded-md font-Code font-bold lowercase"
          >
            About
          </Link>
        </div>
        <div className="basis-1/4 w-full flex justify-center items-center">
          <Link
            href="/about"
            className="hover:text-white transition-all ease-in-out duration-200 px-2 py-1 rounded-md font-Code font-bold lowercase"
          >
            Contact us
          </Link>
        </div>
        <div className="basis-1/4 w-full flex justify-center items-center">
          <Link
            href="/about"
            className="hover:text-white transition-all ease-in-out duration-150 px-2 py-1 rounded-md font-Code font-bold lowercase"
          >
            Our Story
          </Link>
        </div>
        <div className="basis-1/4 w-full flex justify-center items-center">
          {user === null ? (
            <div className="">
              <Link
                href="/signin"
                className="hover:text-white transition-all ease-in-out duration-150 px-2 py-1 rounded-md font-Code font-bold lowercase"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="font-Code font-bold uppercase">{user && user.username}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
