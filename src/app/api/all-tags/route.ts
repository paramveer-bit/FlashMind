import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";
import query from "@/helpers/connectDb";
// import { getServerSession } from "next-auth";


export async function GET(req: NextRequest) {
    try {
        const session = await auth()


        if (!session?.user) {
            return NextResponse.json({ message: "No Logged in user found", success: false }, { status: 401 })
        }

        const email = session.user.email

        const querySql1 = "SELECT * FROM users WHERE email = ?"
        const [existingUser] = await query({ query: querySql1, values: [email] })

        if (!existingUser) {
            return NextResponse.json({ message: "No user found in database", success: false }, { status: 401 })
        }

        const owner = existingUser.uid


        const quesryToCreate = "SELECT DISTINCT tag FROM cards WHERE owner = ?"
        const values = [owner]

        const res = await query({ query: quesryToCreate, values })

        if (res.length == 0) {
            return NextResponse.json({ mesaage: "No Tags found For this user", success: true }, { status: 200 })

        }



        return NextResponse.json({ mesaage: "All Tags Found SuccessFully", success: true, tags: res }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong while Getting all tags", success: false }, { status: 500 })
    }



}