import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const session = await auth();
        if(!session){
            return NextResponse.json({ msg: "User not authenticatedd" }, { status: 401 });
        };
        return NextResponse.json({ msg: "User authenticated", session: session }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ msg: "No user found" }, { status: 404 })
    }
}