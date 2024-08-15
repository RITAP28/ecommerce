import jwt from "jsonwebtoken";
import { prisma } from "@/db";
import { NextResponse } from "next/server";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
}

export const sendToken = async (user: User, statusCode: number) => {
  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.TOKEN_SECRET_KEY as string
  );
  console.log(token);

  const options = {
    expires: new Date(
        Date.now() + (Number(process.env.COOKIE_EXPIRE)) * 24 * 60 * 60 * 1000 
    ),
    httpOnly: true,
    secure: false,
    sameSite: true
  };

  try {
    const loggedInUser = await prisma.user.findUnique({
      where: {
        email: user?.email
      }
    });

    await prisma.session.create({
      data: {
        userId: loggedInUser?.id as number,
        expiresAt: options.expires,
        sessionToken: token
      }
    });

    return NextResponse.json({
        msg: "Token generated successfully",
        user: loggedInUser,
        token: token
    },{
        status: statusCode
    })
  } catch (error) {
    console.log("Error while inserting a session into the database: ", error);
  }
};