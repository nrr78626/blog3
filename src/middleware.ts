import { NextRequest, NextResponse } from "next/server";
import User from "./Models/User";
import connectToDb from "./Database/db";


export async function middleware(request: NextRequest) {
    const token = request.cookies.get("authtoken")?.value || ""

    if (request.nextUrl.pathname.startsWith("/Dashboard")) {
        if (!token) {
            return NextResponse.redirect(new URL("/Login", request.url))
        }
    }
}