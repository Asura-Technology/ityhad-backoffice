import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Session } from "@/types/auth";

type UserRole = "super-admin" | "school" | "doctor" | "student";

// Define the role-based access rules
const roleAccessRules: Record<UserRole, string[]> = {
  "super-admin": ["*"], // Admin can access everything
  school: [
    "/dashboard",
    "/schools",
    "/students",
    "/reports",
    "/testimonies",
    "/settings",
  ],
  doctor: ["/dashboard", "/doctors", "/students", "/testimonies", "/settings"],
  student: ["/dashboard", "/students", "/testimonies", "/settings"],
};

// Public paths that don't require authentication
const publicPaths = ["/login", "/register", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(`[Middleware] Accessing path: ${path}`);

  // Allow access to public paths without any checks
  if (
    publicPaths.some(
      (publicPath) => path === publicPath || path.startsWith(publicPath + "/")
    )
  ) {
    console.log(`[Middleware] Public path access granted: ${path}`);
    return NextResponse.next();
  }

  const auth = request.cookies.get("auth");
  console.log(`[Middleware] Auth cookie present: ${!!auth}`);

  // If no auth cookie and trying to access protected route, redirect to login
  if (!auth) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);
    console.log(`[Middleware] No auth, redirecting to: ${loginUrl.toString()}`);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const authUser: Session = JSON.parse(auth.value);
    const userRole = authUser.user.defaultRole as UserRole;
    console.log(`[Middleware] User role: ${userRole}`);

    // Check if the user has access to the requested path
    const allowedPaths = roleAccessRules[userRole] || [];
    console.log(`[Middleware] Allowed paths for ${userRole}:`, allowedPaths);

    const hasAccess = allowedPaths.some(
      (allowedPath: string) =>
        allowedPath === "*" || // Admin has access to everything
        path === allowedPath ||
        path.startsWith(allowedPath + "/")
    );
    console.log(`[Middleware] Access granted: ${hasAccess}`);

    if (!hasAccess) {
      console.log(`[Middleware] Access denied, redirecting to dashboard`);
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If there's an error parsing the auth cookie, clear it and redirect to login
    console.error(`[Middleware] Error parsing auth cookie:`, error);
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth");
    return response;
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
