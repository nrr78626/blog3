import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/User";
import fetchUser from "@/Helper/FetchUser";
import { cookies } from "next/headers";
import connectToDb from "@/Database/db";

export async function GET(request: NextRequest) {
    try {
        connectToDb()
        const { id }: any = await fetchUser(request)

        const user = await User.findOne({ _id: id })

        if (!user) {
            return NextResponse.json({ success: false }, { status: 404 })
        }

        cookies().delete({ name: "authtoken" })
        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 })
    }
}