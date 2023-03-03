import { connect_to_mysql } from "../db/connection_pool";

export async function fetch_ifttt_trigger_run_history_logic(dev_id: number) {
    try {
        const pool = await connect_to_mysql();
        // fetch all the trigger run history for the developer
        const result: any = await pool!.query(`select * from ifttt_trigger_run_history where dev_id = ?;`, [dev_id]);
        return result[0];
    } catch (e) {
        throw e;
    }
}