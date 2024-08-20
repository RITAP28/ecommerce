'use server'

import { prisma } from "@/db";
import { FormState, SignInFormSchema, SignInFormState, SignUpFormSchema } from "../lib/definitions";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { sendtoken } from "../lib/sendToken";
import { createSession, updateSession } from "../lib/session";

export async function signup(state: FormState, formData: FormData){
    try {
        const validatedFields = SignUpFormSchema.safeParse({
            name: formData.get('username'),
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
        await createSession(newUser.id, newUser.username, newUser.email);

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

export async function signin(state: SignInFormState, formData: FormData){
    try {
        const validatedFields = SignInFormSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        if(validatedFields?.error){
            return {
                errors: validatedFields.error.flatten().fieldErrors
            };
        };

        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedFields.data.email
            }
        });

        if(!existingUser){
            return {
                errors: {
                    email: [`User's email not found`],
                }
            };
        };

        const isValidPassword = await bcrypt.compare(validatedFields.data.password, existingUser.password);

        if(!isValidPassword){
            return {
                errors: {
                    password: ['Invalid Credentials']
                }
            };
        };

        const existingSession = await prisma.session.findUnique({
            where: {
                userId: existingUser.id
            }
        })

        await updateSession(existingUser.id, existingUser.username, existingUser.email, String(existingSession?.sessionToken))

        return {
            success: true,
            user: existingUser
        };

    } catch (error) {
        console.error("Error while logging in: ", error);
        return {
            errors: {
                general: ['An error occured during login. Please try again later.']
            }
        }
    };
};