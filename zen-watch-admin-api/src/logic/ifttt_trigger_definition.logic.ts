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
    const result: any = await pool!.query(
      `select 
        id, 
        dev_id, 
        is_public, 
        is_approved, 
        is_trusted_source,
        is_compute_intensive,
        is_push_mechanism,
        target_resource_name, 
        trigger_name, 
        trigger_description, 
        trigger_expected_input, 
        trigger_expected_input_description, 
        trigger_expected_output, 
        trigger_expected_output_description,
        created_ts,
        updated_ts
      from ifttt_trigger_definition where id = ?;`,
      [id]
    );
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

export async function fetch_ifttt_public_approved_trigger_definitions_logic(target_resource_name: string, dev_id: number) {
  try {
    const pool = await connect_to_mysql();
    // update the query to fetch either public or private triggers based on the dev_id, all of whicih are approved
    const result: any = await pool!.query(
      `select 
        id, 
        dev_id, 
        is_public, 
        is_approved, 
        is_trusted_source,
        is_compute_intensive,
        is_push_mechanism,
        target_resource_name, 
        trigger_name, 
        trigger_description, 
        trigger_expected_input, 
        trigger_expected_input_description, 
        trigger_expected_output, 
        trigger_expected_output_description,
        created_ts,
        updated_ts
      from ifttt_trigger_definition where (is_public = 1 or dev_id = ?) and is_approved = 1 and target_resource_name = ?;`,
      [dev_id, target_resource_name]
    );
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function fetch_ifttt_public_approved_trigger_definition_code_logic(trigger_id: number, dev_id: number) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(
      `select 
        id, 
        trigger_code, 
        trigger_code_description, 
        created_ts,
        updated_ts
      from ifttt_trigger_definition where (is_public = 1 or dev_id = ?) and is_approved = 1 and id = ?;`,
      [dev_id, trigger_id]
    );
    return result[0][0];
  } catch (e) {
    throw e;
  }
}

export async function fetch_submitted_ifttt_trigger_definitions_logic(dev_id: number) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`select * from ifttt_trigger_definition where dev_id = ?;`, [dev_id]);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function update_ifttt_trigger_definition_approval_status_logic(id: number, is_approved: boolean) {
  try {
    const pool = await connect_to_mysql();
    const result: any = await pool!.query(`update ifttt_trigger_definition set is_approved = ? where id = ?;`, [is_approved, id]);
    return result[0];
  } catch (e) {
    throw e;
  }
}

export async function update_ifttt_trigger_definition_code_info_logic(
  id: number,
  trigger_signature: string,
  trigger_signature_description: string,
  trigger_code_description: string,
  trigger_expected_input: string,
  trigger_expected_input_description: string,
  trigger_expected_output: string,
  trigger_expected_output_description: string
) {
  try {
    const pool = await connect_to_mysql();
    // write query to update ifttt_trigger_definition using the payload and myswl connection pool for the given id and input fields
    const result: any = await pool!.query(
      `update ifttt_trigger_definition set
      trigger_signature = ?,
      trigger_signature_description = ?,
      trigger_code_description = ?,
      trigger_expected_input = ?,
      trigger_expected_input_description = ?,
      trigger_expected_output = ?,
      trigger_expected_output_description = ?
      where id = ?;`,
      [
        trigger_signature,
        trigger_signature_description,
        trigger_code_description,
        trigger_expected_input,
        trigger_expected_input_description,
        trigger_expected_output,
        trigger_expected_output_description,
        id
      ]
    );
    return result[0];
  } catch (e) {
    throw e;
  }
}