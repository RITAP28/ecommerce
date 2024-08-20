import mime from 'mime'
import fs from "fs";
import { mkdir, stat, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import sharp from "sharp";
import multer from "multer";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/db';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const randomId = uuid();
  const formData = await req.formData();
  const productName = formData.get("productName") as string;
  const productDescription = formData.get("productDescription") as string;
  const productPrice = parseFloat(formData.get("productPrice") as string);
  const productImage = formData.get("productImage") as File;

  if (!productName || !productDescription || !productImage || !productPrice) {
    return NextResponse.json(
      {
        msg: "All fields are required",
      },
      {
        status: 400, // Bad Request
      }
    );
  }

  // to save our Blob file to the disk we need to cast it to a Buffer
  const buffer = Buffer.from(await productImage.arrayBuffer());
  const relativeUploadDir = `/upload/${Date.now()}-${randomId}`;
  const uploadDir = path.join("public", relativeUploadDir);

  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {
      recursive: true
    });
  };

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random())}`;
    const filename = `${productImage.name.replace(/\.[^/.]+$/, "")}-${uniqueSuffix}.${mime.getExtension(productImage.type)}`;

    await writeFile(filename, buffer);

    const productImageLink = `http://localhost:3000${relativeUploadDir}/${filename}`;

    // saving the info in the Database
    await prisma.product.create({
      data: {
        productName: productName,
        productDescription: productDescription,
        productImage: productImageLink,
        productPrice: productPrice
      }
    });

    return NextResponse.json({
      msg: 'file created successfully'
    },{
      status: 200 // OK
    });
  } catch (error) {
    console.error("Error while uploading via POST request: ", error);
    return NextResponse.json({
      msg: "Error while uploading via POST request"
    },{
      status: 500 // Internal Server Error
    });
  };
};

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
