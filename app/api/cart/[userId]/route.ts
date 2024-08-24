import { handleFetchUser } from "@/app/utils/fetchUser";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      userId: number;
    };
  }
) {
  try {
    const { userId } = params;
    const user = await handleFetchUser(userId);
    if (user === null || user === undefined) {
      return NextResponse.json(
        {
          msg: "User not found",
        },
        {
          status: 401,
        }
      );
    }

    const cartProducts = await prisma.cart.findMany();
    return NextResponse.json(
      {
        msg: "Products found successfully in cart",
        cartProducts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while fetching products in cart: ", error);
    return NextResponse.json(
      { msg: "Error while fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      productId,
      productName,
      productDescription,
      productImageLink,
      productPrice,
      userId,
      userName,
    }: {
      productId: number;
      productName: string;
      productDescription: string;
      productImageLink: string;
      productPrice: number;
      userId: number;
      userName: string;
    } = await req.json();

    const user = await handleFetchUser(userId);
    if (user === null || user === undefined) {
      return NextResponse.json(
        {
          msg: "User not found",
        },
        {
          status: 401,
        }
      );
    }

    const existingProductInCart = await prisma.cart.findUnique({
      where: {
        productId_userId: {
          productId,
          userId,
        },
      },
    });

    if (existingProductInCart) {
      return NextResponse.json(
        {
          msg: "Product already in cart",
        },
        {
          status: 409, // Conflict
        }
      );
    }

    const newProductInCart = await prisma.cart.create({
      data: {
        productId,
        productName,
        productDescription,
        productImageLink,
        productPrice,
        userId,
        userName,
        addedAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    });

    return NextResponse.json(
      {
        msg: "Product added to cart successfully",
        newProdinCart: newProductInCart,
      },
      {
        status: 201, // Created
      }
    );
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
