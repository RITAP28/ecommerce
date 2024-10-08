import { cookies } from "next/headers";
import { SessionPayload } from "./definitions";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { prisma } from "@/db";
import { redirect } from "next/navigation";

interface PayloadProps extends JWTPayload {
    id: number;
    username: string;
    email: string;
}

const encodedKey = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setExpirationTime("7d")
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .sign(encodedKey);
}

export async function decrypt(token: string) {
    console.log(token);
  try {
    const { payload } : {
        payload: PayloadProps
    } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Error while decryption token: ", error);
  }
}

export async function createSession(
  id: number,
  username: string,
  email: string
) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    id,
    username,
    email,
    expiresAt,
  });

  cookies().set('token', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    expires: expiresAt
  });

  try {
    await prisma.session.create({
        data: {
            userId: id,
            sessionToken: session,
            expiresAt: expiresAt
        }
    });
  } catch (error) {
    console.error("Error while creating session token: ", error);
  };
};

export async function updateSession(id: number, username: string, email: string){
    try {
        const existingSession = await prisma.session.findUnique({
            where: {
                userId: id
            }
        });

        if(!existingSession){
            redirect('/signup');
        };

        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const newSession = await encrypt({
            id,
            username,
            email,
            expiresAt
        });

        cookies().set('token', newSession, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            expires: expiresAt
        });

        await prisma.session.update({
            where: {
                userId: id
            },
            data: {
                expiresAt: expiresAt,
                sessionToken: newSession
            }
        });
    } catch (error) {
        console.error("Error while updating session: ", error);
    };
};

export async function getUser(token: string){
    try {
        const payload = await decrypt(token);
        if(!payload){
            throw new Error("Invalid token");
        };

        const existingUser = await prisma.user.findUnique({
            where: {
                email: payload.email
            }
        });
        return existingUser;
    } catch (error) {
        console.error("Error while fetching user info: ", error);
    };
};
