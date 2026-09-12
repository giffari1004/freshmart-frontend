import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax", // sekarang same-site karena diset oleh vercel.app untuk vercel.app
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("token");
  return res;
}
