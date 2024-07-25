import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/User";
import connectToDb from "@/Database/db";

export async function PUT(request: NextRequest) {
    try {
        connectToDb()

        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('token')
        console.log(query)
        const user = await User.findOne({ forgetPasswordToken: query })

        return NextResponse.json({ success: true, msg: "User present", user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}