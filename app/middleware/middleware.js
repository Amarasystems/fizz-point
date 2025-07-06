import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export function middleware(request) {
  const accessToken = request.cookies.get("accessToken");

  if (request.nextUrl.pathname.startsWith("/adminDashboard")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      const user = jwt.verify(accessToken, SECRET_KEY);
      if (user.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/", request.url)); 
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/adminDashboard/:path*"],
};
