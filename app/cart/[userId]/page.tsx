"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserProps } from "../../utils/fetchUser";
import { CartProps } from "@/app/utils/props";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useToast } from "@chakra-ui/react";

const Page = ({
  params,
}: {
  params: {
    userId: number;
  };
}) => {
  const { userId } = params;
  const toast = useToast();
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

  const handleCalculateSubtotal = () => {
    let sum: number = 0;
    for (const product of cart) {
      sum += product.productPrice;
    }
    return sum;
  };

  const subtotal = handleCalculateSubtotal();

  const handleDeleteProductFromCart = async (productId: number, productName: string) => {
    try {
      const delProduct = await axios.delete(`/api/cart/${userId}`, {
        withCredentials: true,
        data: {
          productId: productId,
        },
      });
      console.log(delProduct.data);
      setCart((prevCart) => prevCart.filter(x => x.productId !== productId));
      toast({
        title: `Product deleted successfully`,
        description: `Product ${productName} with id ${productId} deleted successfully`,
        status: "success",
        duration: 4000,
        isClosable: true
      });
    } catch (error) {
      console.error("Error while deleting product from cart: ", error);
      toast({
        title: `Product was not deleted`,
        description: `Product ${productName} with id ${productId} deletion operation failed. Please try again.`,
        status: "error",
        duration: 4000,
        isClosable: true
      });
    }
  };

  return (
    <div className="w-full h-full bg-slate-500 overflow-y-auto scroll-smooth scrollbar-custom">
      {loading ? (
        <div className="font-Philosopher pl-2 pt-2">
          fetching products for the cart...
        </div>
      ) : cart.length > 0 ? (
        <div className="w-full flex flex-row">
          <div className="w-[60%]">
            <div className="w-full py-4 font-Philosopher">
              <p className="pl-4 text-[2rem] font-bold text-black">
                Your Bag is looking stunning!
              </p>
              <p className="pl-4">
                Proceed to <span className="font-bold underline">Checkout</span>{" "}
                to finish your shopping...
              </p>
            </div>
            <div className="pt-2 px-2">
              {cart.map((product, index) => (
                  <div key={index} className="text-black">
                    <div className="w-full flex flex-row h-[10rem] pt-2 pb-2 px-2">
                      <div className="w-[30%]">
                        <Image
                          src={`${product.productImageLink}`}
                          className="w-full h-full rounded-md shadow-lg"
                          alt={product.productName}
                          width={100}
                          height={100}
                          priority={true}
                        />
                      </div>
                      <div className="w-[70%] flex flex-col">
                        <div className="w-full">
                          <p className="font-Philosopher text-[1.5rem] font-bold pl-4">
                            {product.productName}
                          </p>
                        </div>
                        <div className="w-full">
                          <p className="pl-4 font-Philosopher text-slate-800 font-bold">
                            MRP: ₹ {product.productPrice}.00
                          </p>
                        </div>
                        <div className="w-full">
                          <div className="font-Philosopher">
                            <p className="pl-4">Size: 8</p>
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="pl-4 pr-2 flex flex-row items-center font-Philosopher">
                            Quantity:
                            <button
                              type="button"
                              className="px-2 text-lg font-bold"
                            >
                              -
                            </button>
                            <p className="">{product.pQuantity}</p>
                            <button
                              type="button"
                              className="px-2 text-lg font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="w-full flex flex-row pl-4">
                          <div className="">
                            <button type="button" className="">
                              <FaHeart className="text-[1.5rem]" />
                            </button>
                          </div>
                          <div className="">
                            <button
                              type="button"
                              className="pl-2"
                              onClick={() => {
                                handleDeleteProductFromCart(product.productId, product.productName);
                              }}
                            >
                              <MdDelete className="text-[1.7rem]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[90%] py-4 pl-2">
                      <hr className="border-slate-600" />
                    </div>
                  </div>
              ))}
            </div>
          </div>
          <div className="w-[40%] pt-4 pr-4">
            <div className="w-full border-2 border-black rounded-md">
              <div className="w-full pb-[3rem]">
                <p className="font-Philosopher text-[2.3rem] text-black pl-4 underline">
                  Summary
                </p>
              </div>
              <div className="w-full flex justify-center">
                <div className="w-[90%]">
                  {cart.map((product, index) => (
                    <div
                      className="w-full flex flex-row font-Philosopher"
                      key={index}
                    >
                      <div className="w-[70%] flex justify-start">
                        {product.productName} {`(${product.pQuantity})`}
                      </div>
                      <div className="w-[30%] flex justify-end font-semibold">
                        ₹ {product.productPrice}.00
                      </div>
                    </div>
                  ))}
                  <div className="w-full pt-[1rem] pb-1">
                    <hr className="w-full border-slate-700" />
                  </div>
                  <div className="w-full flex flex-col font-Philosopher">
                    <div className="w-full flex flex-row">
                      <div className="w-[70%] flex justify-start text-xl font-bold">
                        Subtotal:
                      </div>
                      <div className="w-[30%] flex justify-end text-xl font-bold">
                        ₹ {subtotal}.00
                      </div>
                    </div>
                    <div className="w-full flex flex-row">
                      <div className="w-[70%] flex justify-start text-lg">
                        Extra taxes/Delivery charge:
                      </div>
                      <div className="w-[30%] flex justify-end text-lg">
                        ₹ 1000.00
                      </div>
                    </div>
                  </div>
                  <div className="w-full pt-1 pb-1">
                    <hr className="w-full border-slate-700" />
                  </div>
                  <div className="w-full flex flex-row pt-2 pb-6 font-Philosopher">
                    <div className="w-[70%] flex justify-start text-xl font-semibold underline">
                      Total Amount:
                    </div>
                    <div className="w-[30%] flex justify-end text-2xl font-bold">
                      ₹ {subtotal + 1000}.00
                    </div>
                  </div>
                  <div className="w-full flex flex-col font-Philosopher">
                    <div className="w-full flex justify-center pb-4">
                      <button
                        type="button"
                        className="w-full py-2 bg-slate-500 border-2 text-white font-bold text-xl border-black rounded-md hover:bg-white hover:text-slate-700 transition-all ease-in-out duration-200"
                      >
                        Member Checkout
                      </button>
                    </div>
                    <div className="w-full flex justify-center pb-4">
                      <button
                        type="button"
                        className="w-full py-2 bg-slate-500 border-2 text-white font-bold text-xl border-black rounded-md hover:bg-white hover:text-slate-700 transition-all ease-in-out duration-200"
                      >
                        Guest Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
