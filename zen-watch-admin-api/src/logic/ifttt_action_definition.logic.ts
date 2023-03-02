import { connect_to_mysql } from "../db/connection_pool";

export async function create_ifttt_action_definition_logic(payload: any) {
  try {
    const pool = await connect_to_mysql();
    const {
      dev_id,
      is_public,
      is_approved,
      is_trusted_source,
      is_compute_intensive,
      target_resource_name,
      action_name,
      action_description,
      action_signature,
      action_signature_description,
      action_code,
      action_code_description,
      action_expected_input,
      action_expected_input_description,
      action_expected_output,
      action_expected_output_description
    } = payload;

    // insert payload into ifttt_action_definition table
    const result: any = await pool!.query(`insert into ifttt_action_definition 
    (
      dev_id, 
      is_public, 
      is_approved,
      is_trusted_source, 
      is_compute_intensive, 
      target_resource_name, 
      action_name, 
      action_description, 
      action_signature, 
      action_signature_description,
      action_code, 
      action_code_description,
      action_expected_input,
      action_expected_input_description,
      action_expected_output, 
      action_expected_output_description
    ) 
    values (?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ? ,? ,? ,? ,?);`, 
    [
      dev_id, 
      is_public,
      is_approved, 
      is_trusted_source, 
      is_compute_intensive, 
      target_resource_name, 
      action_name, 
      action_description, 
      action_signature, 
      action_signature_description,
      action_code, 
      action_code_description,
      action_expected_input,
      action_expected_input_description,
      action_expected_output, 
      action_expected_output_description
    ]);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function fetch_action_definition_details_logic(ids: number[]) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`select * from ifttt_action_definition where id in (?);`, [ids]);
    return result[0];
  } catch (e) {
    throw e;
  }
}