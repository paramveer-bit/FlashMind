import { NextRequest, NextResponse } from "next/server";
import query from "@/helpers/connectDb";



export async function POST(req: NextRequest) {
    try {
        const { email, name } = await req.json();
        console.log("Helooo inside api calling")

        const querySql1 = "SELECT * FROM users WHERE email = ?"

        const existingUser: any[] = await query({ query: querySql1, values: [email] })
        if (existingUser.length != 0) {
            return NextResponse.json({ message: "User Already exists", success: true, data: existingUser }, { status: 200 })

        }

        const querySql = "INSERT INTO users(email,name) VALUES( ? ,? )"
        const values = [email, name]

        if (!email || !name) {
            return NextResponse.json({ message: "Name and Email both are required", success: false }, { status: 400 });
        }
        const res = await query({ query: querySql, values })


        return NextResponse.json({ message: "User created succesfully", success: true, data: res }, { status: 200 })
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error || "Some error occures while creating new user", success: false }, { status: 500 })
    }

}