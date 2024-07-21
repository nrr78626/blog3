import { NextRequest, NextResponse } from "next/server";
import Blog from "@/Models/Blog";
import connectToDb from "@/Database/db";

export async function GET(request: NextRequest, { params }: { params: { slug: any } }) {
    try {
        connectToDb()
        const { slug } = params
        const blog = await Blog.findById({ _id: slug })

        if (!blog) {
            return NextResponse.json({ success: false, msg: "Not found" }, { status: 500 })
        }

        return NextResponse.json({success:true,blog},{status:200})
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}