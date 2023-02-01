import mysql, { Pool } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

let pool: Pool | undefined = undefined;

// Switch to singleton pattern to avoid "too many connections" mysql error
// https://stackoverflow.com/questions/65813552/too-many-connections-nodejs-mysql2-promise
export async function connect_to_mysql() {

    // If the pool was already created, return it instead of creating a new one.
    if(typeof pool !== 'undefined') {
        return pool;
    }

    pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    }).promise();
    return pool;
}