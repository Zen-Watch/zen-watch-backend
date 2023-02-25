import { connect_to_mysql } from "../db/connection_pool";
import dotenv from 'dotenv';
dotenv.config();

export async function fetch_actions_info_from_ifttt_instance_by_id(id: string) {
    const pool = await connect_to_mysql()
    const result: any = await pool!.query(`select actions_info from ifttt_instance where id=?`, [id]);
    return result[0][0];
}