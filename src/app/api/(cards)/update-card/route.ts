import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";
import query from "@/helpers/connectDb";
// import { getServerSession } from "next-auth";


export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        const { fid, question, answer, tag } = await req.json()


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


        const quesryToCreate = "SELECT * FROM cards WHERE fid = ? AND owner = ?"
        const values = [fid, owner]

        const res = await query({ query: quesryToCreate, values })

        if (res.length == 0) {
            return NextResponse.json({ mesaage: "No Card found with this FID", success: false }, { status: 401 })

        }

        const updateQuery = "UPDATE cards SET question = ? , answer = ? , tag = ? WHERE fid = ? AND owner = ?"
        const updateValues = [question, answer, tag, fid, owner]

        const update = await query({ query: updateQuery, values: updateValues })

        console.log(update)


        return NextResponse.json({ mesaage: "Card updated SuccessFully", success: true }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong while Reading this card", success: false }, { status: 500 })
    }



}