import { error } from "console";
import mysql from "mysql2/promise";
import { RowDataPacket } from "mysql2";
import pool from "./pool";

export default async function query({ query, values }: { query: String, values: any[] }) {
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