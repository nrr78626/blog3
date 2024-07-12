import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/User";
import connectToDb from "@/Database/db";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import roles from "@/Models/Roles/Roles";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        connectToDb()
        const { email, password } = await request.json()

        const response = NextResponse

        if (!email || !password || email === "" || password === "") {
            return response.json({ success: false, msg: "Fill all details" }, { status: 404 })
        }

        const user = await User.findOne({ email })

        if (!user || user.isVerified === false || user.role == roles.user) {
            return response.json({ success: false, msg: "Need help ?" }, { status: 401 })
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            return response.json({ success: false, msg: "Bad Credintials" }, { status: 401 })
        }

        const payload = {
            id: user._id,
            role: user.role,
            isVerified: user.isVerified
        }

        const authtoken = jwt.sign(payload, process.env.NEXT_PUBLIC_SECRET_KEY!)

        await cookies().set({ name: "authtoken", value: authtoken, httpOnly: true, path: "/" })
       
        return response.json({ success: true, msg: "Logged In" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}