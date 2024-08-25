import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
import { db } from "@vercel/postgres"
import { cardTable } from "@/helpers/connectDb";


export async function GET(req: NextRequest) {
    const client = await db.connect()
    try {
        const session = await auth()




        if (!session?.user) {
            return NextResponse.json({ message: "No Logged in user found", success: false }, { status: 401 })
        }

        const email = session.user.email
        await client.query(cardTable)
        const querySql1 = "SELECT * FROM users WHERE email = $1"
        const [existingUser] = (await client.query(querySql1, [email])).rows

        if (!existingUser) {
            return NextResponse.json({ message: "No user found in database", success: false }, { status: 401 })
        }

        const owner = existingUser.uid


        const quesryToCreate = "SELECT DISTINCT tag FROM cards WHERE owner = $1"
        const values = [owner]

        const res = (await client.query(quesryToCreate, [owner])).rows
        console.log(res)
        if (res.length == 0) {
            return NextResponse.json({ mesaage: "No Tags found For this user", success: true }, { status: 200 })

        }



        return NextResponse.json({ mesaage: "All Tags Found SuccessFully", success: true, tags: res }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong while Getting all tags", success: false }, { status: 500 })
    }



}