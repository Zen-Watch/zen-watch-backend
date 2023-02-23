import { connect_to_mysql } from "../db/connection_pool";

export async function create_ifttt_trigger_definition_logic(payload: any) {
  try {
    const pool = await connect_to_mysql();
    const {
      dev_id,
      categ_id,
      is_public,
      is_trusted_source,
      is_compute_intensive,
      is_push_mechanism,
      target_resource_name,
      trigger_name,
      trigger_description,
      trigger_signature,
      trigger_code,
      trigger_expected_output,
      trigger_expected_output_description,
    } = payload;

    const result: any = await pool!.query( 
      `insert into ifttt_trigger_definition (dev_id, categ_id, is_public, is_trusted_source, is_compute_intensive, is_push_mechanism, target_resource_name, trigger_name, trigger_description, trigger_signature, trigger_code, trigger_expected_output, trigger_expected_output_description) 
      values (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?);`, [ dev_id, categ_id, is_public, is_trusted_source, is_compute_intensive, is_push_mechanism, target_resource_name, trigger_name, trigger_description, trigger_signature, trigger_code, trigger_expected_output, trigger_expected_output_description]);
    return result[0];
  } catch (e) {
    throw e;
  }
}