import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
    } catch (error) {
        console.error('Error while fetching current session for user: ', error);
        return NextResponse.json({
            msg: "Error while fetching current session for user"
        },{
            status: 500 // Internal Server Error
        })
    };
};  