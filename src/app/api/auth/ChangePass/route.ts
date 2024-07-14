import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/Database/db";
import fetchUser from "@/Helper/FetchUser";
import User from "@/Models/User";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function PUT(request: NextRequest) {
    try {
        connectToDb()
        const passUser: any = await fetchUser(request)
        const { oldpass, newpass, confpass }: any = await request.json()

        if (!oldpass || !newpass || !confpass || oldpass === "" || newpass === "" || confpass === "") {
            return NextResponse.json({ success: false, msg: "Fill all fields" }, { status: 404 })
        }

        if (!passUser) {
            return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 })
        }

        let user = await User.findOne({ _id: passUser.id })

        if (!user) {
            return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 })
        }

        const comparePassword = await bcrypt.compare(oldpass, user?.password)

        if (!comparePassword) {
            return NextResponse.json({ success: false, msg: "Password not matched" }, { status: 401 })
        }

        if (passUser.id != user._id) {
            return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(newpass, salt)

        let newPass = {}

        if (newpass) {
            newPass = hashPass
        }

        user = await User.findByIdAndUpdate(passUser?.id, { $set: { password: newPass } }, { new: true })

        const payload = {
            id: user._id,
            role: user.role,
            isVerified: user.isVerified
        }

        const authtoken = jwt.sign(payload, process.env.NEXT_PUBLIC_SECRET_KEY!)

        await cookies().set({ name: "authtoken", value: authtoken, httpOnly: true, path: "/" })

        return NextResponse.json({ success: true, msg: "Changed" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}