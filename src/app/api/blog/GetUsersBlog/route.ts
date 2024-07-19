import { NextRequest, NextResponse } from "next/server";
import Blog from "@/Models/Blog";
import connectToDb from "@/Database/db";

export async function GET(request: NextRequest) {
    try {
        connectToDb()
        const blogs = await Blog.find()
        return NextResponse.json({ success: true, blogs }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}