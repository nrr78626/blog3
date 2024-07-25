import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/User";
import connectToDb from "@/Database/db";
import sendEmail from "@/Helper/NodeMailer";
import { v4 as uuidv4 } from "uuid"

export async function PUT(request: NextRequest) {
    try {
        connectToDb()
        const { email } = await request.json()

        if (!email || email === "") {
            return NextResponse.json({ success: false, msg: "Please enter email" }, { status: 404 })
        }

        let user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ success: false, msg: "Not found" }, { status: 404 })
        }

        const token = await uuidv4()

        const confirmMail = await sendEmail({ token, email: user.email })

        if (!confirmMail?.response) {
            return NextResponse.json({ success: false, msg: "Please try again" }, { status: 404 })
        }

        user = await User.findByIdAndUpdate(user._id, { $set: { forgetPasswordToken: token, forgetPasswordTokenExpiry: Date.now() } }, { new: true })

        return NextResponse.json({ success: true, msg: "Check your mail" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: 500, msg: "Internal Server Error" }, { status: 500 })
    }
}