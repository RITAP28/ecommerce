import { prisma } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import sharp from "sharp";
import multer from 'multer';
import { NextResponse } from "next/server";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false
    }
};

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const randomId = uuid();
  const {
    productName,
    productDescription,
    productImage,
    productPrice,
  }: {
    productName: string;
    productDescription: string;
    productImage: File;
    productPrice: number;
  } = req.body;

//     const form = new Promise((resolve, reject) => {
//     upload.single('productImage')(req, res, (err: any) => {
//       if (err) return reject(err);
//       resolve(req.);
//     });
//   });

  const pImagePath = path.join("public/pImages", randomId);

  // validate inputs
  if (!productName || !productDescription || !productImage || !productPrice) {
    throw new Error("All fields are required");
  }

  if (!fs.existsSync(pImagePath)) {
    fs.mkdirSync(pImagePath, {
      recursive: true,
    });
  }

  try {
    const resizedImageBuffer = await sharp(pImagePath)
      .webp({
        quality: 20,
      })
      .toBuffer();
      await fs.promises.writeFile(`${pImagePath}.webp`, resizedImageBuffer);

      const pImageLink = `http://localhost:3000/products/images/${path.basename(pImagePath)}.webp`;
    // save product in the database
    const newProduct = await prisma.product.create({
      data: {
        productName: productName,
        productDescription: productDescription,
        productImage: pImageLink,
        productPrice: productPrice,
      },
    });

    console.log("New product data -> ", newProduct);
    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully",
        newProdData: newProduct,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    throw new Error("Error creating new product");
  }
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
