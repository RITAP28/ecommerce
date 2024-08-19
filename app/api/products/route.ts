import { auth } from "@/auth";
import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    let email: string | null = null;
    if (session && session.user) {
      email = session?.user.email as string;
    } else {
      return NextResponse.json(
        { msg: "User is not authenticated" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const cart = await prisma.cart.findMany({
      where: {
        userId: Number(user?.id),
      },
    });

    if (cart.length === 0) {
      return NextResponse.json(
        { msg: `Cart empty for user with id ${user?.id}`, cartItems: cart },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        msg: `cart for user with id ${user?.id} found`,
        cartItems: cart,
      },
      {
        status: 204, // No Content
      }
    );
  } catch (error) {
    console.error("error while getting all the items from the cart: ", error);
    throw new Error("Error fetching products from the cart");
  }
}

export async function POST(req: NextRequest ) {
  try {
    const session = await auth();
    let userId: string | null = null;
    if (session) {
      userId = session?.user.id as string;
    } else {
      return NextResponse.json(
        { msg: "User is not authenticated",
          session: session,
         },
        { status: 401 }
      );
    }
    const { productId, productDescription, productName, productImage, email } =
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
        userId: user.id,
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
    console.error("error while adding to the cart, POST req is: ", error);
    return NextResponse.json(
      {
        message: "There was an error adding the product to the cart",
      },
      {
        status: 500,
      }
    );
  }
}
