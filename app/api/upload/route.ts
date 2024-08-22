import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import {
  PutObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import { ImageLinks } from "@/app/utils/imageLinks";

const bucketName = process.env.BUCKET_NAME as string;
const bucketRegion = process.env.BUCKET_REGION as string;
const accessKey = process.env.ACCESS_KEY as string;
const secretAccessKey = process.env.SECRET_ACCESS_KEY as string;

const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const allProducts = await prisma.product.findMany();
    console.log(allProducts);
    for(const product of allProducts){
      await ImageLinks(product.productName); // just generates the signed url and does not return any response data
    };

    // after 1 day, when the user sends a request to the server, it will again generate those pre-signed URLs whose expiration time will be increased by 1 more day

    return NextResponse.json({ 
      msg: "Image links generated successfully",
      allProducts: allProducts
    },{
      status: 200 // OK
    });
  } catch (error) {
    console.error("Error while fetching images from S3 bucket: ", error);
    return NextResponse.json({  msg: "Internal Server Error" },{ status: 500 });
  };
};

export async function POST(req: NextRequest, res: NextResponse) {
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

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random())}`;
    const filename = `${productImage.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(productImage.type)}`;

    console.log("buffer of the image uploaded: ", buffer);

    const modifiedImageBuffer = await sharp(buffer)
      .webp({
        quality: 20,
      })
      .toBuffer();

    const imageInsertedIntoS3 = {
      Bucket: bucketName,
      Key: filename,
      Body: modifiedImageBuffer,
      ContentType: mime.getExtension(productImage.type) as string | undefined,
    };

    const command = new PutObjectCommand(imageInsertedIntoS3);
    await s3Client.send(command);

    // saving the key/filename will be useful than the pre-signed url as we will be able to generate the url of the image whenever we need it

    // saving the info in the Database
    const product = await prisma.product.create({
      data: {
        productName: productName,
        productDescription: productDescription,
        productImage: filename,
        productPrice: productPrice,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      },
    });

    return NextResponse.json(
      {
        msg: "file created successfully",
        productInfo: product
      },
      {
        status: 200, // OK
      }
    );
  } catch (error) {
    console.error("Error while uploading via POST request: ", error);
    return NextResponse.json(
      {
        msg: "Error while uploading via POST request",
      },
      {
        status: 500, // Internal Server Error
      }
    );
  }
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
