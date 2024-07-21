import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/Database/db";
import Blog from "@/Models/Blog";
import fetchUser from "@/Helper/FetchUser";
import roles from "@/Models/Roles/Roles";
import User from "@/Models/User";
import Cloudinary_API from "@/Helper/Cloudinary/Cloudinary_API";

export async function POST(request: NextRequest) {
    try {
        connectToDb()
        const { title, description, content } = await request.json()

        if (!title || !description || !content || title === "" || description === "" || content === "") {
            return NextResponse.json({ success: false, msg: "Please fill all fields" }, { status: 404 })
        }

        const user: any = await fetchUser(request)

        if (!user) {
            return NextResponse.redirect(new URL("/", request.url))
        }

        const { id, role, isVerified } = user

        if (role == roles.user) {
            return NextResponse.json({ success: false, msg: "not authorised" }, { status: 401 })
        }

        if (isVerified === false) {
            return NextResponse.json({ success: false, msg: "Not verified" }, { status: 401 })
        }

        const auther = await User.findById({ _id: id })

        if (!auther) {
            return NextResponse.json({ success: false, msg: "Auther not found" }, { status: 404 })
        }

        const blog = new Blog({
            auther: auther._id,
            title,
            description,
            content,
            autherName: auther.name
        })

        await blog.save()
        return NextResponse.json({ success: true, msg: "Added", blog }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}