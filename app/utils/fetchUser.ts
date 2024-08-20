import axios from "axios";
import { NextResponse } from "next/server";

export interface UserProps {
    id: number;
    username: string;
    email: string;
    expiresAt: Date
  }

export const handleFetchUser = async () => {
    try {
        const user = await axios.get(`/api/auth/validate`);

        if(!user){
            return NextResponse.json({
                msg: "User not found"
            },{
                status: 404 // Not found
            });
        };

        return NextResponse.json({
            msg: "User successfully found",
            user
        },{
            status: 200
        });
    } catch (error) {
        console.error("Error while fetching user: ", error);
    };
};