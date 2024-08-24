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
  
      const wishlistProducts = await prisma.wishlist.findMany({
        where: {
          userId: Number(userId)
        }
      });
      return NextResponse.json(
        {
          msg: "Products found successfully in wishlist",
          wishlistProducts,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error while fetching products in wishlist: ", error);
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
  
      const existingProductInWishlist = await prisma.wishlist.findUnique({
        where: {
          productId_userId: {
            productId,
            userId,
          },
        },
      });
  
      if (existingProductInWishlist) {
        return NextResponse.json(
          {
            msg: "Product already in wishlist",
          },
          {
            status: 409, // Conflict
          }
        );
      }
  
      const newProductInWishlist = await prisma.wishlist.create({
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
          msg: "Product added to wishlist successfully",
          newProdinWishlist: newProductInWishlist,
        },
        {
          status: 201, // Created
        }
      );
    } catch (error) {
      console.error("Error while adding product to wishlist: ", error);
      return NextResponse.json(
        {
          msg: "Error while adding product to wishlist",
        },
        {
          status: 500, // Internal Server Error
        }
      );
    }
  }