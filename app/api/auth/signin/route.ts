import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendtoken } from "@/app/lib/sendToken";

export async function GET(){
    return NextResponse.json({
        msg: "Method does not exist"
    },{
        status: 405
    });
};

export async function POST(req: NextRequest, res: NextResponse){
    try {
        const { email, password } = await req.json();
        if(!email || !password){
            return NextResponse.json({
                msg: "All fields are required"
            },{
                status: 400 // Bad Request
            });
        };
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if(!existingUser){
            return NextResponse.json({
                msg: "User not found"
            },{
                status: 404 // Not Found
            })
        };
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if(!isValidPassword) return NextResponse.json({
            msg: "Invalid Credentials"
        },{
            status: 500 // Internal Server Error
        });
        await sendtoken(existingUser, 200, res);
        return NextResponse.json({
            msg: "User logged in successfully"
        },{
            status: 200
        });
    } catch (error) {
        console.error("Error while logging in: ", error);
        return NextResponse.json({
            msg: "Error while logging in"
        },{
            status: 500 // Internal Server Error
        });
    };
};

export async function PUT(){
    return NextResponse.json({
        msg: "Method does not exist"
    },{
        status: 405
    });
};

export async function DELETE(){
    return NextResponse.json({
        msg: "Method does not exist"
    },{
        status: 405
    });
};