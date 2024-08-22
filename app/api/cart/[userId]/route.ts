import { handleFetchUser } from "@/app/utils/fetchUser";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {
  params
} : {
  params: {
    userId: number
  }
}) {
  const { userId } = params;
  try {
    const {
      productId,
      productName,
      productDescription,
      productImageLink,
      // userId,
      userName,
    }: {
      productId: number;
      productName: string;
      productDescription: string;
      productImageLink: string;
      // userId: number;
      userName: string;
    } = await req.json();

    const user = await handleFetchUser(userId);
    if(user === null || user === undefined){
      return NextResponse.json({
        msg: "User not found"
      },{
        status: 401 
      });
    };

    const newProdinCart = await prisma.cart.create({
      data: {
        productId,
        productName,
        productDescription,
        productImageLink,
        userId,
        userName: user.username as string,
        addedAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    });

    return NextResponse.json({
      msg: "Product added to cart successfully",
      newProdinCart: newProdinCart
    },{
      status: 201, // Created
    });
  } catch (error) {
    console.error("Error while adding product to request: ", error);
    return NextResponse.json(
      {
        msg: "Error while adding product to request",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
}
