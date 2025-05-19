import Cookies from "js-cookie";
import type { Session } from "@/types/auth";

export function getAuthCookie(): Session | null {
  const authCookie = Cookies.get("auth");
  return authCookie ? JSON.parse(authCookie) : null; // returns the raw JSON string or undefined
}
export function getAccessToken(): string | undefined {
  return getAuthCookie()?.accessToken;
}

export function getRefreshToken(): string | undefined {
  return getAuthCookie()?.refreshToken;
}

export function setTokens(accessToken: string, refreshToken: string): void {
  // Set cookies with secure flag and HTTP-only attribute
  let AuthCookie = getAuthCookie();

  if (AuthCookie) AuthCookie.accessToken = accessToken;
  if (AuthCookie) AuthCookie.refreshToken = refreshToken;
  Cookies.set("auth", JSON.stringify(AuthCookie), {
    secure: true,
    sameSite: "strict",
  });
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
}
