"use client";

import React from "react";
import { SubmitButton } from "../components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  return (
    <div className="w-full h-[92vh] bg-black">
      <div className="w-full text-white flex justify-center">
        <p className="pt-4 font-Philosopher">
          Here you can upload your product
        </p>
      </div>
      <UploadForm />
    </div>
  );
};

export default page;

const UploadForm = () => {
    const router = useRouter();
  const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.forEach((key, value) => {
      console.log(key, value);
    });

    try {
        const response = await axios.post('/api/upload', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Image uploaded successfully -> ", response.data);
        router.push('/');
    } catch (error) {
        console.error("Error while uploading image: ", error);
    }
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-start pt-[3rem]">
        <form
          action=""
          onSubmit={handleUploadImage}
          method="post"
          className="border-2 border-white px-8 py-6 bg-slate-500"
        >
          <div className="w-full flex flex-col text-black">
            <div className="w-full pb-2">
              <p className="w-full pb-1 font-Philosopher">Product Name:</p>
              <input
                type="text"
                name="productName"
                className="w-full py-2 pl-1 text-black font-Code text-sm"
                placeholder="Enter product name"
              />
            </div>
            <div className="w-full py-2">
              <p className="w-full pb-1 font-Philosopher">
                Product Description:
              </p>
              <textarea
                name="productDescription"
                className="w-full pl-1 text-black font-Code text-sm"
                placeholder="Enter product description"
              />
            </div>
            <div className="w-full py-2">
              <p className="w-full pb-1 font-Philosopher">Product Image:</p>
              <input
                type="file"
                name="productImage"
                className="w-full font-Code text-sm"
              />
            </div>
            <div className="w-full py-2">
              <p className="w-full pb-1 font-Philosopher">Product Price:</p>
              <input
                type="number"
                name="productPrice"
                className="w-full py-2 pl-1 text-black font-Code text-sm"
                placeholder="Product price"
              />
            </div>
            <div className="w-full pt-4 pb-2 flex justify-center">
              <SubmitButton text={`Upload`} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
