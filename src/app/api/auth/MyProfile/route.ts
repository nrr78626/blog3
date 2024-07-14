import { NextResponse, NextRequest } from "next/server";
import connectToDb from "@/Database/db";
import fetchUser from "@/Helper/FetchUser";
import roles from "@/Models/Roles/Roles";
import User from "@/Models/User";

export async function GET(request: NextRequest) {
    try {
        connectToDb()
        const { id, role, isVerified }: any = await fetchUser(request)

        if (role === roles.user || isVerified === false) {
            return NextResponse.json({ success: false, msg: "Not authorised" }, { status: 401 })
        }

        const user = await User.findOne({ _id: id }).select("-password")

        if (!user) {
            return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true, user }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}