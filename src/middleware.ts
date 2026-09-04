import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const isLoggedIn = Boolean(role);
  const { pathname } = req.nextUrl;

  if (
    (pathname.startsWith("/profile") ||
      pathname.startsWith("/addresses") ||
      pathname.startsWith("/cart")) &&
    !isLoggedIn
  ) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    pathname.startsWith("/admin") &&
    role !== "SUPER_ADMIN" &&
    role !== "STORE_ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/admin/stores") && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/addresses/:path*",
    "/cart/:path*",
    "/admin/:path*",
  ],
};
