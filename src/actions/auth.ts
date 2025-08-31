"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword, generateToken, serverAuthUtils, authUtils } from "@/lib/auth";
import { cookies } from "next/headers";

// Login user
export async function loginUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      return {
        success: false,
        error: "Invalid credentials",
      };
    }

    const token = generateToken(user.id, user.role);

    serverAuthUtils.setAuthCookies(token, user.role);

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return {
      success: false,
      error: "Authentication failed",
    };
  }
}

// Register user
export async function registerUser(name: string, email: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "User already exists",
      };
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

    serverAuthUtils.setAuthCookies(token, user.role);

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: "Authentication failed",
    };
  }
}

// Logout user
export async function logoutUser() {
  try {
    // Clear cookies using the serverAuthUtils
    serverAuthUtils.clearAuthCookies();

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error logging out:", error);
    return {
      success: false,
      error: "Logout failed",
    };
  }
}

// Get current user from server-side cookies
export async function getCurrentUserAction() {
  try {
    const authToken = authUtils.getToken();

    if (!authToken) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    // Use the verifyToken function from auth.ts
    const { verifyToken } = await import("@/lib/auth");
    const decoded = verifyToken(authToken);

    if (!decoded) {
      return {
        success: false,
        error: "Invalid token",
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return {
      success: false,
      error: "Failed to get user data",
    };
  }
}
