import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';

  // If user is logged in and tries to access login or signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  // If user is not logged in and tries to access a protected route
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
