import { NextResponse, NextRequest } from "next/server";
import User from "@/Models/User";
import connectToDb from "@/Database/db";
import fetchUser from "@/Helper/FetchUser";
import roles from "@/Models/Roles/Roles";

export async function DELETE(request: NextRequest) {
    try {
        connectToDb()
        const adminId: any = await fetchUser(request)

        const tokenId = await request.headers.get("token")

        if (adminId.role != roles.superuser || adminId.isVerified == false || adminId.id == tokenId) {
            return NextResponse.json({ success: false, msg: "Not authorised" }, { status: 401 })
        }

        let user = await User.findById({ _id: tokenId })

        if (!user) {
            return NextResponse.json({ success: false, msg: "Not found" }, { status: 404 })
        }

        user = await User.findByIdAndDelete(user._id)

        return NextResponse.json({ success: true, msg: "Deleted", user: user._id }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}