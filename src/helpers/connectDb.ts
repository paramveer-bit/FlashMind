import { error } from "console";
import mysql from "mysql2/promise";
import { RowDataPacket } from "mysql2";
// import pool from "./pool";

export default async function query({ query, values }: { query: String, values: any[] }) {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
    if (typeof query !== 'string' || !Array.isArray(values)) {
        console.log("dtfgvbhjnkmlkguyfygvbhjnk")
        throw new Error('Invalid arguments: query must be a string and values must be an array');
    }

    try {
        console.log(query);
        // console.log(values);
        const [rows] = await pool.query<RowDataPacket[]>(query, values);
        return rows;
    } catch (err) {
        console.error('Error querying the database:', err);
        throw err;
    }
}