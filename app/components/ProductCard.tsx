"use client"; // Add this line at the top of your component

import React, { useEffect, useState } from "react";
import { products } from "../lib/data";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import Image from "next/image";
import axios from "axios";

interface ProductProps {
  productId: number;
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
}

const ProductCard = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [imageLink, setImageLink] = useState([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const handleGetAllProducts = async () => {
    try {
      const allProducts = await axios.get(`/api/upload`, {
        withCredentials: true,
      });
      console.log(allProducts.data);
      setProducts(allProducts.data.allProducts);
      setImageLink(allProducts.data.imageLinks);
    } catch (error) {
      console.error("Error while fetching all products: ", error);
    }
    setProductsLoading(false);
  };

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto pb-[2rem] scroll-smooth">
      <div className="grid grid-flow-cols grid-cols-4 gap-x-2 gap-y-6 pt-4 px-2 overflow-y-hidden">
        {productsLoading ? (
          <>
            <div className="w-full flex justify-center">
              <p className="font-Philosopher">
                products are on the way from database...
              </p>
            </div>
          </>
        ) : (
          <div className="w-full h-full">
            {products.length > 0 ? (
              products.map((product, index) => (
                <div
                  className="bg-slate-600 rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:cursor-pointer overflow-visible"
                  key={index}
                >
                  <div className="w-full">
                    {imageLink.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        className="w-full h-[15rem] rounded-t-md"
                        alt="watches"
                        width={50}
                        height={50}
                      />
                    ))}
                  </div>
                  <div
                    className={`w-full text-white pt-1 pl-1 text-xl font-semibold font-Code flex justify-center`}
                  >
                    {product.productName}
                  </div>
                  <div
                    className={`w-full text-white pl-1 text-[1rem] font-Code flex justify-center`}
                  >
                    price: ₹{product.productPrice}
                  </div>
                  <div className="py-2 flex flex-col w-full gap-1">
                    <div className="w-full flex justify-center pl-1">
                      <button
                        type="button"
                        className="bg-black border-2 border-white text-white hover:bg-white hover:text-black transition ease-in-out duration-150 rounded-md w-[80%] py-2"
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
                    <div className="w-full flex justify-center">
                      <button
                        type="button"
                        className="bg-red-500 text-white hover:bg-white hover:text-red-500 transition ease-in-out duration-150 rounded-md w-[80%] py-2"
                      >
                        <span className="flex justify-center w-full gap-1">
                          <div className="flex items-center">
                            <AiFillThunderbolt className="text-base" />
                          </div>
                          <div className="flex items-center font-semibold">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
