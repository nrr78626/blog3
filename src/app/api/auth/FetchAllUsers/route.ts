import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/User";
import connectToDb from "@/Database/db";

export async function GET(request: NextRequest) {
    try {
        connectToDb()
        const user = await User.find({})
        return NextResponse.json({ success: true, msg: "Succeded", user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}