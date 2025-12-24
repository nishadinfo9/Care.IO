import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoute = ["/booking", "/my-booking", "/service"];

export async function proxy(req) {
  const token = await getToken({ req });
  const isAuthenticated = Boolean(token);
  const isAdmin = token?.role === "admin";
  const pathname = req.nextUrl.pathname;

  const isPrivateRoute = privateRoute.some((route) =>
    pathname.startsWith(route)
  );

  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/booking/:path*", "/my-booking/:path*", "/service/:path*"],
};
