import { connect_to_mysql } from "../db/connection_pool";

export async function create_ifttt_trigger_definition_logic(payload: any) {
  try {
    const pool = await connect_to_mysql();
    const {
      dev_id,
      is_public,
      is_approved,
      is_trusted_source,
      is_compute_intensive,
      is_push_mechanism,
      target_resource_name,
      trigger_name,
      trigger_description,
      trigger_signature,
      trigger_signature_description,
      trigger_code,
      trigger_code_description,
      trigger_expected_input,
      trigger_expected_input_description,
      trigger_expected_output,
      trigger_expected_output_description,
    } = payload;

    // write query to insert into ifttt_trigger_definition using the payload and myswl connection pool
    const result: any = await pool!.query(`insert into ifttt_trigger_definition 
    (
      dev_id, 
      is_public, 
      is_approved,
      is_trusted_source, 
      is_compute_intensive, 
      is_push_mechanism, 
      target_resource_name, 
      trigger_name, 
      trigger_description, 
      trigger_signature, 
      trigger_signature_description,
      trigger_code, 
      trigger_code_description,
      trigger_expected_input,
      trigger_expected_input_description,
      trigger_expected_output, 
      trigger_expected_output_description
    ) 
    values (?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?);`,
    [
      dev_id,
      is_public,
      is_approved,
      is_trusted_source,
      is_compute_intensive,
      is_push_mechanism,
      target_resource_name,
      trigger_name,
      trigger_description,
      trigger_signature,
      trigger_signature_description,
      trigger_code,
      trigger_code_description,
      trigger_expected_input,
      trigger_expected_input_description,
      trigger_expected_output,
      trigger_expected_output_description
    ]);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function fetch_trigger_definition_details_logic(id: number) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`select * from ifttt_trigger_definition where id = ?;`, [id]);
    return result[0][0];
  } catch (e) {
    throw e;
  }
}

export async function fetch_unique_ifttt_target_resource_names_for_public_triggers_logic() {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`select distinct target_resource_name from ifttt_trigger_definition where is_public = 1;`);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function fetch_ifttt_public_approved_trigger_definitions_logic(target_resource_name: string) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`select * from ifttt_trigger_definition where is_public = 1 and is_approved = 1 and target_resource_name = ?;`, [target_resource_name]);
    return result[0];
  } catch (e) {
    throw e;
  }
}