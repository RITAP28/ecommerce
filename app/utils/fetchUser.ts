'use server';

import { prisma } from "@/db";
import axios from "axios";
import { NextResponse } from "next/server";

export interface UserProps {
    id: number;
    username: string;
    email: string;
    expiresAt: Date
  }

export const handleFetchUser = async (userId: number) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!user){
            return null;
        };

        return user;
    } catch (error) {
        console.error("Error while fetching user: ", error);
    };
};