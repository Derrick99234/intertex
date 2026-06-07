import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    const adminToken = req.cookies.get("adminToken")?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    if (!ADMIN_JWT_SECRET) {
      console.error("ADMIN_JWT_SECRET not configured");
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    try {
      const secretKey = new TextEncoder().encode(ADMIN_JWT_SECRET);
      await jwtVerify(adminToken, secretKey);
    } catch {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
