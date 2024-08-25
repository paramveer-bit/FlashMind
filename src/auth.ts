
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
// import query from "@/helpers/connectDb";
import axios from "axios";
import { db } from "@vercel/postgres"
import { userTable } from "@/helpers/connectDb";



export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [Google],
    callbacks: {
        async signIn({ profile }) {

            const email = profile?.email
            const name = profile?.name
            console.log(name, email);
            const client = await db.connect()
            try {
                if (!email || !name) {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11")
                    return false
                }

                await client.query(userTable)

                const querySql1 = "SELECT * FROM users WHERE email = $1"
                const existingUser: any[] = (await client.query(querySql1, [email])).rows

                console.log(existingUser)

                if (existingUser.length != 0) {
                    console.log("User already exists++++++++++++++++++++++++++++++++")
                    return true
                }

                const querySql = "INSERT INTO users(email,name) VALUES( $1 ,$2 )"
                const values = [email, name]

                const res = await client.query(querySql, values)
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
})