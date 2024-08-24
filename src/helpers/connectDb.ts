// import mysql from 'mysql2/promise';
import mysql from 'serverless-mysql';

import { RowDataPacket } from 'mysql2';

const parseDatabaseUrl = (url: string) => {
    const urlObj = new URL(url);
    return {
        host: urlObj.hostname,
        user: urlObj.username,
        password: urlObj.password,
        database: urlObj.pathname.slice(1), // Remove leading '/'
        port: Number(urlObj.port) || 3306
    };
};

const { host, user, password, database, port } = parseDatabaseUrl(process.env.CONNECTION_URI!);

// Create a connection using separate parameters
const connection = mysql({
    config: {
        host,
        user,
        password,
        database,
        port
    }
});


const query = async ({ query, values = [] }: { query: string, values: any[] }) => {
    try {
        console.log("##################################################")

        const res = await connection.query(query, values);
        console.log("------------------------------------------")
        return res as RowDataPacket[];
    } catch (error: any) {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(error)
        console.error("Error:", error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

export default query;
