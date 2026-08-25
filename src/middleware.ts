import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value;
  const isLoggedIn = Boolean(role);
  const { pathname } = req.nextUrl;

  // Halaman personal customer: wajib login (role apa saja)
  if (
    (pathname.startsWith("/profile") || pathname.startsWith("/addresses")) &&
    !isLoggedIn
  ) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Dashboard admin: SUPER_ADMIN & STORE_ADMIN boleh masuk
  if (
    pathname.startsWith("/admin") &&
    role !== "SUPER_ADMIN" &&
    role !== "STORE_ADMIN"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Store Management (CRUD toko, assign admin): SUPER_ADMIN only
  if (pathname.startsWith("/admin/stores") && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/addresses/:path*", "/admin/:path*"],
};
