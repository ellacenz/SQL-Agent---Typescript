import mysql from 'mysql2/promise';

// Connect to the database using mysql2/promise
let connection: any;

export async function conn() {
    if (!connection) {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'learn_agent',
        });
        console.log('Database connected successfully.');
    }
    return connection;
};

