import mysql from 'mysql2/promise';

// Connect to the database using mysql2/promise
export const conn = async () => {
    try {
        await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'learn_agent',
        });

    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
};

