import { getUser } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json(
        { msg: "No token found", user: null },
        {
          status: 401, // Unauthorized
        }
      );

    const user = await getUser(token);
    if (!user)
      return NextResponse.json(
        { msg: "Invalid Token", user: null },
        { status: 404 }
      );

    return NextResponse.json(
      {
        msg: "User found successfully",
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while validating user: ", error);
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
}

export function POST(req: NextRequest, res: NextResponse) {
  return NextResponse.json(
    {
      msg: "Method does not exist",
    },
    {
      status: 405, // Method Not Allowed
    }
  );
}
export function PUT(req: NextRequest, res: NextResponse) {
  return NextResponse.json(
    {
      msg: "Method does not exist",
    },
    {
      status: 405, // Method Not Allowed
    }
  );
}
export function DELETE(req: NextRequest, res: NextResponse) {
  return NextResponse.json(
    {
      msg: "Method does not exist",
    },
    {
      status: 405, // Method Not Allowed
    }
  );
}
