import { NextRequest, NextResponse } from "next/server";
import Blog from "@/Models/Blog";
import connectToDb from "@/Database/db";
import fetchUser from "@/Helper/FetchUser";
import roles from "@/Models/Roles/Roles";

export async function GET(request: NextRequest) {
    try {
        connectToDb()
        const { id, isVerified, role }: any = await fetchUser(request)

        if (isVerified == false) {
            return NextResponse.json({ success: false, msg: "Not authorised" }, { status: 401 })
        }

        if (role == roles.user) {
            return NextResponse.json({ success: false, msg: "Not authorised" }, { status: 401 })
        }

        const blogs = await Blog.find({ auther: id })

        return NextResponse.json({ success: true, blogs }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}