import { connect_to_mysql } from "../db/connection_pool";

export async function get_developer_by_email(email: string) {
    const pool = await connect_to_mysql()
    const result:any = await pool!.query(`select * from developer where email=?`, [email]);
    return result[0][0];
}