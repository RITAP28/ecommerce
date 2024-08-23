import axios from "axios";
import { redirect } from "next/navigation";

export const handleAddToCart = async (productId: number, productName: string, productDescription: string, productImage: string) => {
  try {
    const user = await axios.get(`/api/auth/validate`);
    if (!user) {
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
    };
  } catch (error) {
    console.error("Error while adding product to cart: ", error);
  };
};

export const handleGetUser = async () => {
  try {
    const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/validate`, {
      withCredentials: true
    });
    console.log("user found -> ", user.data.user);
  } catch (error) {
    console.error("Error while getting user: ", error);
  };
};