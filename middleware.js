// import { NextResponse } from "next/server";
// import { getSession } from "./lib/lib";

// export async function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // Define protected paths
//   const protectedPaths = ["/Home", "/dashboard"];

//   // Get session data
//   const session = await getSession();

//   // Redirect logic
//   if (pathname === "/") {
//     // Redirect to /Home if a session exists
//     if (session) {
//       return NextResponse.redirect(new URL("/Home", request.url));
//     }
//   } else if (pathname === "/Home") {
//     // Redirect to / if no session exists
//     if (!session) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   } else if (protectedPaths.includes(pathname)) {
//     // Redirect to / if trying to access a protected path without a session
//     if (!session) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   // Continue to the requested page if no redirect is needed
//   return NextResponse.next();
// }

export async function middleware($request) {}
