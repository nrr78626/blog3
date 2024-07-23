import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/User";
import roles from "@/Models/Roles/Roles";
import connectToDb from "@/Database/db";
import { cookies } from "next/headers";
import fetchUser from "@/Helper/FetchUser";

export async function PUT(request: NextRequest) {
    // try {
    connectToDb()
    const { userId, userRole }: any = await request.json()
    if (!userId || !userRole || userId === "" || userRole === "") {
        return NextResponse.json({ success: false, msg: "User not found" }, { status: 404 })
    }
    const { role, id, isVerified }: any = await fetchUser(request)

    if (role != roles.superuser || id == userId || isVerified == false) {
        return NextResponse.json({ success: false, msg: "Not authorised" }, { status: 401 })
    }

    let user = await User.findById({ _id: userId })

    if (!user) {
        return NextResponse.json({ success: false, msg: "Not found" }, { status: 404 })
    }

    user = await User.findByIdAndUpdate(userId, { $set: { role: userRole, isVerified: true } }, { new: true })
    return NextResponse.json({ success: true,msg:"Updated", role: user.role }, { status: 200 })
    // } catch (error) {
    //     return NextResponse.json({success:false,msg:"Internal Server Error"},{status:500})
    // }
}