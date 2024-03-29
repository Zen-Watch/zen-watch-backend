import { connect_to_mysql } from "../db/connection_pool";
import dotenv from 'dotenv';
import { IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_UNDER_PROCESSING, IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_UNPROCESSED } from "../utils/constants";
dotenv.config();

export async function fetch_unprocessed_ifttt_action_run_history_events() {
    const pool = await connect_to_mysql()
    const ifttt_action_run_history_worker_id = Number(process.env.IFTTT_ACTION_RUN_HISTORY_WORKER_ID);
    // select for update, to avoid duplicate processing
    const select_result: any = await pool!.query(`select * from ifttt_action_run_history where ifttt_action_run_history_worker_shard_id=? and action_run_status=? FOR UPDATE;`, [ifttt_action_run_history_worker_id, IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_UNPROCESSED]);
    // update status to under processing - if the job is stuck, you can reset to unprocessed status or mark as failure
    for (let _row of select_result[0]) {
        await pool!.query(`update ifttt_action_run_history set action_run_status=? where id=?;`, [IFTTT_ACTION_RUN_HISTORY_WORKER_STATUS_UNDER_PROCESSING, _row.id]);
    }    
    return select_result[0];
}

export async function update_ifttt_action_run_history_status(ifttt_action_run_history_id: number, status: number) {
    const pool = await connect_to_mysql()
    await pool!.query(`update ifttt_action_run_history set action_run_status=? where id=?;`, [status, ifttt_action_run_history_id]);
}

export async function update_ifttt_action_run_history_status_and_payload(event: any, status: number, payload:any, ) {
    console.log('Saving action run history payload saved - ');
    const pool = await connect_to_mysql()

    let action_run_output: string = "";
    try {
        try {
            // If it's an object, it will convert
            action_run_output = JSON.stringify(payload)
        }
        catch (e) {
            // If its a type that has a to_string, it will converted here
            console.log('payload conversion error in JSON.stringify, trying .toString - ', e);
            action_run_output = payload.toString();
        }
    }
    catch (e) {
        console.log('payload conversion error with toString as well - ', e);
        action_run_output = `Unsupported payload type in action callback. Debug to learn more.`;    
    }

    await pool!.query(`update ifttt_action_run_history set action_run_status=?, action_run_output=? where id=?;`, [status, action_run_output, event.id]);
}
