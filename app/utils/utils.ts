'use server'

import { auth } from "@/auth";
import axios from "axios";
import { redirect } from "next/navigation";

export const handleAddToCart = async (productId: number, productName: string, productDescription: string, productImage: string) => {
  try {
    const session = await auth();
    console.log(session);
    const email = session?.user?.email;
    console.log(email);
    if (!session) {
      redirect(`${process.env.NEXT_PUBLIC_API_URL}/signin`);
    } else {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        productId,
        productName,
        productDescription,
        productImage,
      },{
        withCredentials: true
      });
      console.log("product added to cart successfully -> ", res.data);
    }
  } catch (error) {
    console.error("Error while adding product to cart: ", error);
  };
};

export const handleGetUser = async () => {
  try {
    const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      withCredentials: true
    });
    console.log("user found -> ", user);
  } catch (error) {
    console.error("Error while getting user: ", error);
  };
};