import { error } from "console"
import mysql from "mysql2/promise"
import { RowDataPacket } from "mysql2";


const query = async ({ query, values = [] }: {
    query: string,
    values: any[]
}) => {
    const connection = await mysql.createConnection({
        uri: process.env.CONNECTION_URI,

    })
    try {
        const [res] = await connection.execute(query, values)
        connection.end()
        return res as RowDataPacket[]
    } catch (error: any) {
        console.log("Somthing wrong happen while executing query")
        throw Error(error.mesaage)
        // return { error }
    }



}

export default query