import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendToken } from "@/app/utils/sendToken";

export async function POST(req: NextRequest, res: NextResponse) {
    const {pathname} = new URL(req.url);

    if(pathname.endsWith('/signin')){
        return login(req, res);
    } else if(pathname.endsWith('/signup')){
        return register(req, res);
    } else if(pathname.endsWith('/logout')){
        return logout(req, res);
    } else {
        return NextResponse.json({
            message: "Invalid Request"
        }, { status: 400 })
    };
};

export const login = async (req: NextRequest, res: NextResponse) => {
    try {
        const { email, password } = await req.json();

        if(!email || !password){
            return NextResponse.json({
                msg: "Email or password is missing"
            },{
                status: 400
            })
        };

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(!existingUser){
            return NextResponse.json({
                msg: "User not found"
            },{
                status: 404
            });
        };

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid) return NextResponse.json({ msg: "Invalid Password" }, { status: 401 });

        await sendToken(existingUser, 200);

        return NextResponse.json({
            msg: "Logged in successfully"
        },{
            status: 200
        });
    } catch (error) {
        console.error("Error while logging in: ", error);
    }
}

export const register = async (req: NextRequest, res: NextResponse) => {
    try {
        const { username, email, password } = await req.json();
        if(!username || !email || !password) return NextResponse.json({ msg: "All fields must be filled" }, { status: 400 });

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(existingUser) return NextResponse.json({ msg: "User already exists" }, { status: 409 }); // Conflict error

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        await sendToken(newUser, 200);

        return NextResponse.json({ 
            msg: "New User created",
            newUser: newUser
         }, { status: 200 });
    } catch (error) {
        console.error("Error while registering: ", error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}

export const logout = async (req: NextRequest, res: NextResponse) => {
    try {
        res.cookies.delete('token');

        return NextResponse.json({ msg: "User logged out successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error while logging out: ", error);
        return NextResponse.json({
            msg: "Internal Server Error"
        },{ status: 500 });
    };
};

