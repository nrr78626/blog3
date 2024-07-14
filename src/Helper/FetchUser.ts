import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export interface TokenType {
    token: any
}

const fetchUser = async (request: NextRequest) => {
    try {
        const token = await request.cookies.get("authtoken")?.value || ""

        if (!token) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        const user = jwt.verify(token.toString(), process.env.NEXT_PUBLIC_SECRET_KEY!)

        if (!user) {
            return NextResponse.redirect(new URL("/", request.url))
        }
        return user

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}

export default fetchUser