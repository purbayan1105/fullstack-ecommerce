import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const adminAuthToken = request.cookies.get("adminauthToken")?.value;
  const userAuthToken = request.cookies.get("userauthtoken")?.value;

  const pathname = request.nextUrl.pathname;

  // Admin routes protection
  if (pathname.startsWith("/admin/addproducts")) {
    if (!adminAuthToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Redirect admin login if already authenticated
  if (pathname === "/admin") {
    if (adminAuthToken) {
      return NextResponse.redirect(new URL("/admin/addproducts", request.url));
    }
  }

  if (pathname === "/favourites") {
    if (!userAuthToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // API routes protection
  if (pathname.startsWith("/buy-item")) {
    if (!userAuthToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  // Dynamic user cart page protection
  const userCartRegex = /^\/[^/]+\/cart$/;
  if (userCartRegex.test(pathname)) {
    if (!userAuthToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const userOrderregex = /^\/[^/]+\/your-orders$/;
  if (userOrderregex.test(pathname)) {
    if (!userAuthToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/addtocartApi",
    "/api/favouriteApi",
    "/:path*/cart", // Matches dynamic cart paths like "/[email]/cart",
    "/favourites",
    "/buy-item/:path*",
    "/:path*/your-orders",
  ],
};
