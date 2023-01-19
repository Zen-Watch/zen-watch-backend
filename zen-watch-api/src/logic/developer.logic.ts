import { connect_to_mysql } from "../db/connection_pool";

export async function get_developer_by_api_key(api_key: string) {
    const pool = await connect_to_mysql()
    const result:any = await pool.query(`select * from developer where api_key=?`, [api_key]);
    return result[0][0];
}