import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("authtoken")?.value || ""

    if (request.nextUrl.pathname.startsWith("/Dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/Login", request.url))
        }
    }
}