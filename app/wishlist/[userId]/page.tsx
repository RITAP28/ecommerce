'use client'


import { CartProps } from '@/app/utils/props';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = ({
  params,
}: {
  params: {
    userId: number;
  };
}) => {
  const router = useRouter();
  const { userId } = params;
  if(!userId){
    router.push('/signin');
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<CartProps[]>([]); // cartprops will be the same for wishlist
  const handleGetProductsInCart = async () => {
    setLoading(true);
    try {
      const products = await axios.get(`/api/wishlist/${userId}`, {
        withCredentials: true,
      });
      console.log(products.data.wishlistProducts);
      setWishlist(products.data.wishlistProducts);
    } catch (error) {
      console.error("Error while getting products in wishlist: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetProductsInCart();
  }, []);
  
  return (
    <div className="w-full h-full bg-slate-500 overflow-y-auto scroll-smooth scrollbar-custom">
      {loading ? (
        <div className="font-Philosopher pl-2 pt-2">
          fetching your beautiful wishlist...
        </div>
      ) : wishlist.length > 0 ? (
        <div className="w-full flex flex-row">
          <div className="w-[60%]">
            <div className="w-full py-4 font-Philosopher">
              <p className="pl-4 text-[2rem] font-bold text-black">
                Time to make your wishes come TRUE!
              </p>
            </div>
            <div className="pt-2 px-2">
              {wishlist.map((product, index) => (
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
                      </div>
                    </div>
                    <div className="w-[90%] py-4 pl-2">
                      <hr className="border-slate-600" />
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-black font-Philosopher">
            <p className="pl-2 pt-2">
              {`Your wishlist is empty :( Click on 🖤 to add it to your wishes...`}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default Page