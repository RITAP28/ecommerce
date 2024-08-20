import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/signin", "/signup"];
const protectedRoutes = ["/cart", "/wishlist", "/orders"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoutes = publicRoutes.includes(path);
  const isProtectedRoutes = protectedRoutes.includes(path);

  // get the token from the cookie and decrypt it
  const token = cookies().get("token")?.value as string;

  // if the user is unauthenticated and is visiting a protected route
  if (!token && isProtectedRoutes) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  // if the user is authenticated and is visiting login or signup pages
  if (isPublicRoutes && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // in any other cases, just get forward
  return NextResponse.next();
}

// routes Middleware will run on
export const config = {
  matcher: ["/cart/:path*", "/orders/:path*", "/wishlist/:path*"],
};
