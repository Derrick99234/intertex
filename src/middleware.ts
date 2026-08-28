import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin") {
    const adminToken =
      req.cookies.get("adminToken")?.value ||
      req.headers.get("authorization")?.split(" ")[1] ||
      null;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    // Defer JWT verification to backend APIs — presence is enough for routing.
    // This avoids ADMIN_JWT_SECRET mismatch between Vercel and Render.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
