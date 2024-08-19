import { NextResponse } from "next/server";

export async function GET(){
    return NextResponse.json({
        msg: "Method does not exist"
    },{
        status: 405
    });
};

export async function POST(){
    
}