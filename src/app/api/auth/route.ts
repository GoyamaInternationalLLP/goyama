import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword, generateToken, serverAuthUtils } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (action === "login") {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await verifyPassword(password, user.password))) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const token = generateToken(user.id, user.role);

      // Create response with cookies
      const response = NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });

      // Set auth cookies
      const cookies = serverAuthUtils.setAuthCookies(token, user.role);
      cookies.forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });

      return response;
    }

    if (action === "register") {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: "USER",
        },
      });

      const token = generateToken(user.id, user.role);

      // Create response with cookies
      const response = NextResponse.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });

      // Set auth cookies
      const cookies = serverAuthUtils.setAuthCookies(token, user.role);
      cookies.forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });

      return response;
    }

    if (action === "logout") {
      // Clear auth cookies
      const response = NextResponse.json({ success: true });
      const cookies = serverAuthUtils.clearAuthCookies();
      cookies.forEach((cookie) => {
        response.headers.append("Set-Cookie", cookie);
      });
      return response;
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
