import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/User";
import connectToDb from "@/Database/db";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function PUT(request: NextRequest) {
    try {
        connectToDb()
        const { password, cpassword } = await request.json()
        const token = await request.headers.get('token')

        if (!password || !cpassword || password === "" || cpassword === "") {
            return NextResponse.json({ success: false, msg: "Fill all fields" }, { status: 404 })
        }

        if (!token) {
            return NextResponse.json({ success: false, msg: "Token error" }, { status: 401 })
        }

        let user = await User.findOne({ forgetPasswordToken: token })

        if (!user) {
            return NextResponse.json({ success: false, msg: "Not found" }, { status: 404 })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password, salt)

        const payload = {
            id: user._id,
            role: user.role,
            isVerified: user.isVerified
        }

        const authtoken = jwt.sign(payload, process.env.NEXT_PUBLIC_SECRET_KEY!)

        user = await User.findByIdAndUpdate(user._id, { $set: { password: hashPass, forgetPasswordToken: undefined, forgetPasswordTokenExpiry: undefined } }, { new: true })

        return NextResponse.json({ success: true, msg: "Updated", authtoken }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}