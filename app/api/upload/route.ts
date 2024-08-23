import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import sharp from "sharp";
import { ImageLinks } from "@/app/utils/imageLinks";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
    const expiredLinkProducts = await prisma.product.findMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    console.log(expiredLinkProducts);
    for (const product of expiredLinkProducts) {
      // update the product's image link by creating another signed url
      try {
        await ImageLinks(product.productName);
      } catch (error) {
        console.error("Error while creating signed url: ", error);
      }
    }

    // after 1 day, when the user sends a request to the server, it will again generate those pre-signed URLs whose expiration time will be increased by 1 more day

    const allProducts = await prisma.product.findMany();

    return NextResponse.json(
      {
        msg: "Image links generated successfully",
        allProducts: allProducts,
      },
      {
        status: 200, // OK
      }
    );
  } catch (error) {
    console.error("Error while fetching images from S3 bucket: ", error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

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

  // check for duplicate product names
  const existingProduct = await prisma.product.findUnique({
    where: {
      productName: productName,
    },
  });

  if (existingProduct) {
    return NextResponse.json(
      {
        msg: `Product with name ${productName} already exists`,
      },
      {
        status: 409, // Conflict
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
      .resize(800, 600, { fit: "inside", withoutEnlargement: true })
      .webp({
        quality: 80,
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

    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: filename,
    });

    const signedUrl = await getSignedUrl(s3Client, getCommand, {
      expiresIn: 24 * 60 * 60
    });
    console.log("Signed URL: ", signedUrl);

    // saving the key/filename will be useful than the pre-signed url as we will be able to generate the url of the image whenever we need it

    // saving the info in the Database
    const product = await prisma.product.create({
      data: {
        productName: productName,
        productDescription: productDescription,
        productImage: filename,
        productPrice: productPrice,
        productImageLink: signedUrl,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json(
      {
        msg: "file created successfully",
        productInfo: product,
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
