import mysql, { Pool } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

let pool: Pool;

export async function connect_to_mysql() {
    pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }).promise();
    return pool;
}