import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

const fetchUser = async (request: NextRequest) => {
    try {
        const token = cookies().get("authtoken")

        if (!token) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        const user = jwt.verify(token.toString(), process.env.NEXT_PUBLIC_SECRET_KEY!)

        if(!user){
            return NextResponse.redirect(new URL("/",request.url))
        }

        return user

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}

export default fetchUser