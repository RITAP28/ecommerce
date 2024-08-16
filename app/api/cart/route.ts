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
    };
  };

  