import { connect_to_mysql } from "../db/connection_pool";
import dotenv from 'dotenv';
dotenv.config();

// store in a transaction, if transaction succeeds mark the trigger run history as success, if it fails mark it as failed
// TODO: send an email to on-call team upon failure
export async function create_new_action_events(actions_to_run_package: any) {
    const pool = await connect_to_mysql()
    //const result: any = await pool!.query(`select actions_info from ifttt_instance where id=?`, [id]);
    //return result[0][0];
}