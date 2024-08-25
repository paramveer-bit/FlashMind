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
        const { question, answer, tag } = await req.json()


        if (!session?.user) {
            return NextResponse.json({ message: "No Logged in user found", success: false }, { status: 401 })
        }

        const email = session.user.email
        console.log(email)

        const querySql1 = "SELECT * FROM users WHERE email = $1"
        const [existingUser] = (await client.query(querySql1, [email])).rows
        // console.log(existingUser)
        if (!existingUser) {
            return NextResponse.json({ message: "No user found in database", success: false }, { status: 401 })
        }

        const owner = existingUser.uid


        const quesryToCreate = "INSERT INTO cards(question,answer,tag,owner) VALUES( $1,$2,$3,$4)"
        const values = [question, answer, tag, owner]

        const res = (await client.query(quesryToCreate, values))
        console.log("-------------------------------------")
        console.log(res)

        // console.log(session)

        return NextResponse.json({ mesaage: "New Card Created SuccessFully", success: true, }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong while creating new message", success: false }, { status: 500 })
    }



}