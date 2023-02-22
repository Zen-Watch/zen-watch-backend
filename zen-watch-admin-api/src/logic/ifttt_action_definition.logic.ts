import { connect_to_mysql } from "../db/connection_pool";

export async function create_ifttt_action_definition_logic(payload: any) {
  try {
    const pool = await connect_to_mysql();
    const {
      action_worker_shard_id,
      dev_id,
      categ_id,
      target_resource_name,
      action_name,
      action_description,
      action_signature,
      action_code
    } = payload;

    // insert payload into ifttt_action_definition table
    const result: any = await pool!.query(`insert into ifttt_action_definition (action_worker_shard_id, dev_id, categ_id, target_resource_name, action_name, action_description, action_signature, action_code) values (?, ? ,? ,? ,? ,? ,? ,?);`, [action_worker_shard_id, dev_id, categ_id, target_resource_name, action_name, action_description, action_signature, action_code]);    
    return result[0];
  } catch (e) {
    throw e;
  }
}