import { prisma } from "@/db";
import { FormState, SignUpFormSchema } from "../lib/definitions";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendtoken } from "../lib/sendToken";

export async function signup(state: FormState, formData: FormData){
    try {
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
            return {
                errors: {
                    email: ["Email already in use"],
                }
            }
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

        // Send token to the client
        const res = NextResponse.next();
        await sendtoken(newUser, 200, res);

        return {
            success: true,
            user: newUser
        };
    } catch (error) {
        console.error("Error while creating user: ", error);
        return {
            errors: {
                general: ['An error occurred during signup. Please try again later.'],
            },
        };
    };
};