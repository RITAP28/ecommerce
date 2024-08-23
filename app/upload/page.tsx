"use client";

import React, { useState } from "react";
import { SubmitButton } from "../components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const page = () => {
  return (
    <div className="w-full h-[92vh] bg-slate-500">
      <div className="w-full text-black font-bold flex justify-center">
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
  const toast = useToast();
  const router = useRouter();
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);


  const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploadLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.forEach((key, value) => {
      console.log(key, value);
    });

    try {
      const response = await axios.post("/api/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully -> ", response.data);
      toast({
        title: "Product Upload successfull",
        description: "Your product has been uploaded. View it in our home page.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      console.error("Error while uploading image: ", error);
      toast({
        title: "Product Upload failed",
        description: "Your product has not been uploaded. Please try again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    };
    setUploadLoading(false);
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-start pt-[3rem]">
        <form
          action=""
          onSubmit={handleUploadImage}
          method="post"
          className="border-2 border-black px-8 py-6 bg-slate-500 rounded-lg"
        >
          <div className="w-full flex flex-col text-black">
            <div className="w-full pb-2">
              <p className="w-full pb-1 font-Philosopher">Product Name:</p>
              <input
                type="text"
                name="productName"
                className="w-full py-2 pl-1 text-black font-Code text-sm rounded-sm"
                placeholder="Enter product name"
              />
            </div>
            <div className="w-full py-2">
              <p className="w-full pb-1 font-Philosopher">
                Product Description:
              </p>
              <textarea
                name="productDescription"
                className="w-full pl-1 text-black font-Code text-sm rounded-sm"
                placeholder="Enter product description"
              />
            </div>
            <div className="w-full py-2">
              <p className="w-full pb-1 font-Philosopher">Product Image:</p>
              <input
                type="file"
                name="productImage"
                className="w-full font-Code text-sm rounded-sm"
              />
            </div>
            <div className="w-full py-2">
              <p className="w-full pb-1 font-Philosopher">Product Price:</p>
              <input
                type="number"
                name="productPrice"
                className="w-full py-2 pl-1 text-black font-Code text-sm rounded-sm"
                placeholder="Product price"
              />
            </div>
            <div className="w-full pt-4 pb-2 flex justify-center">
              <SubmitButton text={`Upload`} afterSubmitText={`Uploading...`} isPending={uploadLoading} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
