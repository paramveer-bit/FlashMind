import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server";
import query from "@/helpers/connectDb";
// import { getServerSession } from "next-auth";


export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        const { tag } = await req.json()


        if (!session?.user) {
            return NextResponse.json({ message: "No Logged in user found", success: false }, { status: 401 })
        }

        const email = session.user.email

        const querySql1 = "SELECT * FROM users WHERE email = ?"
        const [existingUser] = await query({ query: querySql1, values: [email] })
        console.log(existingUser)
        if (!existingUser) {
            return NextResponse.json({ message: "No user found in database", success: false }, { status: 401 })
        }

        const owner = existingUser.uid


        const quesryToCreate = "SELECT * FROM cards WHERE tag = ? AND owner = ?"
        const values = [tag, owner]

        const res = await query({ query: quesryToCreate, values })

        if (res.length == 0) {
            return NextResponse.json({ mesaage: "No Card found with this Tag", success: false }, { status: 404 })

        }



        return NextResponse.json({ mesaage: "Card Found SuccessFully", success: true, card: res }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong while Reading card for this tag", success: false }, { status: 500 })
    }



}