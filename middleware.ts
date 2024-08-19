import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/', '/signin', '/signup'];
const protectedRoutes = ['/cart', '/wishlist', '/orders'];
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoutes = publicRoutes.includes(path);
  const isProtectedRoutes = protectedRoutes.includes(path);

  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about/:path*',
}