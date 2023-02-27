import { connect_to_mysql } from "../db/connection_pool";
import dotenv from 'dotenv';
dotenv.config();

export async function fetch_all_ifttt_instances() {
    const pool = await connect_to_mysql()
    const ifttt_instance_worker_id = Number(process.env.IFTTT_INSTANCE_WORKER_ID);
    // Architecture assumption is there will be only one worker keeping these in memory, so no additional FOR UPDATE status is required
    // As we scale out, we will make the sharding more granular, to increase the throughput, but still there would be only one worker per job
    // We could add a secondary worker for redundancy, as we scale out
    const result: any = await pool!.query(`select * from ifttt_instance where ifttt_instance_worker_shard_id=?`, [ifttt_instance_worker_id]);
    return result[0];
}