import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectToDb from "@/Database/db";
import User from "@/Models/User";

export async function POST(request: NextRequest) {
    try {
        connectToDb()
        const { name, email, password, age, contact } = await request.json()
        // Checking for empty data
        if (!name || !email || !password || !age || !contact || email == "" || password == "" || name == "" || age == "" || contact == "") {
            return NextResponse.json({ success: false, msg: "Fill all details" }, { status: 404 })
        }

        // Find User already exist
        let user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ success: false, msg: "already exists" }, { status: 401 })
        }

        //Convert password into hash via one way handshake method 
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(password, salt)

        //Create new User
        user = new User({
            email,
            name,
            password: secPass,
            age,
            contact
        })

        //Provide Json web token to user
        const payload = {
            id: user._id,
            role: user.role,
            isVerified: user.isVerified
        }

        const authtoken = jwt.sign(payload, process.env.NEXT_PUBLIC_SECRET_KEY!)

        // save user

        await user.save()

        return NextResponse.json({ success: true, msg: "Added", user }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    }
}