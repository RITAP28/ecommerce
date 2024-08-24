"use client"; // Add this line at the top of your component

import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import Image from "next/image";
import axios from "axios";
import { handleFetchUser, handleGetUser, UserProps } from "../utils/fetchUser";
import { useRouter } from "next/navigation";
import { Toast, useToast } from "@chakra-ui/react";

interface ProductProps {
  productId: number;
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productImageLink: string;
}

const ProductCard = () => {
  const router = useRouter();
  const toast = useToast();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const [user, setUser] = useState<UserProps>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetUser = async () => {
    try {
      const user = await axios.get("/api/auth/validate");
      if (!user) {
        router.push("/signin");
        toast({
          title: "Sorry, you have to login first",
          status: 'info',
          isClosable: true,
          duration: 4000
        });
        return;
      }
      console.log(user.data.user);
      setUser(user.data.user);
    } catch (error) {
      console.error("Error while fetching user: ", error);
      router.push("/signin");
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetAllProducts = async () => {
    try {
      const allProducts = await axios.get(`/api/upload`, {
        withCredentials: true,
      });
      console.log(allProducts.data);
      setProducts(allProducts.data.allProducts);
    } catch (error) {
      console.error("Error while fetching all products: ", error);
    }
    setProductsLoading(false);
  };

  const handleAddToCart = async (productId: number, productName: string, productDescription: string, productImageLink: string) => {
    try {
      const res = await axios.post(`/api/cart/${user?.id}`, {
        productId,
        productName,
        productDescription,
        productImageLink,
        userId: user?.id as number,
        userName: user?.username as string
      });
      console.log(res.data);

      if(res.status === 409){
        toast({
          title: `Product already in cart`,
          description: `Product ${productName} is already in your cart`,
          status: "warning",
          duration: 4000,
          isClosable: true
        });
        return;
      };

      toast({
        title: `Product added successfully`,
        description: `Product ${productName} has been added to your cart`,
        status: "success",
        duration: 4000,
        isClosable: true
      });
    } catch (error) {
      console.error("Error while adding to cart: ", error);
      toast({
        title: `Addition of product was unsuccessfull.`,
        description: `Product ${productName} was not added to your cart.`,
        status: "error",
        duration: 4000,
        isClosable: true
      });
    };
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await handleGetAllProducts();
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };

  }, []);

  return (
    <div className="w-full h-full overflow-y-auto pb-[2rem] scroll-smooth">
      <div className="grid grid-cols-4 grid-rows-3 gap-4 pt-4 px-2 overflow-y-hidden">
        {productsLoading ? (
          <>
            <div className="w-full flex justify-center">
              <p className="font-Philosopher">
                products are on the way from database...
              </p>
            </div>
          </>
        ) : (
            products.length > 0 ? (
              products.map((product, index) => (
                <div
                  className="relative hover:z-20 z-10 bg-slate-600 rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer"
                  key={index}
                >
                  <div className="w-full">
                  <Image
                        key={index}
                        src={`${product.productImageLink}`}
                        className="w-full h-[15rem] rounded-t-md"
                        alt={product.productName}
                        width={80}
                        height={80}
                        priority={true}
                      />
                  </div>
                  <div
                    className={`w-full text-white pt-3 pl-1 text-sm font-semibold font-Code flex justify-center`}
                  >
                    {product.productName}
                  </div>
                  <div
                    className={`w-full text-white pl-1 text-[1rem] font-Code flex justify-center`}
                  >
                    MRP: ₹{product.productPrice}
                  </div>
                  <div className="py-2 flex flex-col w-full gap-1">
                    <div className="w-full flex justify-center">
                      <button
                        type="button"
                        className="bg-black border-2 border-white text-white hover:bg-white hover:text-black transition ease-in-out duration-150 rounded-md w-[80%] py-2"
                        onClick={() => {
                          handleAddToCart(product.productId, product.productName, product.productDescription, product.productImageLink)
                        }}
                      >
                        <span className="flex justify-center w-full gap-1">
                          <div className="w-[20%] flex items-center justify-center">
                            <FaShoppingCart className="text-base" />
                          </div>
                          <div className="w-[80%] flex items-center font-Philosopher font-semibold justify-center pr-[2rem]">
                            Add to Cart
                          </div>
                        </span>
                      </button>
                    </div>
                    <div className="w-full flex justify-center">
                      <button
                        type="button"
                        className="bg-red-500 text-white hover:bg-white hover:text-red-500 transition ease-in-out duration-150 rounded-md w-[80%] py-2"
                      >
                        <span className="flex justify-center w-full gap-1">
                          <div className="flex items-center w-[20%] justify-center">
                            <AiFillThunderbolt className="text-base" />
                          </div>
                          <div className="w-[80%] flex justify-start items-center font-Code font-semibold pl-[2.3rem]">
                            Buy Now
                          </div>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="w-full h-full flex justify-center items-center">
                  <div className="font-Philosopher">
                    Sorry, it seems there are no products to display as of now.
                  </div>
                </div>
              </>
            )
        )}
      </div>
    </div>
  );
};

export default ProductCard;
