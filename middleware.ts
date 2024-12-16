import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/encrypt";
import { cookies } from "next/headers";

export default async function ProtectedRoute(req: NextRequest) {
  const cookie = (await cookies()).get('session')?.value;

  let session = null;
  if (cookie) {
    session = await decrypt(cookie);
  }

  // If user is not authenticated
  if (!session?.userId) {
    // Allow access to home, login, and register pages only
    if (
      req.nextUrl.pathname === "/" ||
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register"
    ) {
      return NextResponse.next(); // Allow access
    } else {
      // Redirect unauthenticated users to the login page
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else {
    // User is authenticated
    // Redirect authenticated user from login or register pages to home
    if (
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow access to dashboard and other protected routes
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.next(); // Allow access
    }
  }

  // Fallback: if none of the conditions are met, continue to the next response
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/login", 
    "/register", 
    "/dashboard/:path*"
  ],
};
