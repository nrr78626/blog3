import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/Database/db";
import Blog from "@/Models/Blog";
import fetchUser from "@/Helper/FetchUser";
import roles from "@/Models/Roles/Roles";
import User from "@/Models/User";
import UploadImage from "@/Helper/Cloudinary";

export async function POST(request: NextRequest) {
    try {
        connectToDb()
        const formData = await request.formData()
        const title = await formData.get("title")
        const description = await formData.get("description")
        const content = await formData.get("content")
        const category = await formData.get("category")
        const images = await formData.get("images") as unknown as File

        if (!title || !description || !content || !images || !category || category === "" || title === "" || description === "" || content === "") {
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

        const image: any = await UploadImage(images, "images/BlogImage")

        const blog = new Blog({
            auther: auther._id,
            title,
            description,
            category,
            content,
            images: image.url,
            autherName: auther.name
        })

        await blog.save()
        return NextResponse.json({ success: true, msg: "Added", blog, formData }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}