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

export async function fetch_unique_ifttt_target_resource_names_for_public_actions_logic() {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`select distinct target_resource_name from ifttt_action_definition where is_public = 1;`);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function fetch_ifttt_public_approved_action_definitions_logic(target_resource_name: string) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`select * from ifttt_action_definition where is_public = 1 and is_approved = 1 and target_resource_name = ?;`, [target_resource_name]);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function fetch_submitted_ifttt_action_definitions_logic(dev_id: number) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`select * from ifttt_action_definition where dev_id = ?;`, [dev_id]);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function update_ifttt_action_definition_approval_status_logic(id: number, is_approved: boolean) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`update ifttt_action_definition set is_approved = ? where id = ?;`, [is_approved, id]);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function update_ifttt_action_definition_code_info_logic(
  id: number,
  action_signature: string,
  action_signature_description: string,
  action_code_description: string,
  action_expected_input: string,
  action_expected_input_description: string,
  action_expected_output: string,
  action_expected_output_description: string
) {
  try {
    const pool = await connect_to_mysql();
    // write query to update ifttt_action_definition using the payload and myswl connection pool for the given id and input fields
    const result: any = await pool!.query(
      `update ifttt_action_definition set
      action_signature = ?,
      action_signature_description = ?,
      action_code_description = ?,
      action_expected_input = ?,
      action_expected_input_description = ?,
      action_expected_output = ?,
      action_expected_output_description = ?
      where id = ?;`,
      [
        action_signature,
        action_signature_description,
        action_code_description,
        action_expected_input,
        action_expected_input_description,
        action_expected_output,
        action_expected_output_description,
        id
      ]
    );
    return result[0];
  } catch (e) {
    throw e;
  }
}