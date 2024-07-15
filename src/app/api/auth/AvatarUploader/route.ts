import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/User";
import connectToDb from "@/Database/db";
import fetchUser from "@/Helper/FetchUser";
import UploadImage from "@/Helper/Cloudinary";
import roles from "@/Models/Roles/Roles";


export async function PUT(request: NextRequest) {
    try {
        connectToDb()
        const { id, role, isVerified }: any = await fetchUser(request)
        const formData = await request.formData()

        let user = await User.findById({ _id: id })
        if (!user) {
            return NextResponse.json({ success: false, msg: "Not found" }, { status: 404 })
        }

        if (role == roles.user) {
            return NextResponse.json({ success: false, msg: "User not verified" }, { status: 401 })
        }

        if (isVerified == false) {
            return NextResponse.json({ success: false, msg: "User not verified" }, { status: 401 })
        }

        const avatar = formData.get("avatar") as unknown as File;

        const data: any = await UploadImage(avatar, "/images/usersImage")

        let newAvatar: any = {}

        if (data) {
            newAvatar = data.url
        }

        user = await User.findByIdAndUpdate(user._id, { $set: { avatar: newAvatar } }, { new: true })

        return NextResponse.json({ success: true, msg: "Updated" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}