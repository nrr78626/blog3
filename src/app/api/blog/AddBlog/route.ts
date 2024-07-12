import { NextRequest, NextResponse } from "next/server";
import connectToDb from "@/Database/db";
import Blog from "@/Models/Blog";
import fetchUser from "@/Helper/FetchUser";
import roles from "@/Models/Roles/Roles";

export async function POST(request: NextRequest) {
    // try {
        connectToDb()
        const { title, description, content } = await request.json()

        if(!title || !description || !content || title==="" || description==="" || content===""){
            return NextResponse.json({success:false,msg:"Please fill all fields"},{status:404})
        }

        const user:any = await fetchUser(request)

        if(!user){
            return NextResponse.redirect(new URL("/", request.url))
        }

        const {id,role,isVerified} = user

        if(role==roles.user){
            return NextResponse.json({success:false,msg:""})
        }        
        return NextResponse.json({ success: false, msg: "Added" }, { status: 200 })
    // } catch (error) {
    //     return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 })
    // }
}