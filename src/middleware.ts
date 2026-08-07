// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/stores") && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if (pathname.startsWith("/admin") && role !== "SUPER_ADMIN") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/addresses/:path*",
    "/stores/:path*",
    "/admin/:path*",
  ],
};
