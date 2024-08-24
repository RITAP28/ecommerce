"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserProps } from "../../utils/fetchUser";
import { CartProps } from "@/app/utils/props";

const Page = ({
  params,
}: {
  params: {
    userId: number;
  };
}) => {
  const { userId } = params;
  const [user, setUser] = useState<UserProps>();
  const [cart, setCart] = useState<CartProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  if (!userId) {
    router.push("/signin");
  }

  const handleGetProductsInCart = async () => {
    setLoading(true);
    try {
      const products = await axios.get(`/api/cart/${userId}`, {
        withCredentials: true,
      });
      console.log(products.data.cartProducts);
      setCart(products.data.cartProducts);
    } catch (error) {
      console.error("Error while getting products in cart: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetProductsInCart();
  }, []);

  return (
    <div className="w-full h-full bg-slate-500">
      {loading ? (
        <div className="font-Philosopher pl-2 pt-2">
          fetching products for the cart...
        </div>
      ) : cart.length > 0 ? (
        <div className="">
          {cart.map((product, index) => (
            <div key={index} className="text-black">
              <p>{product.productName}</p>
              <p>{product.productId}</p>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="text-black font-Philosopher">
            <p className="pl-2 pt-2">
              {`Your cart seems empty :( Continue shopping...`}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
