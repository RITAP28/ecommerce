import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/db";
import { cookies } from "next/headers";

interface User {
  id: number;
  username: string;
  email: string;
  isAuthenticated: boolean;
}

export async function sendtoken(
  user: User,
  statusCode: number
) {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    process.env.AUTH_SECRET as string
  );
  console.log(token);
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
    sameSite: true,
  };

  try {
    const loggedInUser = await prisma.user.findUnique({
      where: {
        email: user?.email,
      },
    });
    const session = await prisma.session.create({
        data: {
            userId: loggedInUser?.id as number,
            sessionToken: token,
            expiresAt: options.expires
        }
    });
    console.log(session);
    cookies().set('token', token, options);
    return NextResponse.json({
        msg: "Session created successfully",
        session: session
    },{
        status: statusCode
    });
  } catch (error) {
    console.error("Error while creating a session: ", error);
    return NextResponse.json({
        msg: "Session creation failed"
    },{
        status: 500 // Internal Server Error
    });
  };
};
