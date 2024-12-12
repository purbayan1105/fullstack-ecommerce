import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminAuthToken = request.cookies.get("adminauthToken")?.value;

  const adminProductAccessPath =
    request.nextUrl.pathname.startsWith("/admin/addproducts");

  if (adminProductAccessPath) {
    if (!adminAuthToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  const adminaccessLogin = request.nextUrl.pathname === "/admin";
  if (adminaccessLogin) {
    if (adminAuthToken) {
      return NextResponse.redirect(new URL("/admin/addproducts", request.url));
    }
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
