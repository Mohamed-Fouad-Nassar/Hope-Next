import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;
  const { pathname } = request.nextUrl;

  if (!token) {
    if (pathname.startsWith("/profile") || pathname.startsWith("/dashboard"))
      return NextResponse.redirect(new URL("/login", request.url));
  } else {
    if (
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/reset-password" ||
      pathname === "/verify-account" ||
      pathname === "/check-email"
    )
      return NextResponse.redirect(new URL("/", request.url));

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (payload && pathname.startsWith("/profile"))
        return NextResponse.next();
      else if (payload?.isAdmin && pathname.startsWith("/dashboard"))
        return NextResponse.next();
      else return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("JWT verification failed:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/check-email",
    "/reset-password",
    "/verify-account",
    "/profile/:path*",
    "/dashboard/:path*",
  ],
};
