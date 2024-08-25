import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres"
import { cardTable, userTable } from "@/helpers/connectDb";


export async function POST(req: NextRequest) {
    const client = await db.connect()

    try {
        const session = await auth()
        await client.query(cardTable)
        await client.query(userTable)
        const { fid } = await req.json()



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


        const quesryToCreate = "SELECT * FROM cards WHERE fid = $1 AND owner = $2"
        const values = [fid, owner]

        const res = (await client.query(quesryToCreate, values)).rows

        if (res.length == 0) {
            return NextResponse.json({ mesaage: "No Card found with this FID", success: false }, { status: 401 })

        }

        const queryToDelete = "DELETE FROM cards WHERE fid = $1 AND owner = $2"
        const deleted = (await client.query(queryToDelete, values))

        if (!deleted) {
            return NextResponse.json({ message: "Error in deleting this card", success: false }, { status: 500 })
        }


        return NextResponse.json({ mesaage: "Card deleted SuccessFully", success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong while Deleting this card", success: false }, { status: 500 })
    }



}