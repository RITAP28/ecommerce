import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const userId = params.id;
      const cart = await prisma.cart.findMany({
        where: {
          userId: Number(userId),
        },
      });
  
      if (cart.length === 0) {
        return NextResponse.json(
          { msg: `Cart empty for user with id ${userId}`, cartItems: cart },
          { status: 200 }
        );
      }
  
      return NextResponse.json(
        {
          msg: `cart for user with id ${userId} found`,
          cartItems: cart,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      throw new Error("Error fetching products from the cart");
    }
  }


export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const userId = params.id;
    const { productId, productDescription, productName, productImage } =
      await req.json();

    // find the user from the database
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Not Authorised",
        },
        {
          status: 401,
        }
      );
    }

    // add the product to the user's cart
    const addedProduct = await prisma.cart.create({
      data: {
        userId: Number(userId),
        productId,
        productName,
        productDescription,
        productImage,
        userName: user.username,
        pQuantity: 1,
      },
    });

    console.log("Recently added product is -> ", addedProduct);

    return NextResponse.json(
      {
        message: "Your product has been added to the cart successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw new Error("Error while adding to the cart");
  };
};
