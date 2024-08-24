import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";
import query from "@/helpers/connectDb";
// import { getServerSession } from "next-auth";


export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        const { question, answer, tag } = await req.json()


        if (!session?.user) {
            return NextResponse.json({ message: "No Logged in user found", success: false }, { status: 401 })
        }

        const email = session.user.email

        const querySql1 = "SELECT * FROM users WHERE email = ?"
        const [existingUser] = await query({ query: querySql1, values: [email] })
        // console.log(existingUser)
        if (!existingUser) {
            return NextResponse.json({ message: "No user found in database", success: false }, { status: 401 })
        }

        const owner = existingUser.uid


        const quesryToCreate = "INSERT INTO cards(question,answer,tag,owner) VALUES( ?,?,?,?)"
        const values = [question, answer, tag, owner]

        const res = await query({ query: quesryToCreate, values })

        console.log(res)

        // console.log(session)

        return NextResponse.json({ mesaage: "New Card Created SuccessFully", success: true, }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong while creating new message", success: false }, { status: 500 })
    }



}