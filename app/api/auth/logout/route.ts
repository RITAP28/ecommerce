import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({
        msg: "Method not allowed"
    },{
        status: 405
    })
};

export async function POST(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json(
      {
        msg: "No token found",
      },
      {
        status: 401, // Unauthorized
      }
    );
  };
  res.cookies.set('token', '', {
    maxAge: 0
  });
  return NextResponse.json(
    {
      msg: "Token deleted successfully",
    },
    {
      status: 200,
    }
  );
};

export function PUT(){
    return NextResponse.json({
        msg: "Method not allowed"
    },{
        status: 405
    })
};

export function DELETE(){
    return NextResponse.json({
        msg: "Method not allowed"
    },{
        status: 405
    })
};
