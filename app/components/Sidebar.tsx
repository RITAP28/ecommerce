"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { handleGetUser, UserProps } from "../utils/fetchUser";
import axios from "axios";
import { Button } from "./Button";
import { useToast } from "@chakra-ui/react";



const Categories = [
  {
    text: "Lifestyle Shoes",
  },
  {
    text: "Running Shoes",
  },
  {
    text: "Jordan",
  },
  {
    text: "Sneakers",
  },
  {
    text: "Basketball",
  },
  {
    text: "Football",
  },
];

const onClick = (text: string) => {
  redirect(`/${text}`);
};

const Sidebar = () => {
  const toast = useToast();
  const router = useRouter();

  const [user, setUser] = useState<UserProps>();
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const handleGetUser = async () => {
    setUserLoading(true);
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
    setUserLoading(false);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`/api/auth/logout`);
      console.log(res.data);
      toast({
        title: "Logout successfull",
        description: "Sad to see you go, come back soon!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error while logging out: ", error);
      toast({
        title: "Logout operation failed",
        description: "Sorry, we could not log you out. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const Buttons = [
    {
      text: "Your Cart",
      link: `/cart/${user?.id}`,
    },
    {
      text: "Your Orders",
      link: "/orders",
    },
    {
      text: "Your Wishlist",
      link: `/wishlist/${user?.id}`,
    },
    {
      text: "Upload Product",
      link: "/upload",
    },
  ];

  return (
    <>
      <div className="w-full h-full bg-slate-500 text-black border-r-2 border-black pt-[2rem] flex flex-col">
        <div className="w-full">
          {Buttons.map((button, index) => (
              <div className="" key={index}>
                <ButtonComponent
                  text={button.text}
                  link={button.link}
                  onClick={() => {
                    onClick(button.text);
                  }}
                />
              </div>
          ))}
        </div>
        <div className="pt-[3rem] w-full">
          <h3 className="underline flex justify-center font-bold font-Philosopher text-lg">
            Categories
          </h3>
          <div className="w-full pt-4">
            {Categories.map((category, index) => (
                <div className="" key={index}>
                  <ButtonComponent
                    text={category.text}
                    link={category.text}
                    onClick={() => {
                      onClick(category.text);
                    }}
                  />
                </div>
            ))}
          </div>
        </div>
        {user && (
          <div className="mt-auto w-full flex justify-center items-center pb-4">
            <Button text={`Logout`} onClick={handleLogout} />
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;

const ButtonComponent = ({
  text,
  link,
}: {
  text: string;
  link: string;
  onClick: () => void;
}) => {
  return (
    <>
      <div className="w-full flex justify-center">
        <Link href={link} className="w-full flex justify-center">
          <button
            type="button"
            className="w-[80%] hover:bg-slate-700 transition-all hover:text-white ease-in-out duration-200 px-2 py-1 rounded-md font-Philosopher font-semibold"
          >
            {text}
          </button>
        </Link>
      </div>
      <div className="w-full flex justify-center py-2">
        <hr className="w-[75%] border-1 border-slate-800" />
      </div>
    </>
  );
};
