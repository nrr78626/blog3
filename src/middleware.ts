import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
    const token = cookies().get("authtoken")

    if (request.nextUrl.pathname.startsWith("/Dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/Login", request.url))
        }
    }
} 