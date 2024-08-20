'use server'

import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { decrypt } from "./session";

export const verifyUser = cache(async () => {
    const cookie = cookies().get('token')?.value as string;

    if(!cookie){
        redirect('/signin');
    };

    const payload = await decrypt(cookie);

    if(!payload?.id){
        redirect('/signin');
    };

    return {
        isAuthenticated: true,
        userId: payload.id,
        email: payload.email,
        username: payload.username
    }
});

export const fetchuser = cache(async () => {
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