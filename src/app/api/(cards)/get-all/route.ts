import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres"
import { cardTable, userTable } from "@/helpers/connectDb";


export async function GET(req: NextRequest) {
    const client = await db.connect()

    try {
        const session = await auth()

        await client.query(cardTable)
        await client.query(userTable)


        if (!session?.user) {
            return NextResponse.json({ message: "No Logged in user found", success: false }, { status: 401 })
        }

        const email = session.user.email

        const querySql1 = "SELECT * FROM users WHERE email = $1"
        const [existingUser] = (await client.query(querySql1, [email])).rows

        if (!existingUser) {
            return NextResponse.json({ message: "No user found in database", success: false }, { status: 401 })
        }

        const owner = existingUser.uid


        const quesryToCreate = "SELECT * FROM cards WHERE owner = $1"
        const values = [owner]

        const res = (await client.query(quesryToCreate, values)).rows

        if (res.length == 0) {
            return NextResponse.json({ mesaage: "No Card found For this user", success: false }, { status: 401 })

        }



        return NextResponse.json({ mesaage: "All Card Found SuccessFully", success: true, cards: res }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong while Reading this card", success: false }, { status: 500 })
    }



}