
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import query from "@/helpers/connectDb";
import axios from "axios";

const trustedHosts = ['localhost:30'];


export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [Google],
    callbacks: {
        async signIn({ profile }) {

            const email = profile?.email
            const name = profile?.name
            console.log(name, email);
            try {
                if (!email || !name) {
                    return false
                }

                const querySql1 = "SELECT * FROM users WHERE email = ?"
                const existingUser: any[] = await query({ query: querySql1, values: [email] })
                if (existingUser.length != 0) {
                    return true
                }

                const querySql = "INSERT INTO users(email,name) VALUES( ? ,? )"
                const values = [email, name]

                const res = await query({ query: querySql, values })
                return true
            } catch (error) {
                console.log(error);
                return false
            }
        }
    }
})