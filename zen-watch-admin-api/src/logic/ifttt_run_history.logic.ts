import { connect_to_mysql } from "../db/connection_pool";

export async function create_ifttt_run_history_logic(payload: any) {
  try {
    const pool = await connect_to_mysql();
    const {
      ifttt_run_history_worker_shard_id,
      dev_id,
      ifttt_instance_id,
      is_trigger,
      run_status,
      run_info,
      run_output,
    } = payload;

    // insert payload into ifttt_run_history table
    const result: any = await pool!.query(`insert into ifttt_run_history (ifttt_run_history_worker_shard_id, dev_id, ifttt_instance_id, is_trigger, run_status, run_info, run_output) values (?,?,?,?,?,?,?);`, [ifttt_run_history_worker_shard_id, dev_id, ifttt_instance_id, is_trigger, run_status, JSON.stringify(run_info), JSON.stringify(run_output)]);
    return result[0];
  } catch (e) {
    throw e;
  }
}