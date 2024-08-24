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
        console.log("Executing query...");

        const res = await connection.query(query, values);
        await connection.end(); // Ensure connection is properly closed after each query
        console.log("Query result:", res);

        return res as RowDataPacket[];
    } catch (error: any) {
        console.error("Error during query execution:", error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.quit(); // Properly close connection to avoid issues
        }
    }
};

export default query;
