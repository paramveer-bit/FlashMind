import mysql from "mysql2/promise";
import { RowDataPacket } from "mysql2";

const pool = mysql.createPool({
    uri: process.env.CONNECTION_URI,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const query = async ({ query, values = [] }: {
    query: string,
    values: any[]
}) => {
    try {
        const [res] = await pool.execute(query, values);
        return res as RowDataPacket[];
    } catch (error: any) {
        console.log("Something went wrong while executing query", error);
        throw error;
    }
}

export default query;
