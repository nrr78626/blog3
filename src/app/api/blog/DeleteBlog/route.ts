import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/Database/db";
import Blog from "@/Models/Blog";
import fetchUser from "@/Helper/FetchUser";
import roles from "@/Models/Roles/Roles";

export async function DELETE(request: NextRequest) {
    try {
        connectToDb()
        const currentuser = await fetchUser(request)
        const { role, isVerified }: any = currentuser
        if (role == roles.user || isVerified == false) {
            return NextResponse.json({ success: false, msg: "Not authorised" }, { status: 401 })
        }
        const userid = await request.headers.get("userid")
        let blog = await Blog.findById({ _id: userid })

        if (!blog) {
            return NextResponse.json({ success: false, msg: "Not found" }, { status: 404 })
        }

        blog = await Blog.findByIdAndDelete(blog._id)
        return NextResponse.json({ success: true, msg: "Deleted" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}