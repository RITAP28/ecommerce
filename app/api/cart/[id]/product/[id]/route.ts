import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params } : {
    params: {
        id: string;
        itemId: string;
    }
}){
    try {
        const userId = Number(params.id);
        const { action } = await req.json();

        // find the product in the database
        const product = await prisma.cart.findUnique({
            where:{
                productId_userId: {
                    productId: Number(params.itemId),
                    userId: Number(userId)
                }
            }
        });

        if(!product){
            return NextResponse.json({
                msg: "Product not found"
            },{
                status: 404
            });
        };

        const newQuantity = action === 'increase' ? product.pQuantity += 1 : product.pQuantity -= 1;

        if(newQuantity < 0){
            return NextResponse.json({
                msg: "Cannot decrease the quantity below zero"
            },{
                status: 400
            });
        };

        // update the product quantity
        await prisma.cart.update({
            where: {
                productId_userId: {
                    productId: Number(params.itemId),
                    userId: Number(userId)
                }
            },
            data: {
                pQuantity: newQuantity
            }
        });

        return NextResponse.json({
            msg: "Product quantity changed"
        },{
            status: 200
        });
    } catch (error) {
        throw new Error("Error while updating the cart");
    };
};

export async function DELETE({ params } : {
    params: {
        id: string;
        itemId: string;
    }
}){
    try {
        const userId = Number(params.id);
        const itemId = Number(params.itemId);

        // find the product in the database
        const product = await prisma.cart.findUnique({
            where: {
                productId_userId: {
                    productId: itemId,
                    userId: userId
                }
            }
        });

        if(!product){
            return NextResponse.json({
                msg: "Product not found"
            },{
                status: 404
            });
        };

        await prisma.cart.delete({
            where: {
                productId_userId: {
                    productId: itemId,
                    userId: userId
                }
            }
        });

        return NextResponse.json({
            msg: 'Product deleted successfully'
        },{
            status: 200
        });
    } catch (error) {
        throw new Error("Error while deleting the product from the cart");
    };
};