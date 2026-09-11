import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function getRoleFromToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.role as string;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = await getRoleFromToken(token);
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
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  if (pathname.startsWith("/admin/stores") && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/products", req.url));
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
