import { NextRequest, NextResponse } from "next/server";
import Blog from "@/Models/Blog";
import connectToDb from "@/Database/db";

export async function GET(request: NextRequest, { params }: { params: { custompath: any } }) {
    try {
        const { custompath } = await params

        if (!custompath) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        if (custompath == "Any") {
            connectToDb()
            let blogs = await Blog.find({})
            return NextResponse.json({ success: true, blogs }, { status: 200 })
        } else if (custompath != "Any") {
            connectToDb()
            let blogs = await Blog.find({ category: custompath })
            return NextResponse.json({ success: true, blogs }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}