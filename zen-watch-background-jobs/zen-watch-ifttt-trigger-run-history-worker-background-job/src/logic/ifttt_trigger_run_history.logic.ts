import { connect_to_mysql } from "../db/connection_pool";
import dotenv from 'dotenv';
import { TRIGGER_RUN_HISTORY_WORKER_STATUS_UNDER_PROCESSING, TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED } from "../utils/constants";
dotenv.config();

export async function fetch_unprocessed_ifttt_trigger_run_history_events() {
    const pool = await connect_to_mysql()
    const ifttt_trigger_run_history_worker_id = Number(process.env.IFTTT_TRIGGER_RUN_HISTORY_WORKER_ID);
    // select for update, to avoid duplicate processing
    const select_result: any = await pool!.query(`select * from ifttt_trigger_run_history where ifttt_trigger_run_history_worker_shard_id=? and trigger_run_status=? FOR UPDATE;`, [ifttt_trigger_run_history_worker_id, TRIGGER_RUN_HISTORY_WORKER_STATUS_UNPROCESSED]);
    // update status to under processing - if the job is stuck, you can reset to unprocessed status or mark as failure
    for (let _row of select_result[0]) {
        await pool!.query(`update ifttt_trigger_run_history set trigger_run_status=? where id=?;`, [TRIGGER_RUN_HISTORY_WORKER_STATUS_UNDER_PROCESSING, _row.id]);
    }    
    return select_result[0];
}

export async function update_ifttt_trigger_run_history_status(ifttt_trigger_run_history_id: number, status: number) {
    const pool = await connect_to_mysql()
    await pool!.query(`update ifttt_trigger_run_history set trigger_run_status=? where id=?;`, [status, ifttt_trigger_run_history_id]);
}