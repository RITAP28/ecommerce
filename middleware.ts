

import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from './db';
import { redirect } from 'next/navigation';

interface Decoded extends JwtPayload {
  email: string;
};

const publicRoutes = ['/signin', '/signup'];
const protectedRoutes = ['/cart', '/wishlist', '/orders'];
 
export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoutes = publicRoutes.includes(path);
  const isProtectedRoutes = protectedRoutes.includes(path);

  // get the token from the cookie and decrypt it
  const token = cookies().get('token')?.value as string;
  if(!token){
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  };
  
  const decodedToken = jwt.verify(token, process.env.AUTH_SECRET as string) as Decoded;

  try {
    // find the user with the help of decoded token
    const existingUser = await prisma.user.findUnique({
      where: {
        email: decodedToken.email
      }
    });

    // if the user is unauthenticated and is visiting a protected route
    if(isProtectedRoutes && !existingUser?.id){
      return NextResponse.redirect(new URL('/signin', request.nextUrl));
    };

    // if the user is authenticated and is visiting login or signup pages
    if(isPublicRoutes && existingUser?.id){
      return NextResponse.redirect(new URL('/', request.nextUrl));
    };

    // in any other cases, just get forward 
    return NextResponse.next();
  } catch (error) {
    console.error("Error while decrypting token: ", error);
    return NextResponse.json({
      msg: "Invalid token"
    },{
      status: 401 // Unauthorized
    });
  };
};
 
// routes Middleware will run on
export const config = {
  matcher: ['/cart/:path*', '/orders/:path*', '/wishlist/:path*'],
}