import { PoolConnection } from "mysql2/promise";
import { connect_to_mysql } from "../db/connection_pool";
import dotenv from 'dotenv';
dotenv.config();

// store in a transaction, if transaction succeeds mark the trigger run history as success, if it fails mark it as failed
// TODO: send an email to on-call team upon failure
export async function create_new_action_events_in_a_transaction(actions_to_run_package: any) {

    const pool = await connect_to_mysql()
    let connection: PoolConnection | null = null;

    let is_transaction_success = true;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // insert into ifttt_action_run_history
        const query = 'INSERT INTO ifttt_action_run_history (ifttt_action_run_history_worker_shard_id, dev_id, ifttt_instance_id, ifttt_trigger_run_history_id, is_action_trusted_source, is_action_compute_intensive, action_target_resource_name, action_run_status, action_run_info) VALUES ?';
        const values = actions_to_run_package.map((new_action: any) => [
            new_action.ifttt_action_run_history_worker_shard_id,
            new_action.dev_id,
            new_action.ifttt_instance_id,
            new_action.ifttt_trigger_run_history_id,
            new_action.is_action_trusted_source,
            new_action.is_action_compute_intensive,
            new_action.action_target_resource_name,
            new_action.action_run_status,
            JSON.stringify(new_action.action_run_info),
        ]);

        await connection.query(query, [values]);

        await connection.commit();
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        is_transaction_success = false;
        console.log("Error in create_new_action_events of IFTTT trigger run history worker job: ", error);
    } finally {
        if (connection) {
            connection.release();
        }
    }

    return is_transaction_success;
}
