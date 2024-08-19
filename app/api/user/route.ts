import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    const authHeader = request.headers.get('Authorization');
    const sessionToken = authHeader?.split(' ')[1];
    if(!sessionToken) return NextResponse.json({ msg: "User is not authenticated" }, { status: 401 });

    // const session = await auth({ token: sessionToken });

    return NextResponse.json({
        msg: "User is authenticated",
        session: sessionToken
    },{
        status: 200
    });
};