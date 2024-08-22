import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendtoken } from "@/app/lib/sendToken";
import { FormState, SignUpFormSchema } from "@/app/lib/definitions";

export async function GET(){
    return NextResponse.json({
        msg: "Method does not exist"
    },{
        status: 405
    });
};

export async function POST(req: NextRequest){
    try {
        const formData = await req.formData();
        const validatedFields = SignUpFormSchema.safeParse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        });

        if(!validatedFields.success){
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        };

        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedFields.data.email
            }
        });
        if(existingUser){
            return NextResponse.json({
                msg: "User already exists"
            },{
                status: 409 // Conflict
            })
        };
        const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
        const newUser = await prisma.user.create({
            data: {
                username: validatedFields.data.name,
                email: validatedFields.data.email,
                password: hashedPassword,
                isAuthenticated: true
            }
        });
        await sendtoken(newUser, 200);
        return NextResponse.json({
            msg: "User created successfully",
            newUser
        },{
            status: 200
        });
    } catch (error) {
        console.error("Error while creating user: ", error);
        return NextResponse.json({
            msg: "Error while creating user"
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