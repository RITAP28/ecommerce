import { prisma } from "@/db";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

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

export const ImageLinks = async (imageName: string) => {
  try {
    const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: imageName
    });
    const signedUrl = await getSignedUrl(s3Client, getCommand, {
        expiresIn: 60 * 60 * 24, // 1 day
    });
    console.log("signed url: ", signedUrl);
    await prisma.product.update({
        where: {
            productName: imageName
        },
        data: {
            productImageLink: signedUrl
        }
    });
    return NextResponse.json({
        msg: "Image link updated successfully",
        signedUrl
    },{ status: 200 });
  } catch (error) {
    console.error("Error while loading images: ", error);
    return NextResponse.json(
      { msg: "Error while loading images" },
      { status: 500 }
    );
  }
};
