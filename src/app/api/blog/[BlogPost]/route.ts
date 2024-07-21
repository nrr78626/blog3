import { NextRequest, NextResponse } from "next/server";
import Blog from "@/Models/Blog";
import fetchUser from "@/Helper/FetchUser";
import connectToDb from "@/Database/db";

export async function GET(request: NextRequest, { params }: { params: { BlogPost: any } }) {
    try {
        connectToDb()
        const { BlogPost }: any = params

        if (!BlogPost) {
            return NextResponse.redirect(new URL("/Dashbosrd/AllBlogs", request.url))
        }

        const loggedInUser = await fetchUser(request)

        if (!loggedInUser) {
            return NextResponse.redirect(new URL("/Login", request.url))
        }

        const blog = await Blog.findById({ _id: BlogPost })

        return NextResponse.json({ success: true, blog }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}