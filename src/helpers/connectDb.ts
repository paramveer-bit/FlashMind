import mysql from 'mysql2/promise';
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

const query = async ({ query, values = [] }: { query: string, values: any[] }) => {
    let connection;
    try {
        const { host, user, password, database, port } = parseDatabaseUrl(process.env.CONNECTION_URI!);

        // Create a connection using separate parameters
        connection = await mysql.createConnection({
            host,
            user,
            password,
            database,
            port
        });

        const [res] = await connection.execute(query, values);
        return res as RowDataPacket[];
    } catch (error: any) {
        console.error("Error:", error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

export default query;
