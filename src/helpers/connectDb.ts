import serverlessMysql from 'serverless-mysql';

const db = serverlessMysql({
    config: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
});

export async function query({ query, values }: { query: String, values: any[] }) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error: any) {
        throw Error(error.message);
    }
}
