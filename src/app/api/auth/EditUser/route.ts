import { NextRequest, NextResponse } from "next/server";
import User from "@/Models/User";
import roles from "@/Models/Roles/Roles";
import connectToDb from "@/Database/db";
import { cookies } from "next/headers";

export async function PUT(request: NextRequest) {
    // try {
    connectToDb()

    const {id} = await request.json()


    // } catch (error) {
    //     return NextResponse.json({success:false,msg:"Internal Server Error"},{status:500})
    // }
}