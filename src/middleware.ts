// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for auth token in cookies
    const authToken = request.cookies.get("authToken");
    const userRole = request.cookies.get("userRole");

    if (!authToken || !userRole || userRole.value !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      // Verify token using jose
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(authToken.value, secret);

      // ✅ Token is valid → continue
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
