'use server'

import { cookies } from "next/headers";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cache } from "react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/db";

interface Decoded extends JwtPayload {
    id?: number;
    email?: string;
    username?: string;
};

export const verifyUser = cache(async () => {
    const cookie = cookies().get('token')?.value as string;
    const decodedToken = jwt.verify(cookie, process.env.AUTH_SECRET as string) as Decoded;

    if(!decodedToken.id){
        redirect('/signin');
    };

    return {
        isAuthenticated: true,
        userId: decodedToken.id,
        email: decodedToken.email,
        username: decodedToken.username
    }
});

export const getUser = cache(async () => {
    const userPayload = await verifyUser();
    if(!userPayload){
        return null;
    };

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: userPayload.email as string
            }
        });

        return user;
    } catch (error) {
        console.error("Error while fetching user from the database: ", error);
        return NextResponse.json({
            msg: "Error while fetching user from the database"
        }, {
            status: 500 // Internal Server Error
        });
    };
});