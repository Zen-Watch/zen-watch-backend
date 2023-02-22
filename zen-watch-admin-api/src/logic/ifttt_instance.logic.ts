import { connect_to_mysql } from "../db/connection_pool";

export async function create_ifttt_instance_logic(payload: any) {
  try {
    const pool = await connect_to_mysql();
    const {
      ifttt_instance_worker_shard_id,
      dev_id,
      ifttt_instance_name,
      ifttt_instance_description,
      ifttt_instance_is_on,
      trigger_info,
      actions_info
    } = payload;

    // insert payload into ifttt_instance table
    const result: any = await pool!.query(`insert into ifttt_instance (ifttt_instance_worker_shard_id, dev_id, ifttt_instance_name, ifttt_instance_description, ifttt_instance_is_on, trigger_info, actions_info) values (?,?,?,?,?,?,?);`, [ifttt_instance_worker_shard_id, dev_id, ifttt_instance_name, ifttt_instance_description, ifttt_instance_is_on, JSON.stringify(trigger_info), JSON.stringify(actions_info)]);
    return result[0];
  } catch (e) {
    throw e;
  }
}