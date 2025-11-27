import mysql from 'mysql2/promise';
import bcrypt from "bcrypt";

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

export async function hashPassword(plainPassword: string): Promise<string> {
    const saltRounds = 10; // secure default
    return await bcrypt.hash(plainPassword, saltRounds);
}

export async function createUser(reqbody: any) {
    const hashedPassword = await hashPassword(reqbody.password);
    reqbody.password = hashedPassword;

    return conn().then((connection: any) => {
        const { username, password } = reqbody;
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        return connection.execute(query, [username, password]);
    });
}