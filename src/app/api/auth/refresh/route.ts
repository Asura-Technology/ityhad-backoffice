// src/app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import axiosClient from "@utils/axiosClient";
import type { Session } from "@/types/auth";

export async function POST(req: Request) {
  const { refreshToken } = await req.json();
  console.log('[RefreshToken] Received refresh token request');

  try {
    console.log('[RefreshToken] Attempting to refresh token with:', refreshToken?.slice(0, 10) + '...');
    const { data } = await axiosClient.post("/token", { refreshToken });
    console.log('[RefreshToken] Successfully received new tokens from server');
    
    const {
      accessToken,
      refreshToken: newRefresh,
      accessTokenExpiresIn,
      user,
    } = data as {
      accessToken: string;
      refreshToken: string;
      accessTokenExpiresIn: number;
      user: Session["user"];
    };

    // Calculate an absolute expiry
    const expiresAt = Date.now() + accessTokenExpiresIn * 1000;
    console.log('[RefreshToken] Token will expire at:', new Date(expiresAt).toISOString());

    // Build the new session
    const newSession: Session & { accessTokenExpiresAt: number } = {
      accessToken,
      refreshToken: newRefresh,
      refreshTokenId: data.refreshTokenId, // Add the missing required property
      accessTokenExpiresIn,
      user,
      accessTokenExpiresAt: expiresAt,
    };

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: "auth",
      value: JSON.stringify(newSession),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: accessTokenExpiresIn,
    });
    console.log('[RefreshToken] Successfully set new auth cookie');
    return res;
  } catch (error) {
    console.error('[RefreshToken] Error refreshing token:', error);
    const res = NextResponse.json({ ok: false }, { status: 401 });
    res.cookies.delete("auth");
    console.log('[RefreshToken] Deleted auth cookie due to error');
    return res;
  }
}
