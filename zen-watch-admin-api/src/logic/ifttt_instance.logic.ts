import { connect_to_mysql } from "../db/connection_pool";

export async function create_ifttt_instance_logic(payload: any) {
  try {
    const pool = await connect_to_mysql();
    const {
      ifttt_instance_worker_shard_id,
      dev_id,
      is_trigger_trusted_source,
      is_trigger_compute_intensive,
      is_trigger_push_mechanism,
      trigger_target_resource_name,
      ifttt_instance_name,
      ifttt_instance_description,
      ifttt_instance_is_on,
      trigger_info,
      actions_info
    } = payload;

    // insert payload into ifttt_instance table
    const result: any = await pool!.query(`insert into ifttt_instance (ifttt_instance_worker_shard_id, dev_id, is_trigger_trusted_source, is_trigger_compute_intensive, is_trigger_push_mechanism, trigger_target_resource_name, ifttt_instance_name, ifttt_instance_description, ifttt_instance_is_on, trigger_info, actions_info) values (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?);`, [ifttt_instance_worker_shard_id, dev_id, is_trigger_trusted_source, is_trigger_compute_intensive, is_trigger_push_mechanism, trigger_target_resource_name, ifttt_instance_name, ifttt_instance_description, ifttt_instance_is_on, JSON.stringify(trigger_info), JSON.stringify(actions_info)]);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function update_ifttt_instance_status_logic(dev_id: number, instance_id: number, new_instance_status: number) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`update ifttt_instance set ifttt_instance_is_on = ? where dev_id = ? and id = ?;`, [new_instance_status, dev_id, instance_id]);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function get_ifttt_instances_by_dev_id(dev_id: number) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`select * from ifttt_instance where dev_id = ?;`, [dev_id]);
    return result[0];
  } catch (e) {
    throw e;
  }
}