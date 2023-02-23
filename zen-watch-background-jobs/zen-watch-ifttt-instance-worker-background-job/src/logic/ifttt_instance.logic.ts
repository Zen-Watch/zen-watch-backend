import { connect_to_mysql } from "../db/connection_pool";
import dotenv from 'dotenv';
dotenv.config();

export async function fetchAllIFTTTInstances() {
    const pool = await connect_to_mysql()
    const ifttt_instance_worker_id = Number(process.env.IFTTT_INSTANCE_WORKER_ID);
    const result: any = await pool!.query(`select * from ifttt_instance where ifttt_instance_worker_shard_id=?`, [ifttt_instance_worker_id]);
    return result[0];
}