'use client'; // Add this line at the top of your component

import React from "react";
import { products } from "../lib/data";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { philosopher } from "../layout";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

// Function to handle adding a product to the cart
const handleAdd = async (productId: any, productName: any, productDescription: any, productImage: any) => {
  try {
    const session = await auth();
    const userId = session?.user;
    console.log(userId);
    if (!session) {
      redirect("/signin");
    } else {
      const res = await axios.post(`/api/${userId}`, {
        productId,
        productName,
        productDescription,
        productImage,
      });
      console.log("product added to cart successfully -> ", res.data);
    }
  } catch (error) {
    console.error("Error while adding product to cart: ", error);
  }
};

const ProductCard = () => {
  return (
    <div className="w-full grid grid-flow-cols grid-cols-3 gap-x-2 gap-y-6 pt-4 px-2">
      {products.map((product, index) => (
        <div
          className="bg-black rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          key={index}
        >
          <div className="w-full">
            <Image
              src={product.image}
              className="w-full h-[23rem] rounded-t-md"
              alt="watches"
              width={50}
              height={50}
            />
          </div>
          <div
            className={`w-full text-white pt-1 pl-1 text-xl font-bold ${philosopher.variable}`}
          >
            {product.name}
          </div>
          <div
            className={`w-full text-white pl-1 text-[1rem] font-bold ${philosopher.variable}`}
          >
            ₹{product.price}
          </div>
          <div className="py-2 flex flex-row w-full gap-1">
            <div className="basis-1/2 w-full flex justify-center pl-1">
              <button
                type="button"
                className="bg-black border-2 border-white text-white hover:bg-white hover:text-black transition ease-in-out duration-150 rounded-md w-full py-2"
                onClick={() =>
                  handleAdd(product.id, product.name, product.description, product.image)
                }
              >
                <span className="flex justify-center w-full gap-1">
                  <div className="flex items-center pr-2">
                    <FaShoppingCart className="text-base" />
                  </div>
                  <div className="flex items-center font-semibold">
                    Add to Cart
                  </div>
                </span>
              </button>
            </div>
            <div className="basis-1/2 w-full flex justify-center pr-1">
              <button
                type="button"
                className="bg-red-500 text-white hover:bg-white hover:text-red-500 transition ease-in-out duration-150 rounded-md w-full py-2"
              >
                <span className="flex justify-center w-full gap-1">
                  <div className="flex items-center">
                    <AiFillThunderbolt className="text-base" />
                  </div>
                  <div className="flex items-center font-semibold">Buy Now</div>
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
