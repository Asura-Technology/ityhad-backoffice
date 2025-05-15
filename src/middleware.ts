import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type UserRole = "admin" | "school" | "doctor" | "student";

// Define the role-based access rules
const roleAccessRules: Record<UserRole, string[]> = {
  admin: ["*"], // Admin can access everything
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

  // Allow access to public paths without any checks
  if (
    publicPaths.some(
      (publicPath) => path === publicPath || path.startsWith(publicPath + "/")
    )
  ) {
    return NextResponse.next();
  }

  const auth = request.cookies.get("auth");

  // If no auth cookie and trying to access protected route, redirect to login
  if (!auth) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", path);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const user = JSON.parse(auth.value);
    const userRole = user.roles?.[0] as UserRole;

    // Check if the user has access to the requested path
    const allowedPaths = roleAccessRules[userRole] || [];
    const hasAccess = allowedPaths.some(
      (allowedPath: string) =>
        allowedPath === "*" || // Admin has access to everything
        path === allowedPath ||
        path.startsWith(allowedPath + "/")
    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If there's an error parsing the auth cookie, clear it and redirect to login
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
